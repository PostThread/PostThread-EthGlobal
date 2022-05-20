from brownie import accounts, chain
from scripts.helpers import *
    
# post, user, block, ntblock, comment, manager, dao = deploy_contracts(
#     accounts, use_previous=use_prev, publish=True
# )

def test_centralities(use_prev):
    post, user, block, ntblock, comment, manager, dao, caller = deploy_contracts(
        accounts, use_previous=use_prev, publish=True
    )

    input_dict_keys, user_dict_keys = get_dicts(post, user)
    # userIds, usernames = mint_users(6, accounts, manager, input_dict_keys, user_dict_keys)

    username = "test"
    userIds = []
    usernames = []
    for i in range(6):
        usernames.append(username+str(i))
        tx2 = caller.faucet(10000000, {"from": accounts[i]})
        tx = caller.mintUser(usernames[-1], {"from": accounts[i]})
        userIds.append(getId(input_dict_keys, user_dict_keys, tx.events["userEvent"]["user"], "user"))

    #create graph from slide 19
    # https://www2.unb.ca/~ddu/6634/Lecture_notes/Lecture_4_centrality_measure.pdf
    graph = [
        (0,1), (0,4), (1,0), (1,4), (1,2), (2,1), (2,3), 
        (3,5), (3,2), (3,4), (4,3), (4,1), (4,0), (5,3)
    ]
    # graph = [
    #     (0,1), (0,4), (1,4), (1,2), (2,3), (3,5), (3,4)
    # ]
    for g in graph:
        print(g[0]+1, g[1]+1)
        tx = caller.follow(userIds[g[0]], userIds[g[1]], {"from": accounts[g[0]]})
        print(tx.events)
        # print(user.shortestPath(g[1], g[0]))
        
        for i in range(6):
            print(user.getUser(userIds[i]))

        print('-------------------------------------------------------------------------')

    
    for i in range(6):
        print(user.getUser(userIds[i]))
        print(user.getsCentralitiesNormalized(userIds[i]))
        print(user.getCentralityScore(userIds[i]))
        print(user.getScore(userIds[i]))
        print('-------------------------------------------------------------------')

def test_dao(use_prev):
    post, user, block, ntblock, comment, manager, dao, caller = deploy_contracts(
        accounts, use_previous=use_prev, publish=True
    )

    manager.mintUser('ian')
    manager.mintPost(1, 'ian', 'category', 'title', 'text', 'link', 0, False)
    manager.mintProposal(1, "should be marked NSFW", 1 + True, ["setAsNSFW", "dontSetAsNSFW"])
    manager.voteOnProposal(1, 1, 0, 100000000)
    manager.implementProposal(1)

def test_reward_block(use_prev):
    post, user, block, ntblock, comment, manager, dao, caller = deploy_contracts(
        accounts, use_previous=use_prev, publish=True
    )

    for i in range(10):
        print(i)
        tx = manager.updateActivity(i,i,i, {"from": accounts[0]})
        print(tx.events)

    tx = manager.rewardBlock(1, {"from": accounts[0]})
    print(tx.events)

def test_stake(use_prev):
    post, user, block, ntblock, comment, manager, dao, caller = deploy_contracts(
        accounts, use_previous=use_prev, publish=True
    )

    from_dict1 = {"from": accounts[0]}

    manager.mintUser('user1', {"from": accounts[0]})
    manager.mintPost(1, 'post1', 'category', 'title', 'text', 'link', 0, False, from_dict1)

    balances = []
    num_users = 3
    for i in range(1, num_users):
        print('user', i)
        # ntblock.mint(accounts[i], 10000000000000000, {"from": accounts[0]})
        print(block.balanceOf(accounts[i]))
        print(ntblock.balanceOf(accounts[i]))
        manager.mintUser('user' + str(i+1), {"from": accounts[0]})
        manager.stakeOnPost(i, 1, 10000, {"from": accounts[0]})
        chain.mine(1)
        print('rewards')
        print(post.getStakedReward(i, 1))
        balances.append(block.balanceOf(accounts[i-1]))


    print("collecting")
    chain.mine(20)
    manager.collectAllStakes(1, {"from": accounts[0]})
    
    for i in range(1, num_users):
        print(balances[i-1], block.balanceOf(accounts[i-1]), block.balanceOf(accounts[i-1])-balances[i-1])


def test_user_score(use_prev):
    post, user, block, ntblock, comment, manager, dao, caller = deploy_contracts(
        accounts, use_previous=use_prev, publish=True
    )

    input_dict_keys, user_dict_keys = get_dicts(post, user)
    # userIds, usernames = mint_users(3, accounts, manager, caller, block, ntblock, input_dict_keys, user_dict_keys)
    
    tx2 = caller.faucet(10000000, {"from": accounts[5]})
    tx2 = caller.faucet(10000000, {"from": accounts[6]})
    tx = caller.mintUser('test1', {"from": accounts[5]})
    userId1 = getId(input_dict_keys, user_dict_keys, tx.events["userEvent"]["user"], "user")
    tx = caller.mintUser('test2', {"from": accounts[6]})
    userId2 = getId(input_dict_keys, user_dict_keys, tx.events["userEvent"]["user"], "user")
    user.addExp(1000000, userId1, accounts[5])
    tx = caller.follow(userId1, userId2, {"from": accounts[6]})

    print(user.getUser(userId1))
    print(user.getsCentralitiesNormalized(userId1))
    print(user.getCentralityScore(userId1))
    print(user.getScore(userId1))

    
    
def main(use_prev=False):
    test_centralities(use_prev=use_prev == 1)
    # test_dao(use_prev=use_prev == 1)
    # test_reward_block(use_prev=use_prev == 'true')
    # test_stake(use_prev=use_prev == 'true')
    # test_user_score(use_prev=use_prev == 'true')
