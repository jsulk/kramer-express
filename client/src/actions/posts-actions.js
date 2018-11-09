export const FETCH_POSTS = 'posts:fetchPosts';
export const LIKE_POST = 'posts:likePost';

export function fetchPosts(newPosts){
    return {
        type: FETCH_POSTS,
        payload: {
            posts: newPosts
        }
    }
}

export function likePost(index, liked){
    return {
        type: LIKE_POST,
        payload: {
            index: index,
            liked: liked
        }
    }
}