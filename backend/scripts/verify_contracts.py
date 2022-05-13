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


use_previous = True
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
    "user": block.address,
    "block": block.address,
    "comment": comment.address,
    "manager": manager.address,
}

json.dump(previous, open("previous.json", "w"))


def main():
    Post.publish_source(post)
    User.publish_source(user)
    Block.publish_source(block)
    Comment.publish_source(comment)
    Manager.publish_source(manager)
