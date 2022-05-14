from brownie import (
    accounts,
    network,
    Post,
    User,
    Comment,
    Manager,
    Block,
    chain,
    config,
)
import random
import json

LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["hardhat", "development", "ganache", "mainnet-fork"]


def get_account(index=None, id=None):
    # accounts[0]
    # accounts.add("env")
    # accounts.load("id")
    if index:
        return accounts[index]
    if id:
        return accounts.load(id)
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        return accounts[0]
    return accounts.add(config["wallets"]["from_key"])


use_previous = False
publish = True
previous = json.load(open("previous.json"))
if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
    publish_source = False
    cur_network = "local"
    accounts = accounts[:10]
    account = accounts[0]
    account2 = accounts[1]
else:
    publish_source = True
    cur_network = network.show_active()
    account = accounts.add(config["wallets"]["from_key"][0])
    account2 = accounts.add(config["wallets"]["from_key"][1])

from_dict1 = {"from": account}
from_dict2 = {"from": account2}

if use_previous:
    post = Post.at(previous[cur_network]["post"])
    user = User.at(previous[cur_network]["user"])
    block = Block.at(previous[cur_network]["block"])
    comment = Comment.at(previous[cur_network]["comment"])
    manager = Manager.at(previous[cur_network]["manager"])
else:
    post = Post.deploy(from_dict1)
    user = User.deploy(from_dict1)
    block = Block.deploy(from_dict1)
    comment = Comment.deploy(from_dict1)
    manager = Manager.deploy(block, post, comment, user, from_dict1)

if cur_network not in previous:
    previous[cur_network] = {}

previous[cur_network] = {
    "post": post.address,
    "user": user.address,
    "block": block.address,
    "comment": comment.address,
    "manager": manager.address,
}

json.dump(previous, open("previous.json", "w"))


# Build a dict containing all the comments on a post
input_dict_keys = [
    a["outputs"][0]["components"]
    for a in post.abi
    if "name" in a and a["name"] == "getInput"
][0]
input_dict_keys = [k["name"] for k in input_dict_keys]

print(input_dict_keys)

user_dict_keys = [
    a["outputs"][0]["components"]
    for a in user.abi
    if "name" in a and a["name"] == "getUser"
][0]
user_dict_keys = [k["name"] for k in user_dict_keys]


def getId(event, typeOfEvent):
    if typeOfEvent == "input":
        inp = {k: v for k, v in zip(input_dict_keys, event)}
        inpId = inp["inputId"]
        return inpId
    elif typeOfEvent == "user":
        inp = {k: v for k, v in zip(user_dict_keys, event)}
        inpId = inp["userId"]
        return inpId
    else:
        raise "wrong typeOfEvent"


# Set manager as minter for all contracts
# as you can only use other contracts functions with the minter role
post.grantMinterRole(manager.address, from_dict1)
user.grantMinterRole(manager.address, from_dict1)
block.grantMinterRole(manager.address, from_dict1)
comment.grantMinterRole(manager.address, from_dict1)

# allow contract to burn tokens
block.approve(manager.address, 1000000000000, from_dict1)
block.approve(manager.address, 1000000000000, from_dict2)

# give user tokens from faucet
tx1 = manager.faucet(10000000, from_dict1)
tx2 = manager.faucet(10000000, from_dict2)
# tx2 = manager.faucet(10000000, {"from": manager.address})

print(block.balanceOf(account))
print(block.balanceOf(account2))

# mint users
username1 = "ian"
username2 = "john"
tx1 = manager.mintUser(username1, from_dict1)
tx2 = manager.mintUser(username2, from_dict2)
userId1 = getId(tx1.events["userMinted"]["user"], "user")
userId2 = getId(tx2.events["userMinted"]["user"], "user")
print(userId1, type(userId1))
print(userId2, type(userId1))

# add follower and unfollow them
tx = manager.follow(userId2, userId1, from_dict1)
print(tx.events["followHappened"])
tx = manager.unFollow(userId2, userId1, from_dict1)
print(tx.events["unFollowHappened"])

# create a post, then upvote it and change it to a downvote
tx = manager.mintPost(
    userId1, username1, "all", "some title", "some text", "a link", from_dict1
)
postId = getId(tx.events["postMinted"]["post"], "input")
tx = manager.upvotePost(postId)
print(tx.events["upvoteHappened"])
tx = manager.downvotePost(postId)
print(tx.events["downvoteHappened"])

# make comment on post then comment on that comment
tx = manager.makeComment(
    userId2, username2, "a comment", "another link", postId, True, from_dict2
)
commentId = getId(tx.events["commentMinted"]["comment"], "input")
tx = manager.makeComment(
    userId1,
    username1,
    "a comment on a comment",
    "another another link",
    commentId,
    True,
    from_dict1,
)
commentId = getId(tx.events["commentMinted"]["comment"], "input")

# make series of comments on post and comments on comments
for i in range(3):
    tx = manager.makeComment(
        userId2, username2, f"a comment{i}", "another link", postId, True, from_dict2
    )
    commentId = getId(tx.events["commentMinted"]["comment"], "input")

    tx = manager.makeComment(
        userId1,
        username1,
        f"a comment{i+1} on a comment{i}",
        "another another link",
        commentId,
        False,
        from_dict1,
    )
    commentId = getId(tx.events["commentMinted"]["comment"], "input")
    tx = manager.makeComment(
        userId1,
        username1,
        f"a comment{i+2} on a comment{i+1}",
        "another another link",
        commentId,
        False,
        from_dict1,
    )
    commentId = getId(tx.events["commentMinted"]["comment"], "input")
    tx = manager.makeComment(
        userId1,
        username1,
        f"a comment{i+3} on a comment{i+2}",
        "another another link",
        commentId,
        False,
        from_dict1,
    )
    tx = manager.makeComment(
        userId2,
        username2,
        f"a comment{i+3} on a comment{i+2}",
        "another another link",
        commentId,
        False,
        from_dict2,
    )


def get_comments(commentId):
    commentStruct = post.getInput(commentId, from_dict1)
    result = {}
    for k, v in zip(input_dict_keys, commentStruct):
        if k == "commentsHead":
            comments = []
            for commentId2 in v:
                if commentId2 > 1:
                    print(commentId2)
                    comments.append(get_comments(commentId2))

            result[k] = comments
        else:
            result[k] = v
    return result


postStruct = post.getInput(postId, from_dict1)
result = {}
for k, v in zip(input_dict_keys, postStruct):
    if k == "commentsHead":
        comments = []
        for commentId in v:
            if commentId > 1:
                print(commentId)
                comments.append(get_comments(commentId))

        result[k] = comments
    else:
        result[k] = v

print(result)
# json.dump(result, open("results.json", "w"))

# tx = post.getInput(postId)
# print(tx.return_value)

if publish and not network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
    Post.publish_source(post)
    User.publish_source(user)
    Block.publish_source(block)
    Comment.publish_source(comment)
    Manager.publish_source(manager)


def main():
    pass
