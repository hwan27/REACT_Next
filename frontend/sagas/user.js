import { all, fork, takeEvery, call, put, delay } from "redux-saga/effects";
import axios from 'axios'
import {
	LOG_IN_REQUEST,
	LOG_IN_FAILURE,
	LOG_IN_SUCCESS,
	SIGN_UP_REQUEST,
	SIGN_UP_SUCCESS,
	SIGN_UP_FAILURE,
} from "../reducers/user";

// const HELLO_SAGA = "HELLO_SAGA";

function loginAPI() {
	return axios.post('/login')// 서버에 요청을 보내는 부분
}
function signUpAPI() {
}

function* login() {
	try {
		// yield call(loginAPI);
		yield delay(2000)
		yield put({
			type: LOG_IN_SUCCESS
		});
	} catch (e) {
		console.error(e);
		yield put({
			type: LOG_IN_FAILURE
		});
	} 
}
function* signUp(){
	try {
		// yield call(signUpAPI);
		yield delay(2000);
		throw new Error('에러');
		yield put({
			type: SIGN_UP_SUCCESS
		})
	} catch (e) {
		console.error(e)
		yield put({
			type: SIGN_UP_FAILURE,
			error: e
		})
	}
}
function* watchLogin() {
	yield takeEvery(LOG_IN_REQUEST, login);
}

function* watchSignUp() {
	yield takeEvery(SIGN_UP_REQUEST, signUp)
}

export default function* userSaga() {
	yield all([fork(watchLogin)]);
	yield all([fork(watchSignUp)])
}
