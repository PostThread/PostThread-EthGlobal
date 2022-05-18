from brownie import network, config, Post, User, Block, NTBlock, Comment, Manager, DAO
import json


LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["hardhat", "development", "ganache", "mainnet-fork"]


def get_account(accounts, index=None, id=None):
    # accounts[0]
    # accounts.add("env")
    # accounts.load("id")
    if index:
        return accounts[index]
    if id:
        return accounts.load(id)
    return accounts.add(config["wallets"]["from_key"])


def deploy_contracts(accounts, use_previous=False, publish=True, testnet=False):
    previous = json.load(open("previous.json"))

    if testnet:
        from_dict1 = {"from": accounts.add(config["wallets"]["from_key"][0])}
        from_dict2 = {"from": accounts.add(config["wallets"]["from_key"][1])}
    else:
        from_dict1 = {"from": accounts[0]}
        from_dict2 = {"from": accounts[1]}

    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        publish_source = False
        cur_network = "local"
        accounts = accounts[:10]
        account = accounts[0]
    else:
        publish_source = True
        cur_network = network.show_active()
        # accounts.load("main2")
        # accounts.load("new")

    if use_previous:
        post = Post.at(previous[cur_network]["post"])
        user = User.at(previous[cur_network]["user"])
        block = Block.at(previous[cur_network]["block"])
        ntblock = NTBlock.at(previous[cur_network]["block"])
        comment = Comment.at(previous[cur_network]["comment"])
        dao = DAO.at(previous[cur_network]["comment"])
        manager = Manager.at(previous[cur_network]["manager"])

        return post, user, block, comment, manager
    else:
        comment = Comment.deploy(from_dict1)
        post = Post.deploy(comment, from_dict1)
        user = User.deploy(from_dict1)
        block = Block.deploy(from_dict1)
        ntblock = NTBlock.deploy(from_dict1)
        dao = DAO.deploy(from_dict1)
        manager = Manager.deploy(
            block, ntblock, post, user, dao, accounts[0], accounts[0], from_dict1
        )

        # Set manager as minter for all contracts
        # as you can only use other contracts functions with the minter role
        post.grantMinterRole(manager.address, from_dict1)
        user.grantMinterRole(manager.address, from_dict1)
        block.grantMinterRole(manager.address, from_dict1)
        ntblock.grantMinterRole(manager.address, from_dict1)
        dao.grantMinterRole(manager.address, from_dict1)
        comment.grantMinterRole(manager.address, from_dict1)
        comment.grantMinterRole(post.address, from_dict1)

        block.mint(accounts[0], 1000000)
        ntblock.mint(accounts[0], 1000000)

    if cur_network not in previous:
        previous[cur_network] = {}

    previous[cur_network] = {
        "post": post.address,
        "user": user.address,
        "block": block.address,
        "ntblock": ntblock.address,
        "comment": comment.address,
        "manager": manager.address,
    }

    json.dump(previous, open("previous.json", "w"))

    if publish and not network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        Post.publish_source(post)
        User.publish_source(user)
        Block.publish_source(block)
        Comment.publish_source(comment)
        Manager.publish_source(manager)

    # allow contract to burn tokens
    ntblock.approve(manager.address, 1000000000000, from_dict1)
    ntblock.approve(manager.address, 1000000000000, from_dict2)
    block.approve(manager.address, 1000000000000, from_dict1)
    block.approve(manager.address, 1000000000000, from_dict2)
    print(block.balanceOf(accounts[0]))
    print(block.balanceOf(accounts[1]))

    # give user tokens from faucet
    tx1 = manager.faucet(10000000, from_dict1)
    tx2 = manager.faucet(10000000, from_dict2)

    return post, user, block, ntblock, comment, manager, dao


def get_dicts(post, user):
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

    return input_dict_keys, user_dict_keys


def getId(input_dict_keys, user_dict_keys, event, typeOfEvent):
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


def mint_users(numUsers, accounts, manager, input_dict_keys, user_dict_keys):
    username = "test"
    userIds = []
    usernames = []
    for i in range(numUsers):
        usernames.append(username + str(i))
        tx = manager.mintUser(usernames[-1], {"from": accounts[i % len(accounts)]})
        userIds.append(
            getId(
                input_dict_keys, user_dict_keys, tx.events["userMinted"]["user"], "user"
            )
        )
    return userIds, usernames
