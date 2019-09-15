const initialState = {
	isLoggedIn: false,
	user: {}
};

const LOG_IN = "LOG_IN"; //action의 이름
const LOG_OUT = "LOG_OUT";

const loginAction = {
	type: LOG_IN,
	data: {
		nickname: "hwan"
	}
}; //실제 action

const logoutAction = {
	type: LOG_OUT
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOG_IN: {
			return {
				...state,
				isLoggedIn: true,
				user: action.data
			};
		}
		case LOG_OUT: {
			return {
				...state,
				isLoggedOut: false,
				user: null
			};
		}
		default: {
			return {
				...state
			};
		}
	}
};
