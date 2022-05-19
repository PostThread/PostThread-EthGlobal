from cgi import test
from brownie import accounts
from scripts.helpers import *


post, user, block, ntblock, comment, manager, dao = deploy_contracts(
    accounts, use_previous=False, publish=True
)

input_dict_keys, user_dict_keys = get_dicts(post, user)
userIds, usernames = mint_users(2, accounts, manager, input_dict_keys, user_dict_keys)

# add follower and unfollow them
tx = manager.follow(userIds[0], userIds[1], {"from": accounts[0]})
print(tx.events['followHappened'])
tx = manager.unFollow(userIds[0], userIds[1], {"from": accounts[0]})
print(tx.events['unFollowHappened'])

# create a post, then upvote it and change it to a downvote
tx = manager.mintPost(
    userIds[0], usernames[0], "all", "some title", "some text", "a link", 0, False, {"from": accounts[0]}
)
postId = getId(input_dict_keys, user_dict_keys, tx.events["postMinted"]["post"], "input")
tx = manager.upvotePost(postId)
print(tx.events['upvoteHappened'])
tx = manager.downvotePost(postId)
print(tx.events['downvoteHappened'])
tx = manager.downvotePost(postId)
print(tx.events['downvoteHappened'])


# make comment on post then comment on that comment
tx = manager.makeComment(userIds[1], usernames[1], "a comment", postId, True, False, {"from": accounts[1]})
commentId = getId(input_dict_keys, user_dict_keys, tx.events["commentMinted"]["comment"], "input")
tx = manager.makeComment(
    userIds[0], usernames[0],
    "a comment on a comment",
    commentId,
    True, False,
    {"from": accounts[0]},
)
postId = getId(
    input_dict_keys, user_dict_keys, tx.events["postMinted"]["post"], "input"
)
tx = manager.upvotePost(postId)
print(tx.events["upvoteHappened"])
tx = manager.downvotePost(postId)
print(tx.events["downvoteHappened"])

# make comment on post then comment on that comment
tx = manager.makeComment(
    userIds[1], usernames[1], "a comment", postId, True, False, {"from": accounts[1]}
)
commentId = getId(
    input_dict_keys, user_dict_keys, tx.events["commentMinted"]["comment"], "input"
)
tx = manager.makeComment(
    userIds[1],
    usernames[1],
    "a comment",
    "another link",
    postId,
    True,
    {"from": accounts[1]},
)
commentId = getId(
    input_dict_keys, user_dict_keys, tx.events["commentMinted"]["comment"], "input"
)
tx = manager.makeComment(
    userIds[0],
    usernames[0],
    "a comment on a comment",
    commentId,
    True,
    False,
    {"from": accounts[0]},
)
commentId = getId(
    input_dict_keys, user_dict_keys, tx.events["commentMinted"]["comment"], "input"
)

# make series of comments on post and comments on comments
for i in range(3):
    tx = manager.makeComment(
        userIds[1],
        usernames[1],
        f"a comment{i}",
        postId,
        True,
        False,
        {"from": accounts[1]},
    )

    tx = manager.makeComment(
        userIds[0],
        usernames[0],
        f"a comment{i+1} on a comment{i}",
        commentId,
        False,
        False,
        {"from": accounts[0]},
    )
    commentId = getId(
        input_dict_keys, user_dict_keys, tx.events["commentMinted"]["comment"], "input"
    )
    tx = manager.makeComment(
        userIds[0],
        usernames[0],
        f"a comment{i+2} on a comment{i+1}",
        commentId,
        False,
        False,
        {"from": accounts[0]},
    )
    commentId = getId(
        input_dict_keys, user_dict_keys, tx.events["commentMinted"]["comment"], "input"
    )
    tx = manager.makeComment(
        userIds[0],
        usernames[0],
        f"a comment{i+3} on a comment{i+2}",
        commentId,
        False,
        False,
        {"from": accounts[0]},
    )
    tx = manager.makeComment(
        userIds[1],
        usernames[1],
        f"a comment{i+3} on a comment{i+2}",
        commentId,
        False,
        False,
        {"from": accounts[1]},
    )


def get_comments(commentId):
    commentStruct = post.getInput(commentId, {"from": accounts[0]})
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


postStruct = post.getInput(postId, {"from": accounts[0]})
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
print("---------------------------------------------")
result2 = post.getPostData(postId)
# print(result2)
# print('-----------------------------------------------------')
print(json.loads(result2))


def main():
    pass
