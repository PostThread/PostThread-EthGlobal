from brownie import accounts, User, config


def get_account(index=None, id=None):
    # accounts[0]
    # accounts.add("env")
    # accounts.load("id")
    if index:
        return accounts[index]
    if id:
        return accounts.load(id)
    return accounts.add(config["wallets"]["from_key"])


def deploy():
    account = get_account()
    from_dict = {"from": account}
    user = User.deploy(from_dict)
    tx1 = user.mintUser("Paolo", from_dict)
    tx2 = user.mintUser("Pules", from_dict)
    username1, usernameHash1 = tx1.events["userMinted"]["user"][2:4]
    username2, usernameHash2 = tx2.events["userMinted"]["user"][2:4]
    print(username1, usernameHash1)
    print(username2, usernameHash2)
    User.publish_source(user)


def main():
    deploy()
