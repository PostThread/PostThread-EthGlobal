from brownie import accounts, network, Post, User, chain, config
import random
import json

LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["hardhat",
                                 "development", "ganache", "mainnet-fork"]

use_previous = True
previous = json.load(open('previous.json'))
if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
    publish_source = False
    cur_network = 'local'
    accounts = accounts[:10]
    account = accounts[0]
else:
    publish_source = True
    cur_network = network.show_active()
    accounts.load("main")
    account = accounts[0]

if(use_previous):
    post = Post.at(previous[cur_network]['post'])
    user = User.at(previous[cur_network]['user'])
else:
    post = Post.deploy({"from": account})
    user = User.deploy({"from": account})
        # {"from": account}, publish_source=publish_source)

if cur_network not in previous:
    previous[cur_network] = {}

previous[cur_network] = {
    'post': post.address,
    'user': user.address
}

json.dump(previous, open('previous.json', 'w'))

tx1 = user.mintUser('ian', {"from": accounts[0]})
tx2 = user.mintUser('john', {"from": accounts[0]})
username1, usernameHash1 = tx1.events['userMinted']['user'][2:4]
username2, usernameHash2 = tx2.events['userMinted']['user'][2:4]
print(username1, usernameHash1)
print(username2, usernameHash2)

tx = user.follow(usernameHash1, usernameHash2, {"from": accounts[0]})
print(user.hashToUser(usernameHash2))
tx = user.unFollow(usernameHash1, usernameHash2, {"from": accounts[0]})
print(user.hashToUser(usernameHash2))

tx = post.mintPost(usernameHash1, 'all', 'some text', 'a link', {"from": accounts[0]})
postHash = tx.events['postMinted']['post'][-1]
print(post.hashToPost(postHash))
post.upvote(postHash)
print(post.hashToPost(postHash))
post.downvote(postHash)
print(post.hashToPost(postHash))

tx = post.commentOnPost(usernameHash2, 'a comment', 'another link', postHash, {"from": accounts[0]})
commentHash = tx.events['commentCreated']['comment'][-1]
print(post.hashToComment(commentHash))

tx = post.commentOnComment(usernameHash1, 'a comment on a comment', 'another another link', commentHash, {"from": accounts[0]})
commentHash = tx.events['commentCreated']['comment'][-1]
print(post.hashToComment(commentHash))


def main():
    pass