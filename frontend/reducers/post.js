export const initialState = {
	mainPosts: [
		{
			User: {
				id: 1,
				nickname: "jenny"
			},
			content: "first post",
			img: ""
		}
	],
	imagePaths: []
};

export const ADD_POST = "ADD_POST";
export const ADD_DUMMY = "ADD_DUMMY";

const addPost = {
	type: ADD_POST
};
const addDummy = {
	type: ADD_DUMMY,
	data: {
		content: "hello",
		UserId: 1,
		User: {
			nickname: "hwan"
		}
	}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST: {
			return {
				...state
			};
		}
		case ADD_DUMMY: {
			return {
				...state,
				mainPosts: [action.data, ...state.mainPosts]
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
