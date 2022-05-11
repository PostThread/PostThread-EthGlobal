from brownie import accounts, network, Post, User, chain, config
import random
import json

LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["hardhat",
                                 "development", "ganache", "mainnet-fork"]

use_previous = False
publish = True
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

from_dict = {"from": account}

if(use_previous):
    post = Post.at(previous[cur_network]['post'])
    user = User.at(previous[cur_network]['user'])
else:
    post = Post.deploy(from_dict)
    user = User.deploy(from_dict)

if cur_network not in previous:
    previous[cur_network] = {}

previous[cur_network] = {
    'post': post.address,
    'user': user.address
}

json.dump(previous, open('previous.json', 'w'))

tx1 = user.mintUser('ian', from_dict)
tx2 = user.mintUser('john', from_dict)
username1, usernameHash1 = tx1.events['userMinted']['user'][2:4]
username2, usernameHash2 = tx2.events['userMinted']['user'][2:4]
print(username1, usernameHash1)
print(username2, usernameHash2)

tx = user.follow(usernameHash1, usernameHash2, from_dict)
print(user.hashToUser(usernameHash2))
tx = user.unFollow(usernameHash1, usernameHash2, from_dict)
print(user.hashToUser(usernameHash2))

tx = post.mintPost(usernameHash1, 'all', 'some title', 'some text', 'a link', from_dict)
postHash = tx.events['postMinted']['post'][-1]
print(post.hashToPost(postHash, from_dict))
post.upvote(postHash)
print(post.hashToPost(postHash, from_dict))

# postHash = post.posts(0)[-1]
post.downvote(postHash)
print(post.hashToPost(postHash, from_dict))

tx = post.commentOnPost(usernameHash2, 'a comment', 'another link', postHash, from_dict)
commentHash = tx.events['commentCreated']['comment'][-1]
print(post.hashToComment(commentHash))

tx = post.commentOnComment(usernameHash1, 'a comment on a comment', 'another another link', commentHash, from_dict)
commentHash = tx.events['commentCreated']['comment'][-1]
print(post.hashToComment(commentHash, from_dict))

for i in range(3):
    tx = post.commentOnPost(usernameHash2, f'a comment{i}', 'another link', postHash, from_dict)
    commentHash = tx.events['commentCreated']['comment'][-1]
    
    tx = post.commentOnComment(usernameHash1, f'a comment{i+1} on a comment{i}', 'another another link', commentHash, from_dict)
    commentHash = tx.events['commentCreated']['comment'][-1]
    tx = post.commentOnComment(usernameHash1, f'a comment{i+2} on a comment{i+1}', 'another another link', commentHash, from_dict)
    commentHash = tx.events['commentCreated']['comment'][-1]
    tx = post.commentOnComment(usernameHash1, f'a comment{i+3} on a comment{i+2}', 'another another link', commentHash, from_dict)
    tx = post.commentOnComment(usernameHash2, f'a comment{i+3} on a comment{i+2}', 'another another link', commentHash, from_dict)

# Build a dict containing all the comments on a post
abi = json.load(open("./Post.json"))
post_dict_keys = [a['outputs'][0]['components'] for a in abi['abi'] if 'name' in a and a['name'] == 'getPost'][0]
post_dict_keys = [k['name'] for k in post_dict_keys]
comment_dict_keys = [a['outputs'][0]['components'] for a in abi['abi'] if 'name' in a and a['name'] == 'getComment'][0]
comment_dict_keys = [k['name'] for k in comment_dict_keys]

def get_comments(commentHash):
    commentStruct = post.getComment(commentHash, from_dict)
    result = {}
    for k,v in zip(post_dict_keys, commentStruct):
        if k == 'commentsHead':
            comments = []
            for commentHash in v:
                comments.append(get_comments(commentHash))
                
            result[k] = comments
        else:
            result[k] = v
    return result

postStruct = post.getPost(postHash, from_dict)
result = {}
for k,v in zip(post_dict_keys, postStruct):
    if k == 'commentsHead':
        comments = []
        for commentHash in v:
            comments.append(get_comments(commentHash))
            
        result[k] = comments
    else:
        result[k] = v

print(result)
# json.dump(result, open("results.json", "w"))

# tx = post.getPost(postHash)
# print(tx.return_value)

if publish:
    Post.publish_source(post)
    User.publish_source(user)


def main():
    pass