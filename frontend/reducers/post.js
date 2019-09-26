export const initialState = {
	mainPosts: [{
		User: {
			id: 1,
			nickname: "jenny"
		},
		content: "first post",
		img: ""
	}],								// 화면에 보일 포스트들
	imagePaths: [],					// 미리보기 이미지 경로
	addPostErrorReason: false,		// 포스트 업로드 실패 사유
	isAddingPost: false,			// 포스트 업로드 중
};

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAGPOSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = "REMOVE_IMAGE";

export const ADD_POSTS_REQUEST = 'ADD_POSTS_REQUEST';
export const ADD_POSTS_SUCCESS = 'ADD_POSTS_SUCCESS';
export const ADD_POSTS_FAILURE = 'ADD_POSTS_FAILURE';

export const LIKE_POSTS_REQUEST = 'LIKE_POSTS_REQUEST';
export const LIKE_POSTS_SUCCESS = 'LIKE_POSTS_SUCCESS';
export const LIKE_POSTS_FAILURE = 'LIKE_POSTS_FAILURE';

export const UNLIKE_POSTS_REQUEST = 'UNLIKE_POSTS_REQUEST';
export const UNLIKE_POSTS_SUCCESS = 'UNLIKE_POSTS_SUCCESS';
export const UNLIKE_POSTS_FAILURE = 'UNLIKE_POSTS_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const RETWEET_REQUEST = "RETWEET_REQUEST";
export const RETWEET_SUCCESS = "RETWEET_SUCCESS";
export const RETWEET_FAILURE = "RETWEET_FAILURE";

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POSTS_REQUEST: {
			return {
				...state
			};
		}
		
		default: {
			return {
				...state
			};
		}
	}
};

export default reducer;
