from cgi import test
from brownie import accounts, chain
from scripts.helpers import *

is_testnet = network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS
post, user, block, ntblock, comment, manager, dao, caller = deploy_contracts(
    accounts, use_previous=False, publish=True, testnet=is_testnet
)

input_dict_keys, user_dict_keys = get_dicts(post, user)
userIds, usernames = mint_users(2, accounts, manager, caller, block, ntblock, input_dict_keys, user_dict_keys)

# add follower and unfollow them
tx = caller.follow(userIds[0], userIds[1], {"from": accounts[0]})
tx = caller.unFollow(userIds[0], userIds[1], {"from": accounts[0]})

if is_testnet:
    # roll daily quest
    caller.getDailyQuest(userIds[0])

# create a post, then upvote it and change it to a downvote
tx = caller.mintPost(
    userIds[0], usernames[0], "all", "some title", "some text", "a link", 0, False, {"from": accounts[0]}
)
postId = getId(input_dict_keys, user_dict_keys, tx.events["inputEvent"]["input"], "input")
blockNumber = chain.height
tx = caller.upvotePost(userIds[1], postId, {"from": accounts[1]})
tx = caller.downvotePost(userIds[0], postId, {"from": accounts[0]})

for i in range(2):
    tx2 = caller.faucet(10000000, {"from": accounts[i]})
    tx = caller.stakeOnPost(userIds[i], postId, 10000000, {"from": accounts[i]})

stakedPost = postId

make_comments(accounts, caller, input_dict_keys, user_dict_keys, userIds, usernames, postId)

postStruct = post.getInput(postId, {"from": accounts[0]})
result = {}
for k, v in zip(input_dict_keys, postStruct):
    if k == "commentsHead":
        comments = []
        for commentId in v:
            if commentId > 1:
                print(commentId)
                comments.append(get_comments(commentId, post, accounts, input_dict_keys))

        result[k] = comments
    else:
        result[k] = v

print(result)
print("---------------------------------------------")
result2 = post.getPostData(postId)
# print(result2)
# print('-----------------------------------------------------')
print(json.loads(result2))

print((post.numBlocksForRewards() + post.idToInput(postId)[3] + 1), chain.height)
chain.mine((post.numBlocksForRewards() + post.idToInput(postId)[3] + 1) - chain.height)
# print((post.numBlocksForRewards() + post.idToInput(1)[3] + 1), chain.height)
# tx.wait((post.numBlocksForRewards() + post.idToInput(1)[3] + 1) - chain.height)
print((post.numBlocksForRewards() + post.idToInput(postId)[3] + 1), chain.height)
caller.collectAllStakes(postId)

def main():
    pass
