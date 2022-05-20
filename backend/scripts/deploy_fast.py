from cgi import test
from brownie import accounts
from scripts.helpers import *


post, user, block, ntblock, comment, manager, dao, caller = deploy_contracts(
    accounts, use_previous=False, publish=True
)

input_dict_keys, user_dict_keys = get_dicts(post, user)
userIds, usernames = mint_users(4, accounts, manager, caller, block, ntblock, input_dict_keys, user_dict_keys)

# add follower and unfollow them
tx = caller.follow(userIds[0], userIds[1], {"from": accounts[0]})
tx = caller.unFollow(userIds[0], userIds[1], {"from": accounts[0]})

# create a post, then upvote it and change it to a downvote
tx = caller.mintPost(
    userIds[0], usernames[0], "all", "some title", "some text", "a link", 0, False, {"from": accounts[0]}
)
postId = getId(input_dict_keys, user_dict_keys, tx.events["inputEvent"]["input"], "input")
tx = caller.upvotePost(userIds[1], postId, {"from": accounts[1]})
tx = caller.downvotePost(userIds[2], postId, {"from": accounts[2]})

for i in range(4):
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


tx = caller.collectAllStakes(stakedPost)
print(tx.events)

def main():
    pass
