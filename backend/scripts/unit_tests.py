from brownie import accounts
from scripts.helpers import *
    
# post, user, block, ntblock, comment, manager, dao = deploy_contracts(
#     accounts, use_previous=use_prev, publish=True
# )

def test_centralities(use_prev):
    post, user, block, ntblock, comment, manager, dao = deploy_contracts(
        accounts, use_previous=use_prev, publish=True
    )

    manager.changeCosts((0, 0, 0, 0, 0, 0, 0, 0, 0),  {"from": accounts[0]})
    input_dict_keys, user_dict_keys = get_dicts(post, user)
    # userIds, usernames = mint_users(6, accounts, manager, input_dict_keys, user_dict_keys)

    username = "test"
    userIds = []
    usernames = []
    for i in range(6):
        if not use_prev:
            user.grantMinterRole(accounts[i], {"from": accounts[0]})
        usernames.append(username+str(i))
        tx = manager.mintUser(usernames[-1], {"from": accounts[i]})
        userIds.append(getId(input_dict_keys, user_dict_keys, tx.events["userMinted"]["user"], "user"))

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
        tx = user.follow(userIds[g[0]], userIds[g[1]], accounts[g[0]], {"from": accounts[g[0]]})
        print(tx.events)
        # print(user.shortestPath(g[1], g[0]))
        
        for i in range(6):
            print(user.userIdToUser(i+1))

        print('-------------------------------------------------------------------------')

def test_dao(use_prev):
    post, user, block, ntblock, comment, manager, dao = deploy_contracts(
        accounts, use_previous=use_prev, publish=True
    )

    manager.mintUser('ian')
    manager.mintPost(1, 'ian', 'category', 'title', 'text', 'link', 0, False)
    manager.mintProposal(1, "test proposal", 1 + True, ["setAsNSFW", "dontSetAsNSFW"])
    manager.voteOnProposal(1, 1, 0, 100000000)
    manager.implementProposal(1)




    
    
def main(use_prev=False):
    # test_centralities(use_prev=use_prev == 1)
    test_dao(use_prev=use_prev == 1)
