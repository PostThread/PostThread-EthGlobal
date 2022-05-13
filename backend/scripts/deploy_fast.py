from brownie import accounts, network, Post, User, Comment, Manager, Block, chain, config
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
else:
    publish_source = True
    cur_network = network.show_active()
    accounts.load("main2")
    accounts.load("new")
    account = get_account()

from_dict1 = {"from": account}
from_dict2 = {"from": accounts[1]}

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
    "post": post.address, "user": block.address,
    "block": block.address, "comment": comment.address,
    "manager": manager.address
}

json.dump(previous, open("previous.json", "w"))

# Set manager as minter for all contracts 
# as you can only use other contracts functions with the minter role
post.grantMinterRole(manager.address)
user.grantMinterRole(manager.address)
block.grantMinterRole(manager.address)
comment.grantMinterRole(manager.address)

# allow contract to burn tokens
block.approve(manager.address, 1000000000000, from_dict1)
block.approve(manager.address, 1000000000000, from_dict2)

# give user tokens from faucet
tx1 = manager.faucet(1000000, from_dict1)
tx2 = manager.faucet(1000000, from_dict2)

# mint users
tx1 = manager.mintUser("ian", from_dict1)
tx2 = manager.mintUser("john", from_dict2)
userId1 = int(tx1.events["userMinted"]["tokenId"])
userId2 = int(tx2.events["userMinted"]["tokenId"])
print(userId1, type(userId1))
print(userId2, type(userId1))

# add follower and unfollow them
tx = manager.follow(userId2, userId1, from_dict1)
print(tx.events['followHappened'])
tx = manager.unFollow(userId2, userId1, from_dict1)
print(tx.events['unFollowHappened'])

# create a post, then upvote it and change it to a downvote
tx = manager.mintPost(userId1, "all", "some title", "some text", "a link", from_dict1)
postId = tx.events["postMinted"]["tokenId"]
tx = post.upvote(postId)
print(tx.events['upvoteHappened'])
tx = post.downvote(postId)
print(tx.events['downvoteHappened'])

# make comment on post then comment on that comment
tx = manager.makeComment(userId2, "a comment", "another link", postId, True, from_dict2)
commentId = tx.events["commentMinted"]["tokenId"]
tx = manager.makeComment(
    userId1,
    "a comment on a comment",
    "another another link",
    commentId,
    True,
    from_dict1,
)
commentId = tx.events["commentMinted"]["tokenId"]

# make series of comments on post and comments on comments
for i in range(3):
    tx = manager.makeComment(
        userId2, f"a comment{i}", "another link", postId, True, from_dict2
    )
    commentId = tx.events["commentMinted"]["tokenId"]

    tx = manager.makeComment(
        userId1,
        f"a comment{i+1} on a comment{i}",
        "another another link",
        commentId,
        False,
        from_dict1,
    )
    commentId = tx.events["commentMinted"]["tokenId"]
    tx = manager.makeComment(
        userId1,
        f"a comment{i+2} on a comment{i+1}",
        "another another link",
        commentId,
        False,
        from_dict1,
    )
    commentId = tx.events["commentMinted"]["tokenId"]
    tx = manager.makeComment(
        userId1,
        f"a comment{i+3} on a comment{i+2}",
        "another another link",
        commentId,
        False,
        from_dict1,
    )
    tx = manager.makeComment(
        userId2,
        f"a comment{i+3} on a comment{i+2}",
        "another another link",
        commentId,
        False,
        from_dict2,
    )

# Build a dict containing all the comments on a post
abi = post.abi
post_dict_keys = [
    a["outputs"][0]["components"]
    for a in abi
    if "name" in a and a["name"] == "getInput"
][0]
post_dict_keys = [k["name"] for k in post_dict_keys]


def get_comments(commentId):
    commentStruct = post.getInput(commentId, from_dict1)
    result = {}
    for k, v in zip(post_dict_keys, commentStruct):
        if k == "commentsHead":
            comments = []
            for commentId in v:
                if commentId > 0:
                    comments.append(get_comments(commentId))

            result[k] = comments
        else:
            result[k] = v
    return result


postStruct = post.getInput(postId, from_dict1)
result = {}
for k, v in zip(post_dict_keys, postStruct):
    if k == "commentsHead":
        comments = []
        for commentId in v:
            if commentId > 0:
                comments.append(get_comments(commentId))

        result[k] = comments
    else:
        result[k] = v

print(result)
# json.dump(result, open("results.json", "w"))

# tx = post.getInput(postId)
# print(tx.return_value)

if publish:
    Post.publish_source(post)
    User.publish_source(user)
    Block.publish_source(block)
    Comment.publish_source(comment)
    Manager.publish_source(manager)


def main():
    pass
