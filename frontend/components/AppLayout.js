import React from "react";
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from "antd";
import Link from "next/link";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";

const dummy = {
	nickname: "hwan",
	Post: [],
	Followings: [],
	Followers: [],
	isLoggedIn: false
};

const AppLayout = ({ children }) => {
	return (
		<div>
			<Menu mode="horizontal">
				<Menu.Item key="home">
					<Link href="/">
						<a>나비넷</a>
					</Link>
				</Menu.Item>
				<Menu.Item key="profile">
					<Link href="/profile">
						<a>프로필</a>
					</Link>
				</Menu.Item>
				<Menu.Item key="mail">
					<Input.Search
						enterButton
						style={{ verticalAlign: "middle" }}
					/>
				</Menu.Item>
			</Menu>
			<Row gutter={8}>
				<Col xs={24} md={6}>
					{dummy.isLoggedIn ? <UserProfile /> : <LoginForm />}
				</Col>
				<Col xs={24} md={12}>
					{children}
				</Col>
				<Col xs={24} md={6}>
					<a>made by hwan</a>
				</Col>
			</Row>
		</div>
	);
};

AppLayout.propTypes = {
	children: PropTypes.node
};

export default AppLayout;
