import { post_abi } from '../constants/post_abi';


function getEventIndex(abi, event) {
    let event_index = 0
    let found = false
    abi.forEach(element => {
        if (element.name === event) {
            found = true
        }
        if (!found) event_index++
    });
    if (!found) event_index = -1
    return event_index
}


export function getArrayIndex(array, name) {
    let index = 0
    let found = false
    array.forEach(element => {
        if (element === name) {
            found = true
        }
        if (!found) index++
    })
    if (!found) index = -1
    return index
}

export function getFieldIndex(abi, event, field) {
    const event_index = getEventIndex(abi, event)
    // console.log(event_index)
    if (event_index !== -1) {
        let field_index = 0
        let found = false
        abi[event_index].inputs[0].components.forEach(component => {
            if (component.name === field) {
                found = true
            }
            if (!found) field_index++
        });
        if (!found) field_index = -1
        // console.log(abi[event_index].inputs[0].components)
        // console.log(field_index)
        return field_index
    }
}

function getPostIds(postEvents) {
    let ids = []
    postEvents.forEach(post => {
        let inputId = Number(post["input"][getFieldIndex(post_abi, "postMinted", "inputId")])
        ids.push(inputId)
    })

    const uniq = [...new Set(ids)];
    // console.log("Posts ids " + uniq)
    return uniq
}

function getSamePosts(postEvents, currentInputId) {
    let samePost = []
    postEvents.forEach(post => {
        let inputId = Number(post["input"][getFieldIndex(post_abi, "postMinted", "inputId")])
        if (currentInputId === inputId) {
            samePost.push(post)
        }
    })
    return samePost
}

function getLatest(posts) {
    let max = { "input": 0, "metadata": "", "sender": "", "block_number": 0 }
    posts.forEach(post => {
        if (post["block_number"] > max["block_number"]) max = post
    });
    return max
}

export function getLatestPosts(postEvents) {
    let posts = []
    const ids = getPostIds(postEvents)
    ids.forEach(id => {
        posts.push(getSamePosts(postEvents, id))
    })

    let latestPosts = []
    posts.forEach((post) => {
        latestPosts.push(getLatest(post))
    })

    return latestPosts
}