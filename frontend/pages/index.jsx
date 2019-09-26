import React from "react";
import { useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
	const { user, isLoggedIn } = useSelector(state => state.user);
	const { mainPosts } = useSelector(state => state.post);
	// const dispatch = useDispatch();

	return (
  <div>
    {user ? (
      <div>
로그인했습니다 :
        {' '}
        {user.nickname}
      </div>
			) : (
  <div>로그아웃했습니다</div>
			)}
    {isLoggedIn && <PostForm />}
    {mainPosts.map(c => {
				return <PostCard key={c} post={c} />;
			})}
  </div>
	);
};

export default Home;
