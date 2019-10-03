/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback } from "react";
import Link from "next/link";
import { Form, Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../pages/signup.jsx";   // TODO: util 폴더로 옮기기
import { LOG_IN_REQUEST } from "../reducers/user";

const LoginForm = () => {
	const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
  const { isLoggingIn } = useSelector(state => state.user)
	const dispatch = useDispatch();

	const onSubmitForm = useCallback(
		e => {
			e.preventDefault();
			dispatch({
        type: LOG_IN_REQUEST,
        data: {
          id, password
        }
      })
		},
		[id, password]
	);

	return (
  <Form onSubmit={onSubmitForm} style={{ padding: `10px` }}>
    <div>
      <label htmlFor="user-id">아이디</label>
      <br />
      <Input
        name="user-id"
        value={id}
        onChange={onChangeId}
        required
      />
    </div>
    <div>
      <label htmlFor="user-password">비밀번호</label>
      <br />
      <Input
        name="user-password"
        value={password}
        onChange={onChangePassword}
        type="password"
        required
      />
    </div>
    <div style={{ marginTop: 10 }}>
      <Button type="primary" htmlType="submit" loading={isLoggingIn}>
					로그인
      </Button>

      <Link href="/signup">
        <a>
          <Button>회원가입</Button>
        </a>
      </Link>
    </div>
  </Form>
	);
};
export default LoginForm;
