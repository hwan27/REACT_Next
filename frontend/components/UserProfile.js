import React, { useCallback } from "react";
import { Card, Avatar } from "antd";

const dummy = {
	nickname: "hwan",
	Post: [],
	Followings: [],
	Followers: [],
	isLoggedIn: false
};

const UserProfile = props => {
	return (
		<Card
			actions={[
				<div key="twit">
					짹짹
					<br />
					{dummy.Post.length}
				</div>,
				<div key="following">
					팔로잉
					<br />
					{dummy.Followings.length}
				</div>,
				<div key="follower">
					팔로워
					<br />
					{dummy.Followers.length}
				</div>
			]}
		>
			<Card.Meta
				avatar={<Avatar>{props.dummy.nickname[0]}</Avatar>}
				title={props.dummy.nickname}
			/>
		</Card>
	);
};

export default UserProfile;
