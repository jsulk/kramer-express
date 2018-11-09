import { FETCH_POSTS, LIKE_POST } from '../actions/posts-actions';

export default function postsReducer(state = [], {type, payload}) {
    switch (type) {
        case FETCH_POSTS:
            return payload.posts;
        case LIKE_POST:
            const updatedItems = state.map(item => {
                if(item.data.id === payload.index){
                    return { ...item,
                                data : {
                                    ...item.data,
                                    liked: payload.liked
                                }
                            }
                    }
                return item
            });
            return updatedItems;
        default:
            return state;
    }
}