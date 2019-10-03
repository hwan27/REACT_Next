# React Next: SNS 제작하기

[Inflearn: NodeBird SNS(React, Hooks, Next)
](https://www.inflearn.com/course/react_nodebird/lecture/20841)

# 0. 시작

선수강: React 무료강좌(hooks), Node 기본

## 0.1. 개요: 프로젝트 구조

-   프론트 서버
    -   React, Next
    -   Redux
    -   Redux - saga
    -   Styled Components
-   백엔드 서버

    -   Express
    -   db(MySQL)
    -   ORM(시퀄라이즈)
    -   패스포트
    -   multer(S3)
    -   Socket.IO
    -   이미지 압축(lamda)

-   Why 프론트와 백엔드 분리?

    -   스케일링 이슈

        -   데이터 요청량에 따라 유연하게 대처할 수 있다
        -   서버를 분리하기 때문에 코드의 복잡도가 높아진다(CORS 등)

    -   프론트와 백엔드가 하는 일이 완전히 다르기 때문에 분리해준다
        -   프론트서버: 백엔드로부터 받은 데이터를 그려줌
        -   백엔드서버: 데이터의 수정, 저장, 전달 등을 처리함

-   Why Next?

    -   SinglePageApplication(SPA): Vue, React 등 하나의 페이지로 구성

        -   서버사이드 렌더링: SPA의 검색 이슈를 해결해주는 기술
        -   코드 스플릿팅: SPA로 많은 페이지를 만들었을 때, 필요한 페이지만 불러오기

    -   서버사이드렌더링과 코드스플릿을 동시에 구현하는 것이 매우 어렵기 때문에 Next를 활용한다(SPA의 공통적인 고민(Vue와 Nuxt))

## 0.2. Next와 eslint 설치

`front` 폴더에서 node 프로젝트를 시작한다(기본 설정)

-   `npm init`
-   `npm i react react-dom next`
-   `npm i -D nodemon webpack`

코드형식과 규칙을 통일한다(eslint 설정)

-   `npm i -D eslint`
-   `.eslintrc` 생성
-   `npm i eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks`

```js
//.eslintrc
{
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "browser": true,
        "node": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "plugins": ["import", "react-hooks"]
}
```

`package.json`의 `scripts`에 Next 명령어를 등록한다.

-   `package.json`의 `scripts` 부분을 다음과 같이 수정한다.

```js
//package.json:
"scripts": {
        "dev": "next",
        "build": "next build",
        "start": "next start"
    },
```

-   `package.json`의 전체 모습은 다음과 같다

```js
//package.json
{
    "name": "react-nodebird-front",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "dev": "next",
        "build": "next build",
        "start": "next start"
    },
    "author": "",
    "license": "MIT",
    "dependencies": {
        "antd": "^3.23.1",
        "eslint-plugin-import": "^2.18.2",
        "eslint-plugin-react": "^7.14.3",
        "eslint-plugin-react-hooks": "^2.0.1",
        "next": "^9.0.5",
        "react": "^16.9.0",
        "react-dom": "^16.9.0"
    },
    "devDependencies": {
        "eslint": "^6.3.0"
    }
}
```

## 0.3 Next 라우팅 시스템

Next는 자체적으로 라우팅을 해준다(대박 사건)

-   `front` 폴더 아래에 `pages` 폴더를 생성한다.

    -   Next에서 `pages`의 폴더명은 고정이며 해당 폴더안에서는 라우팅이 매우 쉽고 자유롭게 된다
    -   Next에서 `react`를 import할 필요가 없지만, 보통은 그냥 import해준다

-   `pages` 폴더 안에 `index.js`와 `about.js`를 생성한다

```js
//index.js
import React from "react";

const Home = () => {
	return <div>Hello, next!</div>;
};

export default Home;
```

```js
// about.js
import React from "react";

const About = () => {
	return <div>About</div>;
};

export default About;
```

-   `npm run dev`를 입력하여 실행한다

    -   routing: `http://localhost:3000/about`를 입력하면 `about` 페이지로 이동한다
    -   code splitting: 활성화되어있는 페이지만 렌더링한다
    -   주소체계와 pages구조가 같지만, 배포용 프로덕트에서는 노출되지 않는다.

## 0.4 샘플디자인: AntDesign과 기본페이지 구성

[AntD참조](https://ant.design/components/menu/)

간편하게 미리 디자인이 설정되어 있다 (Bootstrap, SemanticUI, materialUI 등)

-   `npm i antd`
-   `front/components`에 `AppLayout.js`를 생성한다

```js
//components/AppLayout.js
import React from "react";
import { Menu, Input, Button } from "antd";
import Link from "next/link";

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
			<Link href="/signup">
				<a>
					<Button>회원가입</Button>
				</a>
			</Link>
			{children}
		</div>
	);
};

export default AppLayout;
```

-   `index.js`를 다음과 같이 수정한다

```js
//pages/index.js
import React from "react";
import Link from "next/link";
import AppLayout from "../components/AppLayout";
import Head from "next/head";

const Home = () => {
	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.css"
				/>
			</Head>
			<AppLayout>
				<Link href="/about">
					<a>about</a>
				</Link>
				<div>Hello, next!</div>
			</AppLayout>
		</>
	);
};

export default Home;
```

-   `front/pages`에 `profile.js`와 `signup.js`를 생성한다

```js
//pages/profile.js
import React from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";

const Profile = () => {
	return (
		<>
			<Head>
				<title>나비넷 1.0</title>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.css"
				/>
			</Head>
			<AppLayout>
				<div>내프로필</div>
			</AppLayout>
		</>
	);
};

export default Profile;
```

## 0.5. state와 hook(회원가입 페이지 만들기)

```js
//pages/signup.js
import React, { useState, useCallback } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Form, Input, Checkbox, Button } from "antd";

const Signup = () => {
	const [passwordCheck, setPasswordCheck] = useState("");
	const [term, setTerm] = useState("");
	const [passwordError, setPasswordError] = useState("false");
	const [termError, setTermError] = useState("false");

	const useInput = (initValue = null) => {
		const [value, setter] = useState(initValue);
		const handler = useCallback(e => {
			setter(e.target.value);
		}, []);
		return [value, handler];
	};

	const [id, onChangeId] = useInput("");
	const [nick, onChangeNick] = useInput("");
	const [password, onChangePassword] = useInput("");

	const onSubmit = useCallback(
		e => {
			e.preventDefault();
			if (password !== passwordCheck) {
				return setPasswordError(true);
			}
			if (!term) {
				return setTermError(true);
			}
		},
		[password, passwordCheck, term]
	);

	const onChangePasswordCheck = useCallback(
		e => {
			setPasswordError(e.target.value !== password);
			setPasswordCheck(e.target.value);
		},
		[password]
	);

	const onChangeTerm = useCallback(e => {
		setTermError(false);
		setTerm(e.target.checked);
	}, []);

	return (
		<>
			<Head>
				<title>나비넷 1.0</title>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.css"
				/>
			</Head>
			<AppLayout>
				<Form onSubmit={onSubmit} style={{ padding: 10 }}>
					<div>
						<label htmlFor="user-id">아이디</label>
						<br />
						<Input
							name="user-id"
							value={id}
							required
							onChange={onChangeId}
						/>
					</div>
					<div>
						<label htmlFor="user-nick">닉네임</label>
						<br />
						<Input
							name="user-nick"
							vlaue={nick}
							required
							onChange={onChangeNick}
						/>
					</div>
					<div>
						<label htmlFor="user-password">비밀번호</label>
						<br />
						<Input
							name="user-password"
							value={password}
							required
							onChange={onChangePassword}
						/>
					</div>
					<div>
						<label htmlFor="user-password-check">
							비밀번호 체크
						</label>
						<br />
						<Input
							name="user-password-check"
							value={passwordCheck}
							required
							onChange={onChangePasswordCheck}
						/>
						{passwordError && (
							<div style={{ color: "red" }}>
								비밀번호가 일치하지 않습니다.
							</div>
						)}
					</div>
					<div>
						<Checkbox
							name="user-term"
							checked={term}
							onChange={onChangeTerm}
						>
							동의합니다
						</Checkbox>
						{termError ? (
							<div style={{ color: "red" }}>
								약관에 동의하셔야 합니다.
							</div>
						) : null}
					</div>
					<div style={{ marginTop: 10 }}>
						<Button type="primary" htmlType="submit">
							가입하기
						</Button>
					</div>
				</Form>
			</AppLayout>
		</>
	);
};

export default Signup;
```

-   변수명은 최대한 풀어서 적는다(구글의 평균 변수명 길이는 10자이상)
-   `eslint`는 기본적으로 `console.log`를 에러처리한다

    -   배포할 때 `console.log`는 무겁기 때문
    -   개발할 때는 그냥 에러상태로 쓰다가 배포할 때 `webpack`을 이용해서 일괄적으로 삭제해줄 수 있다

-   `hook`에 handler를 붙여서 커스텀해서 함수의 반복을 줄일 수 있다.
-   `hook`에 대한 자세한 내용은 [React 무료 강의](https://www.youtube.com/watch?v=V3QsSrldHqI&list=PLcqDmjxt30RtqbStQqk-eYMK8N-1SYIFn)참조

-   커스텀 훅 예제

```js
//custom hook
const useInput = (initValue = null) => {
	const [value, setter] = useState(initValue);
	const handler = useCallback(e => {
		setter(e.target.value);
	}, []);
	return [value, handler];
};

const [id, onChangeId] = useInput("");
```

# 1. 화면 만들기

## 1.1. 렌더 최적화(useCallback, \_app.js, react.memo )

-   `props`로 넘겨주는 함수들은 `useCallback`으로 감싸주는 것이 좋다.
    -   그렇지 않으면 `state`를 바꿀때마다 함수가 재생성되고, 새로 그려줘야한다
    -   `react dev tools`에서 `highlight updates`를 체크하면, 렌더링 상황을 확인 가능하다

```js
//useCallback
const onSubmit = useCallback(
	e => {
		e.preventDefault();
		if (password !== passwordCheck) {
			return setPasswordError(true);
		}
		if (!term) {
			return setTermError(true);
		}
	},
	[password, passwordCheck, term]
);

const onChangePasswordCheck = useCallback(
	e => {
		setPasswordError(e.target.value !== password);
		setPasswordCheck(e.target.value);
	},
	[password]
);

const onChangeTerm = useCallback(e => {
	setTermError(false);
	setTerm(e.target.checked);
}, []);
```

-   컴포넌트를 분리하여 최적화
-   `pages` 폴더 안에 `_app.js`를 생성한다

    -   Next에서 `pages`안의 `_app.js`는 부모역할을 하는 공통 레이아웃을 제공한다.
    -   변경사항이 적용되지 않으면, `npm run dev`를 다시 실행

-   `_document.js`: html, head, body
-   `_app.js`: root(컴포넌트들을 렌더링할 루트)
-   `pages`: 실제 컴포넌트
-   `_error.js`: 에러 발생시 나타나는 화면

```js
//pages/_app.js
import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";

const NodeBird = ({ Component }) => {
	return (
		<>
			<Head>
				<title>NodeBird</title>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.css"
				/>
			</Head>
			<AppLayout>
				<Component />
			</AppLayout>
		</>
	);
};
export default NodeBird;
```

-   `react.memo`를 사용하면 각각의 컴포넌트를 퓨어컴포넌트로 분리하여 최적화할 수 있다
-   `Input`의 경우 퓨어컴포넌트가 아니기때문에 직접 `react.memo`를 사용할 수 없지만 컴포넌트를 따로 만들어 강제로 memo를 적용할 수 있다.
    -   지나친 최적화로 이렇게까지 하는 경우는 별로 없다

```js
//최적화 예제
const TextInput = memo({value, onChange}) => {
    return (
        <Input name='user-id' value={value} required onChange={onChange} />
    )
}
...
<TextInput value={id} onChange={onChangeId} />
```

## 1.2. PropTypes (SNS 화면 만들기)

-   `PropTypes`를 이용하여 부모로부터 받은 올바른 자료형의 `props`를 받았는지 검사할 수 있다.

    -   React에 들어갈 수 있는 모든 js형태를 `PropTypes.node`라고 한다
    -   TypeScript는 자체 시스템이 있어서 `PropTypes`를 사용하지 않는다
    -   [PropTypes 참고](https://www.npmjs.com/pacakage/prop-types)
    -   `PropTypes`가 잘못되었을 경우, 실행은 되지만 콘솔창에 에러를 띄워준다

-   `npm i prop-types`

```js
//PropTypes 예제(_app.js)
import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import PropTypes from "prop-types";

const NodeBird = ({ Component }) => {
	return (
		<>
			<Head>
				<title>NodeBird</title>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.css"
				/>
			</Head>
			<AppLayout>
				<Component />
			</AppLayout>
		</>
	);
};

NodeBird.PropTypes = {
	Component: PropTypes.node
};
export default NodeBird;
```

## 1.3 antd 그리드시스템

-   가로(`row`)로 나누고 그 다음 세로(`col`)로 나눈다
-   `antd`는 기본적으로 반응형(전체 24 기준)

    -   xs: 모바일
    -   sm: 작은 화면
    -   md: 중간 화면
    -   lg: 큰 화면

-   dummy: 백엔드없이 프론트가 먼저 완성되었을 경우 더미데이터를 만들어 객체를 가짜로 만들어준다
    -   백엔드에서 미리 데이터구조를 정리, 문서화해놓고 더미로 만들어야함

```js
//components/AppLayout.js
import {Row, Col, Card, Avatar} from 'antd';

...

const dummy = {
    nickname: 'hwan',
    Post: [],
    Followings: [],
    Followers: []
}

...

<Row>
	<Col xs={24} md={6}>
		<Card
			actions={[
				<div key="twit">짹짹<br />{dummy.Post.length}</div>,
				<div key="following">팔로잉<br />{dummy.Followings.length}</div>,
				<div key="follower">팔로워<br />{dummy.Followers.length}</div>
			]}
		>
		    <Card.Meta
			    avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
			    title={dummy.nickname}
		    />
		</Card>
	</Col>
	<Col xs={24} md={12}>{children}</Col>
	<Col xs={24} md={6}>세번째</Col>
</Row>
```

-   AppLayout에 로그인폼과 프로필폼을 만든다

```js
//components/AppLayout.js
import React from "react";
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from "antd";
import Link from "next/link";
import PropTypes from "prop-types";

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
			<Row>
				<Col xs={24} md={6}>
					{dummy.isLoggedIn ? (
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
								avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
								title={dummy.nickname}
							/>
						</Card>
					) : (
						<Form>
							<div>
								<label htmlFor="user-id">아이디</label>
								<br />
								<Input name="user-id" required />
							</div>
							<div>
								<label htmlFor="user-password">비밀번호</label>
								<br />
								<Input
									name="user-password"
									type="password"
									required
								/>
							</div>
							<div>
								<Button
									type="primary"
									htmlType="submit"
									loading={false}
								>
									로그인
								</Button>

								<Link href="/signup">
									<a>
										<Button>회원가입</Button>
									</a>
								</Link>
							</div>
						</Form>
					)}
				</Col>
				<Col xs={24} md={12}>
					{children}
				</Col>
				<Col xs={24} md={6}>
					세번째
				</Col>
			</Row>
		</div>
	);
};

AppLayout.propTypes = {
	children: PropTypes.node
};

export default AppLayout;
```

-   3항연산자로 스테이트 `isLoggedIn`이 `true`일 경우 프로필폼이, `false`일 경우 로그인폼이 렌더링되도록 한다.
-   최적화를 위해 프로필폼과 로그인폼을 각각 컴포넌트로 따로 분리한다.

```js
//AppLayout.js
<Col xs={24} md={6}>
	{dummy.isLoggedIn ? <ProfileForm /> : <LoginForm />}
</Col>
```

```js
//components/LoginForm
import React, { useState } from "react";
import Link from "next/link";
import { Form, Button, Input } from "antd";

const LoginForm = () => {
	<Form>
		<div>
			<label htmlFor="user-id">아이디</label>
			<br />
			<Input name="user-id" required />
		</div>
		<div>
			<label htmlFor="user-password">비밀번호</label>
			<br />
			<Input name="user-password" type="password" required />
		</div>
		<div>
			<Button type="primary" htmlType="submit" loading={false}>
				로그인
			</Button>

			<Link href="/signup">
				<a>
					<Button>회원가입</Button>
				</a>
			</Link>
		</div>
	</Form>;
};
export default LoginForm;
```

-   `signup.js`에서 만든 커스텀 훅(`useInput`)을 로그인폼에서 재활용한다.
-   `export const`로 `useInput`을 모듈화

```js
//pages/signup.js
export const useInput = (initValue = null) => {
	const [value, setter] = useState(initValue);
	const handler = useCallback(e => {
		setter(e.target.value);
	}, []);
	return [value, handler];
};
```

```js
//components/LoginForm.js
import React, { useCallback } from "react";
import Link from "next/link";
import { Form, Button, Input } from "antd";
import { useInput } from "../pages/signup";

const LoginForm = () => {
	const [id, onChangeId] = useInput("");
	const [password, onChangePassword] = useInput("");
	const onSubmitForm = useCallback(
		e => {
			e.preventDefault();
			console.log({ id, password });
		},
		[id, password]
	);

	return (
		<Form onSubmit={onSubmitForm}>
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
			<div>
				<Button type="primary" htmlType="submit" loading={false}>
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
```

gutter: Col간의 간격

antd의 Icon은 Fontawsome과 같음

배열안에 jsx를 넣을때는 key가 필수

컴포넌트 분리: 조건문과 반복문을 기준으로

## 1.4. 화면 만들기

```js
//pages/index.js
import React from "react";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const dummy = {
	isLoggedIn: true,
	imagePaths: [],
	mainPosts: [
		{
			User: {
				id: 1,
				nickname: "hwan"
			},
			content: "첫 번째 게시글",
			img
		}
	]
};

const Home = () => {
	return (
		<div>
			{dummy.isLoggedIn && <PostForm />}
			{dummy.mainPosts.map(c => {
				return <PostCard key={c} post={c} />;
			})}
		</div>
	);
};

export default Home;
```

```js
//pages/signup.js
import React, { useState, useCallback } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import PropTypes from "prop-types";

const TextInput = ({ value }) => {
	return <div>{value}</div>;
};

TextInput.propTypes = {
	value: PropTypes.string
};

export const useInput = (initValue = null) => {
	const [value, setter] = useState(initValue);
	const handler = useCallback(e => {
		setter(e.target.value);
	}, []);
	return [value, handler];
};

const Signup = () => {
	const [passwordCheck, setPasswordCheck] = useState("");
	const [term, setTerm] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [termError, setTermError] = useState(false);

	const [id, onChangeId] = useInput("");
	const [nick, onChangeNick] = useInput("");
	const [password, onChangePassword] = useInput("");

	const onSubmit = useCallback(
		e => {
			e.preventDefault();
			if (password !== passwordCheck) {
				return setPasswordError(true);
			}
			if (!term) {
				return setTermError(true);
			}
		},
		[password, passwordCheck, term]
	);

	const onChangePasswordCheck = useCallback(
		e => {
			setPasswordError(e.target.value !== password);
			setPasswordCheck(e.target.value);
		},
		[password]
	);

	const onChangeTerm = useCallback(e => {
		setTermError(false);
		setTerm(e.target.checked);
	}, []);

	return (
		<>
			<Form onSubmit={onSubmit} style={{ padding: 10 }}>
				<TextInput value="135135" />
				<div>
					<label htmlFor="user-id">아이디</label>
					<br />
					<Input
						name="user-id"
						value={id}
						required
						onChange={onChangeId}
					/>
				</div>
				<div>
					<label htmlFor="user-nick">닉네임</label>
					<br />
					<Input
						name="user-nick"
						value={nick}
						required
						onChange={onChangeNick}
					/>
				</div>
				<div>
					<label htmlFor="user-password">비밀번호</label>
					<br />
					<Input
						name="user-password"
						type="password"
						value={password}
						required
						onChange={onChangePassword}
					/>
				</div>
				<div>
					<label htmlFor="user-password-check">비밀번호체크</label>
					<br />
					<Input
						name="user-password-check"
						type="password"
						value={passwordCheck}
						required
						onChange={onChangePasswordCheck}
					/>
					{passwordError && (
						<div style={{ color: "red" }}>
							비밀번호가 일치하지 않습니다.
						</div>
					)}
				</div>
				<div>
					<Checkbox
						name="user-term"
						checked={term}
						onChange={onChangeTerm}
					>
						동의합니다.
					</Checkbox>
					{termError && (
						<div style={{ color: "red" }}>
							약관에 동의하셔야 합니다.
						</div>
					)}
				</div>
				<div style={{ marginTop: 10 }}>
					<Button type="primary" htmlType="submit">
						가입하기
					</Button>
				</div>
			</Form>
		</>
	);
};

export default Signup;
```

```js
//pages/profile.js
import React from "react";
import { Button, List, Card, Icon } from "antd";
import NicknameEditForm from "../components/NicknameEditForm";

const Profile = () => {
	return (
		<div>
			<NicknameEditForm />
			<List
				style={{ marginBottom: "20px" }}
				grid={{ gutter: 4, xs: 2, md: 3 }}
				size="small"
				header={<div>팔로잉 목록</div>}
				loadMore={<Button style={{ width: "100%" }}>더 보기</Button>}
				bordered
				dataSource={["제로초", "바보", "노드버드오피셜"]}
				renderItem={item => (
					<List.Item style={{ marginTop: "20px" }}>
						<Card actions={[<Icon key="stop" type="stop" />]}>
							<Card.Meta description={item} />
						</Card>
					</List.Item>
				)}
			/>
			<List
				style={{ marginBottom: "20px" }}
				grid={{ gutter: 4, xs: 2, md: 3 }}
				size="small"
				header={<div>팔로워 목록</div>}
				loadMore={<Button style={{ width: "100%" }}>더 보기</Button>}
				bordered
				dataSource={["제로초", "바보", "노드버드오피셜"]}
				renderItem={item => (
					<List.Item style={{ marginTop: "20px" }}>
						<Card actions={[<Icon key="stop" type="stop" />]}>
							<Card.Meta description={item} />
						</Card>
					</List.Item>
				)}
			/>
		</div>
	);
};

export default Profile;
```

```js
//components/AppLayout.js
import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { Col, Input, Menu, Row } from "antd";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";

const dummy = {
	nickname: "제로초",
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
						<a>노드버드</a>
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
					<Link href="https://www.zerocho.com">
						<a target="_blank">Made by ZeroCho</a>
					</Link>
				</Col>
			</Row>
		</div>
	);
};

AppLayout.propTypes = {
	children: PropTypes.node
};

export default AppLayout;
```

```js
//components/LoginForm.js

import React, { useCallback } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useInput } from "../pages/signup"; // TODO: util 폴더로 옮기기

const LoginForm = () => {
	const [id, onChangeId] = useInput("");
	const [password, onChangePassword] = useInput("");
	const onSubmitForm = useCallback(
		e => {
			e.preventDefault();
			console.log({
				id,
				password
			});
		},
		[id, password]
	);

	return (
		<Form onSubmit={onSubmitForm} style={{ padding: "10px" }}>
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
			<div style={{ marginTop: "10px" }}>
				<Button type="primary" htmlType="submit" loading={false}>
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
```

```js
//components/NickNameEditForm.js
import { Button, Form, Input } from "antd";
import React from "react";

const NicknameEditForm = () => {
	return (
		<Form
			style={{
				marginBottom: "20px",
				border: "1px solid #d9d9d9",
				padding: "20px"
			}}
		>
			<Input addonBefore="닉네임" />
			<Button type="primary">수정</Button>
		</Form>
	);
};

export default NicknameEditForm;
```

```js
//PostCard.js
import React from "react";
import { Card, Icon, Button, Avatar } from "antd";
import PropTypes from "prop-types";

const PostCard = ({ post }) => {
	return (
		<Card
			key={+post.createdAt}
			cover={post.img && <img alt="example" src={post.img} />}
			actions={[
				<Icon type="retweet" key="retweet" />,
				<Icon type="heart" key="heart" />,
				<Icon type="message" key="message" />,
				<Icon type="ellipsis" key="ellipsis" />
			]}
			extra={<Button>팔로우</Button>}
		>
			<Card.Meta
				avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
				title={post.User.nickname}
				description={post.content}
			/>
		</Card>
	);
};

PostCard.propTypes = {
	post: PropTypes.shape({
		User: PropTypes.object,
		content: PropTypes.string,
		img: PropTypes.string,
		createdAt: PropTypes.object
	})
};

export default PostCard;
```

```js
//components/PostForm.js
import React from "react";
import { Form, Input, Button } from "antd";

const dummy = {
	isLoggedIn: true,
	imagePaths: [],
	mainPosts: [
		{
			User: {
				id: 1,
				nickname: "제로초"
			},
			content: "첫 번째 게시글",
			img:
				"https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726"
		}
	]
};

const PostForm = () => {
	return (
		<Form style={{ margin: "10px 0 20px" }} encType="multipart/form-data">
			<Input.TextArea
				maxLength={140}
				placeholder="어떤 신기한 일이 있었나요?"
			/>
			<div>
				<input type="file" multiple hidden />
				<Button>이미지 업로드</Button>
				<Button
					type="primary"
					style={{ float: "right" }}
					htmlType="submit"
				>
					짹짹
				</Button>
			</div>
			<div>
				{dummy.imagePaths.map((v, i) => {
					return (
						<div key={v} style={{ display: "inline-block" }}>
							<img
								src={"http://localhost:3065/" + v}
								style={{ width: "200px" }}
								alt={v}
							/>
							<div>
								<Button>제거</Button>
							</div>
						</div>
					);
				})}
			</div>
		</Form>
	);
};

export default PostForm;
```

```js
//components/UserProfile.js
import { Avatar, Card } from "antd";
import React from "react";

const dummy = {
	nickname: "제로초",
	Post: [],
	Followings: [],
	Followers: [],
	isLoggedIn: false
};

const UserProfile = () => {
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
				avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
				title={dummy.nickname}
			/>
		</Card>
	);
};

export default UserProfile;
```

# 2. 리덕스

## 2.1. 리덕스 주요 개념

-   dummy에 만들어놓은 데이터(state)를 관리하는 방법: `redux`, `mobax`, `graphql client`

-   흩어져 있는 스테이트들을 하나로 모아서 컴포넌트마다 필요한 스테이트만 분배해줄 수 있다.

*   `Redux(state)`를 사용하면 `React(state)`를 안써도 되지만, 훨씬 사용이 복잡하기 때문에 간단한 state는 `React(state)`를 사용한다.

*   그럼에도 리덕스를 쓰는 이유: 안정성, state를 통제하기 쉬움,

```js
//Redux의 state
{
    isLoggedIn: false, // 로그인 여부 -> A 컴포넌트
    user: {}, //로그인한 사용자 -> B, C 컴포넌트
    mainPosts: [], //메인 게시글들 -> C 컴포넌트
    ...
}
```

-   action: state를 바꾸는 행동
    ex) 로그인액션
    
-   dispatch: action을 실행
    ex) 로그인액션 디스패치

-   reducer: action의 결과로 state를 어떻게 바꿀지 정의
    ex) 로그인액션 디스패치시 스테이트`isLoggedIn`을 `true`로 바꾼다

-   store: state, action, reducer를 모두 합친 개념

-   리덕스는 리액트만 한정한게 아니라 뷰, 앵귤러, 서버쪽 어플리케이션에도 쓸 수 있다.

## 2.2. 리듀서 만들기

-   `npm i redux react-redux`

-   타임머신: action을 통해서만 state를 관리할 수 있고 action들의 기록이 다 남기 때문에, 이를 거슬러 올라가면 state의 변경을 추적할 수 있다.

-   리덕스를 사용하면 코드가 장황해진다. (타임스크립트와 같이 쓰면 효과 두배로)

-   store를 별개로 쪼개서 만들 수 있다.
    -   대신 쪼개진 store를 감싸는 하나의 root store가 있어야 한다.

```js
//reducers/user.js
export const initialState = {
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

export default reducer;
```

```js
// reducers/post.js
export const initialState = {
	mainPosts: []
};

const ADD_POST = "ADD_POST";
const ADD_DUMMY = "ADD_DUMMY";

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

const reducers = (state = initialState, action) => {
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
```

-   루트리듀서를 만들어서 유저리듀서와 포스트유저서를 통합해 관리한다.

```js
// reducers/index.js
import { combineReducers } from "redux";
import user from "./user";
import post from "./post";

const rootReducer = combineReducers({
	user,
	post
});

export default rootReducer;
```

## 2.3. 리듀서와 리액트 연결하기

-   스프레드문법: 불변성을 위해서 쓰지만, 가독성이 안좋아지고 코드가 복잡해짐 (이뮤터블, 이머로 보완)

-   `provider`와 `store`를 활용하면 리덕스의 스테이트를 자식 컴포넌트들에게 나눠줄 수 있다.

-   리엑트와 넥스트에서 리덕스 사용하는 용법이 조금 다르다

    -   `npm i next-redux-wrapper`
    -   component에 props로 store를 넣어줌

```js
//_app.js
import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import reducer from "../reducers";
import withRedux from "next-redux-wrapper";
import { createStore } from "redux";

const NodeBird = ({ Component, store }) => {
	return (
		<Provider store={store}>
			<Head>
				<title>NodeBird</title>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.css"
				/>
			</Head>
			<AppLayout>
				<Component />
			</AppLayout>
		</Provider>
	);
};

NodeBird.propTypes = {
	Component: PropTypes.elementType,
	store: Proptypes.object
};
export default withRedux((initialState, options) => {
	const store = createStore(reducer, initialState);
	//store 커스터마이징
	return store;
})(NodeBird);
```

-   `default`에서 `return state`가 아니라 `return {...state}`를 하는 이유 - 리덕스에서 액션이 하나 실행되면 원칙적으로 새로운 스테이트를 생성해서 반환해줘야하기 때문 - `default`가 별 의미없기 때문에 사실상 큰 의미는 없다

##2.4. Redux devtools

크롬의 확장프로그램으로 설치한다

-   어떤 액션이 실행되서 스테이트가 어떻게 바뀌었는지 볼 수 있다
-   임으로 디스패치를 실행시켜볼 수 있다

-   타임머신: 실행된 액션을 역추적

-   다방: redux devtool이 일반인에게 노출되어 문제가 된적 있음

-   middleware: store에서 액션 스테이트 리듀서의 과정에서 변조하거나 기능을 추가

```js
import { createStore, compose, applyMiddleware } from "redux";

...

export default withRedux((initialState, options) => {
	const middlewares = [];
	const enhancer = compose(
		applyMiddleware(...middlewares),
		!options.isServer && widonw.__REDUX__DEVTOOLS_EXTENSION__ !== "undefined"
			? window.__REDUX__DEVTOOLS_EXTENSION__()
			: f => f
	);
	const store = createStore(reducer, initialState, enhancer);
	//store 커스터마이징
	return store;
})(NodeBird);
```

-   위의 미들웨어 설정부분은 탬플릿처럼 계속 사용하며 되며, 그때 그때 추가할 미들웨어만 `const middlewares = []` 부붙에 넣어주면 된다

```js
!options.isServer && widonw.__REDUX__DEVTOOLS_EXTENSION__ !== "undefined"
	? window.__REDUX__DEVTOOLS_EXTENSION__()
	: f => f;
```

-   이 함수는 리덕스 데브툴을 설치하면 사용할 수 있는 함수로 미들웨어에 리덕스 데브툴을 추가해준다

## 2.5. react-redux 훅

react-redux 7.1 이상 버전부터 훅을 사용할 수 있다

-   connect 는 클래스 컴포넌트에만 쓰이고, 함수 컴포넌트는 모두 훅스로 처리

-   액션을 리액트에서 디스패치하는 방법

```js
//page/index.js
import React, { useEffect } from "react";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN, loginAction } from "../reducers/user";

const dummy = {
	isLoggedIn: true,
	imagePaths: [],
	mainPosts: [
		{
			User: {
				id: 1,
				nickname: "jenny"
			},
			content: "first post",
			img: ""
		}
	]
};

const Home = () => {
	const dispatch = useDispatch();
	const { isLoggedIn, user } = useSelector(state => state.user);

	useEffect(() => {
		dispatch(loginAction);
		dispatch({
			type: LOG_IN,
			data: {
				nickname: "hwan"
			}
		});
		//두 디스패치는 동일
	}, []);
	return (
		<div>
			{user ? (
				<div>로그인했습니다 : {user.nickname}</div>
			) : (
				<div>로그아웃했습니다</div>
			)}
			{dummy.isLoggedIn && <PostForm />}
			{dummy.mainPosts.map(c => {
				return <PostCard key={c} post={c} />;
			})}
		</div>
	);
};

export default Home;
```

-   useEffect에서 deps []를 비우면 componentDidMount와 동일
-   useState가 useSelector로 useState의 setState가 disptch라고 생각하면 된다.

## 2.6. react-redux-connect

훅스 적용 이전에는 high-order component였다.

-   클래스컴포넌트는 주로 connect를, 함수컴포넌트는 주로 hook을 사용한다
-   니콜라스가 주로 사용했던 것

```js
//pages/index.js
import React, { useEffect } from "react";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector, connect } from "react-redux";
import { LOG_IN, loginAction } from "../reducers/user";

const dummy = {
	isLoggedIn: true,
	imagePaths: [],
	mainPosts: [
		{
			User: {
				id: 1,
				nickname: "jenny"
			},
			content: "first post",
			img: ""
		}
	]
};

const Home = ({ user, dispatch, login }) => {
	//const dispatch = useDispatch();
	//const { isLoggedIn, user } = useSelector(state => state.user);

	useEffect(() => {
		// dispatch(loginAction);
		// dispatch({
		// 	type: LOG_IN,
		// 	data: {
		// 		nickname: "hwan"
		// 	}
		// });
		login();
	}, []);
	return (
		<div>
			{user ? (
				<div>로그인했습니다 : {user.nickname}</div>
			) : (
				<div>로그아웃했습니다</div>
			)}
			{dummy.isLoggedIn && <PostForm />}
			{dummy.mainPosts.map(c => {
				return <PostCard key={c} post={c} />;
			})}
		</div>
	);
};

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		login: () => dispatch(loginAction)
	};
}
//redux의 state와 dispatch를 component에 props로 넘겨주겠다

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
```

## 2.7. dummy데이터로 리덕스 사용

-   성능최적화를 위해서 useSelector를 최대한 자주 사용해서 스테이트를 최대한 잘게 가져오는 것이 좋다

-   너무 잘게 쪼개면 코드가 장황해지니 재량껏

```js
const { user, isLoggedIn } = useSelector(state => state.user);
```

vs

```js
const user = useSelector(state => state.user.user);
const isLoggedIn = useSelector(state => state.user.isLoggedIn);
```

-   각 컴포넌트에 있는 더미데이터를 리덕스로 옮긴다

```js
//redux/post.js
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
```

```js
//redux/user.js
const dummyUser = {
	nickname: "dummy",
	Post: [],
	Followings: [],
	Followers: []
};

export const initialState = {
	isLoggedIn: false,
	user: null
};

export const LOG_IN = "LOG_IN"; //action의 이름
export const LOG_OUT = "LOG_OUT";

export const loginAction = {
	type: LOG_IN
}; //실제 action

export const logoutAction = {
	type: LOG_OUT
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOG_IN: {
			return {
				...state,
				isLoggedIn: true,
				user: dummyUser
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

export default reducer;
```

```js
//components/UserProfile
import React, { useCallback } from "react";
import { Card, Avatar } from "antd";
import { useSelector } from "react-redux";

const UserProfile = props => {
	const { user } = useSelector(state => state.user);
	return (
		<Card
			actions={[
				<div key="twit">
					짹짹
					<br />
					{user.Post.length}
				</div>,
				<div key="following">
					팔로잉
					<br />
					{user.Followings.length}
				</div>,
				<div key="follower">
					팔로워
					<br />
					{user.Followers.length}
				</div>
			]}
		>
			<Card.Meta
				avatar={<Avatar>{user.nickname[0]}</Avatar>}
				title={user.nickname}
			/>
		</Card>
	);
};

export default UserProfile;
```

```js
//components/PostForm
import React from "react";
import { Form, Input, Button } from "antd";
import { useSelector } from "react-redux";

const PostForm = () => {
	const { imagePaths } = useSelector(state => state.post);
	return (
		<Form style={{ margin: "10px 0 20px" }} encType="multipart/form-data">
			<Input.TextArea
				maxLength={140}
				placeholder="포스트를 작성해주세요"
			/>
			<div>
				<input type="file" multiple hidden />
				<Button>이미지 업로드</Button>
				<Button
					type="primary"
					style={{ float: "right" }}
					htmlType="submit"
				>
					짹짹
				</Button>
			</div>
			<div>
				{imagePaths.map((v, i) => {
					return (
						<div key={v} style={{ display: "inline-block" }}>
							<img
								src={"http://localhost:3065/" + v}
								style={{ width: "200px" }}
								alt={v}
							/>
							<div>
								<Button>제거</Button>
							</div>
						</div>
					);
				})}
			</div>
		</Form>
	);
};
export default PostForm;
```

```js
//components/AppLayout.js
import React from "react";
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from "antd";
import Link from "next/link";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import { useSelector } from "react-redux";

const AppLayout = ({ children }) => {
	const { isLoggedIn } = useSelector(state => state.user);
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
					{isLoggedIn ? <UserProfile /> : <LoginForm />}
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
```

```js
//components/LoginForm.js
import React, { useCallback } from "react";
import Link from "next/link";
import { Form, Button, Input } from "antd";
import { useInput } from "../pages/signup";
import { useDispatch } from "react-redux";
import { loginAction } from "../reducers/user";

const LoginForm = () => {
	const [id, onChangeId] = useInput("");
	const [password, onChangePassword] = useInput("");
	const dispatch = useDispatch();

	const onSubmitForm = useCallback(
		e => {
			e.preventDefault();
			dispatch(loginAction);
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
				<Button type="primary" htmlType="submit" loading={false}>
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
```

-   로그아웃 버튼

```js
//components/UserProfile.js
import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../reducers/user";

const UserProfile = () => {
	const { user } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const onLogout = useCallback(() => {
		dispatch(logoutAction);
	}, []);
	return (
		<Card
			actions={[
				<div key="twit">
					짹짹
					<br />
					{user.Post.length}
				</div>,
				<div key="following">
					팔로잉
					<br />
					{user.Followings.length}
				</div>,
				<div key="follower">
					팔로워
					<br />
					{user.Followers.length}
				</div>
			]}
		>
			<Card.Meta
				avatar={<Avatar>{user.nickname[0]}</Avatar>}
				title={user.nickname}
			/>
			<Button onClick={onLogout}>로그아웃</Button>
		</Card>
	);
};

export default UserProfile;
```

-   로그인 시 `UserProfileForm.js`를, 로그아웃 시 `LoginForm.js`를 보여준다

```js
//components/AppLayout.js

const { isLoggedIn } = useSelector(state => state.user);
...
<Col xs={24} md={6}>
					{isLoggedIn ? <UserProfile /> : <LoginForm />}
</Col>
```

-   회원가입 액션

```js
//pages/signup.js
import React, { useState, useCallback } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { signUpAction } from "../reducers/user";
import { useDispatch } from "react-redux";

export const useInput = (initValue = null) => {
	const [value, setter] = useState(initValue);
	const handler = useCallback(e => {
		setter(e.target.value);
	}, []);
	return [value, handler];
};

const Signup = () => {
	const [passwordCheck, setPasswordCheck] = useState("");
	const [term, setTerm] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [termError, setTermError] = useState(false);

	const [id, onChangeId] = useInput("");
	const [nick, onChangeNick] = useInput("");
	const [password, onChangePassword] = useInput("");

	const dispatch = useDispatch();
	const onSubmit = useCallback(
		e => {
			e.preventDefault();
			if (password !== passwordCheck) {
				return setPasswordError(true);
			}
			if (!term) {
				return setTermError(true);
			}
			dispatch(
				signUpAction({
					id,
					password,
					nick
				})
			);
		},
		[password, passwordCheck, term]
	);

	const onChangePasswordCheck = useCallback(
		e => {
			setPasswordError(e.target.value !== password);
			setPasswordCheck(e.target.value);
		},
		[password]
	);

	const onChangeTerm = useCallback(e => {
		setTermError(false);
		setTerm(e.target.checked);
	}, []);

	return (
		<>
			<Form onSubmit={onSubmit} style={{ padding: 10 }}>
				<div>
					<label htmlFor="user-id">아이디</label>
					<br />
					<Input
						name="user-id"
						value={id}
						required
						onChange={onChangeId}
					/>
				</div>
				<div>
					<label htmlFor="user-nick">닉네임</label>
					<br />
					<Input
						name="user-nick"
						value={nick}
						required
						onChange={onChangeNick}
					/>
				</div>
				<div>
					<label htmlFor="user-password">비밀번호</label>
					<br />
					<Input
						type="password"
						name="user-password"
						value={password}
						required
						onChange={onChangePassword}
					/>
				</div>
				<div>
					<label htmlFor="user-password-check">비밀번호 체크</label>
					<br />
					<Input
						type="password"
						name="user-password-check"
						value={passwordCheck}
						required
						onChange={onChangePasswordCheck}
					/>
					{passwordError && (
						<div style={{ color: "red" }}>
							비밀번호가 일치하지 않습니다.
						</div>
					)}
				</div>
				<div>
					<Checkbox
						name="user-term"
						checked={term}
						onChange={onChangeTerm}
					>
						동의합니다
					</Checkbox>
					{termError && (
						<div style={{ color: "red" }}>
							약관에 동의하셔야 합니다.
						</div>
					)}
				</div>
				<div style={{ marginTop: 10 }}>
					<Button type="primary" htmlType="submit">
						가입하기
					</Button>
				</div>
			</Form>
		</>
	);
};

export default Signup;
```

```js
//reducers/user.js
const dummyUser = {
	nickname: "dummy",
	Post: [],
	Followings: [],
	Followers: [],
	signUpData: {}
};

export const initialState = {
	isLoggedIn: false,
	user: null
};

export const SIGN_UP = "SIGN_UP";
export const LOG_IN = "LOG_IN"; //action의 이름
export const LOG_OUT = "LOG_OUT";

export const signUpAction = data => {
	return { type: SIGN_UP, data: data };
};
export const loginAction = {
	type: LOG_IN
}; //실제 action

export const logoutAction = {
	type: LOG_OUT
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOG_IN: {
			return {
				...state,
				isLoggedIn: true,
				user: dummyUser
			};
		}
		case LOG_OUT: {
			return {
				...state,
				isLoggedIn: false,
				user: null
			};
		}
		case SIGN_UP: {
			return {
				...state,
				signUpData: action.data
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
```

-   일반적으로 리액트 스테이트와 리덕스 스테이트는 같이 쓰게 된다.
    -   리덕스 스테이트로만 만들 수 있지만 매우 번거롭기 때문에 사소한 스테이트는 리액트에서 관리
    -   서버와 통신하거나 여러 컴포넌트가 쓰는 스테이트만 리덕스로 관리

# 3. 리덕스 사가

## 3.1. 리덕스 사가 맛보기

-   리덕스는 특정 시간, 특정 동작 이후에 액션을 실행하는 것이 불가능 - 즉 서버에 data를 전달하고, 서버에서 로그인 성공 이라는 응답을 반환하고, 그걸 받아서 로그인 하는 것이 리덕스만으로는 불가능 - `middleware`를 활용해 리덕스 기능을 확장해야한다. - `redux-thunk`: 쉽지만 기능이 제한적이므로 `redux-saga`를 활용

-   `npm i redux-saga`

-   function\* generator(){} - generator: 함수 실행을 중간에 멈추거나 재개할 수 있다 - 무한의 개념 - 비동기

```js
//sagas/index.js
import { all, call } from "redux-saga/effects";
import user from "./user";
import post from "./post";

export default function* rootSaga() {
	yield all([call(user), call(post)]);
}
```

```js
//sagas/user.js
import { all, fork } from "redux-saga/effects";
import { LOG_IN, LOG_IN_FAILURE, LOG_IN_SUCCESS } from "../reducers/user";

function loginAPI() {
	//서버에 요청을 보낸다
}

function* login() {
	try {
		yield call(loginAPI);
		yield put({
			// put은 dispatch와 동일
			// loginAPI 성공 시 실행
			type: LOG_IN_SUCCESS
		});
	} catch (e) {
		// loginAPI 실패 시 실행
		console.error(e);
		yield put({
			type: LOG_IN_FAILURE
		});
	}
}
function* watchLogin() {
	yield takeLatest(LOG_IN, login);
}
export default function* userSaga() {
	yield all([fork(watchLogin)]);
}
```

```js
//sagas/post.js
import { all } from "redux-saga/effects";

export default function* postSaga() {
	yield all([]);
}
```

## 3.2. 리덕스와 리덕스사가 연결하기

```js
//pages/_app.js
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'

...

const configureStore = (initialState, options) => {
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [sagaMiddleware];
	const enhancer =
		process.env.NODE_ENV === "production"
			? compose(applyMiddleware(...middlewares))
			: compose(
					applyMiddleware(...middlewares),
					!options.isServer &&
						typeof window.__REDUX_DEVTOOLS_EXTENSION__ !==
							"undefined"
						? window.__REDUX_DEVTOOLS_EXTENSION__()
						: f => f
			  );
	const store = createStore(reducer, initialState, enhancer);
	sagaMiddleware.run(rootSaga);
	return store;
};

export default withRedux(configureStore)(NodeBird);
```

-   배포할 때는 `window.__REDUX_DEVTOOLS_EXTENSION__`를 제외한다

```js
const enhancer =
	process.env.NODE_ENV === "production"
		? compose(applyMiddleware(...middlewares))
		: compose(
				applyMiddleware(...middlewares),
				!options.isServer &&
					typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
					? window.__REDUX_DEVTOOLS_EXTENSION__()
					: f => f
		  );
```

-   `middleware`의 구조

```js
const middleware = store => next => action => {
	console.log(action);
	next(action);
};
```

## 3.3. 제네레이터

```js
function* generator() {
	console.log(1);
	console.log(2);
	yield 5;
	console.log(3);
}
const gen = generator();
gen.next();
```

-   `next()` 로 제네레이터를 실행하고 `yield`에서 멈추고 `yield`값을 `value`로 반환한다.

    -   `next()`를 다시 입력하면 `yield` 다음부분부터 실행한다.

-   `yield* [1, 2, 3, 4, 5]`: yield값을 반복문으로 반환(1, 2, 3, 4, 5 차례대로)

-   제네레이터에서는 무한반복문이 사용 가능하다.

```js
//무한 반복문
function* generator() {
	let i = 0;
	while (true) {
		yield i++;
	}
}
```

## 3.4. 리덕스 사가의 제네레이터

-   사가: `next`를 이펙트에 따라서 실행해주는 제네레이터
-   take: 해당 액션이 디스패치되면 제네레이터를 넥스트하는 이펙트

```js
const HELLO_SAGA = "HELLO_SAGA";

...

function* helloSaga() {
	console.log("before saga");
	while(true){
		yield take(HELLO_SAGA);
		console.log("hello saga");
	}
}
export default function* userSaga() {
	yield helloSaga()
}
```

-   HELLO_SAGA 액션이 들어오면 next를 실행
-   saga액션의 경우 리덕스데브툴이 아니라 컴포넌트에서 직접 디스패치해야 한다
-   각각을 디스패치했을 때, 넥스트가 한번 실행되고 해당 제네레이터는 끝나기 때문에, 반복해서 실행하고 싶다면, 무한반복문을 이용해 같은 액션을 수행한다.

*   액션을 여러개 등록하고 싶다면 `all`을 사용한다

```js
export default function* userSaga() {
	yield all([
		helloSaga(),
		watchLogin(),
		watchSignUp()
}
```

## 3.5. 사가에서 반복문 제어하기

-   액션의 반복문

```js
function* helloSaga() {
	console.log("before saga");
	for (let i = 0; i < 5; i++) {
		yield take(HELLO_SAGA);
		console.log("hello saga");
	}
}
export default function* userSaga() {
	yield helloSaga();
}
```

-   사가를 이용해서 버튼에 대한 이벤트리스너의 사용횟수를 제어할 수 있다

    -   사가에서 동작하지 않아도 리듀서는 동작함

-   로그인 이후 로그인 석세스를 반환

```js
function* watchLogin() {
	yield take(LOG_IN);
	yield put({
		type: LOG_IN_SUCCESS
	});
}

export default function* userSaga() {
	yield all(watchLogin())]);
}
```

-   첫로그인에만 로그인 석세스를 반환하므로 반복문을 넣어준다

```js
function* watchLogin() {
	while (true) {
		yield take(LOG_IN);
		yield put({
			type: LOG_IN_SUCCESS
		});
	}
}

export default function* userSaga() {
	yield all([watchLogin()]);
}
```

-   로그인 후 딜레이를 주고 로그인 석세스를 반환하도록 할 수도 있다.

```js
function* watchLogin() {
	while (true) {
		yield take(LOG_IN);
		yield delay(2000);
		yield put({
			type: LOG_IN_SUCCESS
		});
	}
}

export default function* userSaga() {
	yield all([watchLogin()]);
}
```

-   대부분의 경우 `while(true)`를 사용하게 된다
    -   때문에 `takeLatest`, `takeEvery`를 도입한다

## 3.6. takeEvery, takeLatest

```js
function* watchLogin() {
	while (true) {
		yield take(LOG_IN);
		yield put({
			type: LOG_IN_SUCCESS
		});
	}
}
```

```js
function* watchLogin() {
	yield takeEvery(LOG_IN, function*() {
		yield put({
			type: LOG_IN_SUCCESS
		});
	});
}
```

-   `takeEvery`는 `while(true)`와 동일
-   `takeLatest`는 `takeEvery`와 비슷해보이지만, 동시에 들어오는 액션의 경우 마지막 액션만 받는다
    -   끝나지 않은 이전 요청이 있다면, 이전 요청을 취소한다
    -   같은 버튼을 연속적으로 누를 경우, 해당 액션을 마지막 한번만 받을 수 있다.

## 3.7. fork, call, 사가 총정리

-   fork: 동기 / call: 비동기 요청

```js
function loginAPI() {
	//서버에 요청을 보내는 부분
}
function* login() {
	try {
		yield call(loginAPI);
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
function* watchLogin() {
	yield takeEvery(LOG_IN, login);
}

export default function* userSaga() {
	yield all([fork(watchLogin)]);
}
```

-   기타: `race`, `cancel`, `select`, `throttle`, `debounce`

## 3.8. 사가 패턴과 Q&A

-   비동기 액션의 경우 석세스, 페일리어, 리퀘스트를 나눠주는게 편하다

```js
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST"; //action의 이름
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";
```

-   로그인 요청(리퀘스트) 중에 로딩 처리를 한다

```js
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOG_IN_REQUEST: {
			return {
				...state,
				loginData: action.data,
				isLoading: true
			};
		}
		case LOG_IN_SUCCESS: {
			return {
				...state,
				isLoggedIn: true,
				user: dummyUser,
				isLoading: false
			};
		}
		case LOG_OUT_REQUEST: {
			return {
				...state,
				isLoggedIn: false,
				user: null
			};
		}
		case SIGN_UP_REQUEST: {
			return {
				...state,
				signUpData: action.data
			};
		}
		default: {
			return {
				...state
			};
		}
	}
};
```

-   try~catch: 에러 났을 경우 앱을 보호하고 요청이 실패했을 경우의 처리를 위해 사용

```js
try {
	JSON.parse(undefined);
} catch (e) {
	console.error(e);
	console.log("에러났지만 죽지 않음");
}
```

-   사가 대신 코드 자체에서 비동기처리

```js
useEffect(aync()=>{
	dispatch({
		type: LOG_IN_REQUEST
	})
	await axios.post('/login', ()=>{
		dispatch({
			type: LOG_IN_SUCCESS
		})
	})
}, [])
```

-   문제점: 이 경우 해당 코드를 재사용할 수 없다

## 3.9. eslint-config-airbnb 적용하기

`npm i -D eslint-config-airbnb`

```js
//.eslintrc
{
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module",
		"ecmaFeatures": {
			"jsx": true
		}
	},
	"env": {
		"browser": true,
		"node": true
	},
	"extends": ["airbnb"],
	"plugins": ["import", "react-hooks"]
}
```

`npm i -D eslint-plugin-jsx-a11y`

-   예외처리

```js
//.eslintrc
"rules": {
        "no-underscore-danlge": "off"
	}
```

-   바벨 최신 문법을 사용한다면

`npm i -D babel-eslint`

```js
//.eslintrc 전체
{
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module",
		"ecmaFeatures": {
			"jsx": true
		}
	},
	"env": {
		"browser": true,
		"node": true,
		"es6": true
	},
	"extends": ["airbnb", "plugin:prettier/recommended"],
	"plugins": ["import", "react-hooks"],
	"rules": {
		"no-underscore-danlge": "off"
	}
}
```
- `npm i -g eslint`
- `eslint --init`

```js
//.eslintrc.js
module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true
	},
	extends: ["airbnb"],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parser: "babel-eslint",
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: "module"
	},
	plugins: ["react", "import", "react-hooks"],
	rules: {
    "no-underscore-dangle": "off",
    "react/forbid-prop-types": "off"
	}
};
```

## 3.10. redux state와 action 구조잡기

```js
// redux/user.js
const dummyUser = {
	nickname: "dummy",
	Post: [],
	Followings: [],
	Followers: [],
};

export const initialState = {
	isLoggedIn: false, 		// 로그인 여부
	isLoggingOut: false, 	// 로그아웃 시도중
	isLoggingIn: false, 	// 로그인 시도중
	logInErrorReason: '', 	// 로그인 실패 사유
	signedUp: false, 		// 회원가입 성공
	isSigningUp: false, 	// 회원가입 시도 중
	signUpErrorReason: '', 	// 회원가입 실패 사유
	me: null, 				// 내 정보
	fallowingList: [],		// 팔로잉 리스트
	followerList: [],		// 팔로워 리스트
	userInfo: null			// 남의 정보
};

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST"; // action의 이름
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

export const LOAD_FOLLOW_REQUEST = "LOAD_FOLLOW_REQUEST";
export const LOAD_FOLLOW_SUCCESS = "LOAD_FOLLOW_SUCCESS";
export const LOAD_FOLLOW_FAILURE = "LOAD_FOLLOW_FAILURE";

export const FOLLOW_USER_REQUEST = "FOLLOW_USER_REQUEST";
export const FOLLOW_USER_SUCCESS = "FOLLOW_USER_SUCCESS";
export const FOLLOW_USER_FAILURE = "FOLLOW_USER_FAILURE";

export const UNFOLLOW_USER_REQUEST = "UNFOLLOW_USER_REQUEST";
export const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS";
export const UNFOLLOW_USER_FAILURE = "UNFOLLOW_USER_FAILURE";

export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST";
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";

export const signUpAction = data => {
	return { type: SIGN_UP_REQUEST, data };
};
export const loginAction = {
	type: LOG_IN_REQUEST
}; // 실제 action

export const logoutAction = {
	type: LOG_OUT_REQUEST
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOG_IN_REQUEST: {
			return {
				...state,
				loginData: action.data,
				isLoading: true
			};
		}
		case LOG_IN_SUCCESS: {
			return {
				...state,
				isLoggedIn: true,
				me: dummyUser,
				isLoading: false
			};
		}
		case LOG_IN_FAILURE: {
			return {
				...state,
				isLoggedIn: false,
				me: null
			}
		}
		case LOG_OUT_REQUEST: {
			return {
				...state,
				isLoggedIn: false,
				me: null
			};
		}
		
		case SIGN_UP_REQUEST: {
			return {
				...state,
				signUpData: action.data
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
```

```js
//redux/post.js
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
```

## 3.11. 로그인 리덕스 사이클

- `npm i axios`

```js
// components/LoginForm.jsx

import React, { useCallback } from "react";
import Link from "next/link";
import { Form, Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../pages/signup";   // TODO: util 폴더로 옮기기
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
```

```js
// reducers/user.js
const dummyUser = {
	nickname: "dummy",
	Post: [],
	Followings: [],
	Followers: [],
};

export const initialState = {
	isLoggedIn: false, 		// 로그인 여부
	isLoggingOut: false, 	// 로그아웃 시도중
	isLoggingIn: false, 	// 로그인 시도중
	logInErrorReason: '', 	// 로그인 실패 사유
	signedUp: false, 		// 회원가입 성공
	isSigningUp: false, 	// 회원가입 시도 중
	signUpErrorReason: '', 	// 회원가입 실패 사유
	me: null, 				// 내 정보
	fallowingList: [],		// 팔로잉 리스트
	followerList: [],		// 팔로워 리스트
	userInfo: null			// 남의 정보
};

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST"; // action의 이름
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

export const LOAD_FOLLOW_REQUEST = "LOAD_FOLLOW_REQUEST";
export const LOAD_FOLLOW_SUCCESS = "LOAD_FOLLOW_SUCCESS";
export const LOAD_FOLLOW_FAILURE = "LOAD_FOLLOW_FAILURE";

export const FOLLOW_USER_REQUEST = "FOLLOW_USER_REQUEST";
export const FOLLOW_USER_SUCCESS = "FOLLOW_USER_SUCCESS";
export const FOLLOW_USER_FAILURE = "FOLLOW_USER_FAILURE";

export const UNFOLLOW_USER_REQUEST = "UNFOLLOW_USER_REQUEST";
export const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS";
export const UNFOLLOW_USER_FAILURE = "UNFOLLOW_USER_FAILURE";

export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST";
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";

export const signUpRequestAction = data => {
	return { type: SIGN_UP_REQUEST, data };
};
export const loginRequestAction = {
	type: LOG_IN_REQUEST
}; // 실제 action

export const logoutRequestAction = {
	type: LOG_OUT_REQUEST
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOG_IN_REQUEST: {
			return {
				...state,
				isLoggingin: true,
				logInErrorReason: ''
			};
		}
		case LOG_IN_SUCCESS: {
			return {
				...state,
				isLoggingin: false,
				isLoggedIn: true,
				me: dummyUser,
				isLoading: false
			};
		}
		case LOG_IN_FAILURE: {
			return {
				...state,
				isLoggingin: false,
				isLoggedIn: false,
				logInErrorReason: action.error,
				me: null
			}
		}
		case LOG_OUT_REQUEST: {
			return {
				...state,
				isLoggedIn: false,
				me: null
			};
		}
		
		case SIGN_UP_REQUEST: {
			return {
				...state,
				signUpData: action.data
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
```
```js
// UserProfile.jsx
import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { logoutRequestAction } from "../reducers/user";

const UserProfile = () => {
	const { me } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const onLogout = useCallback(() => {
		dispatch(logoutRequestAction);
	}, []);
	return (
  <Card
    actions={[
      <div key="twit">
					짹짹
        <br />
        {me.Post.length}
      </div>,
      <div key="following">
					팔로잉
        <br />
        {me.Followings.length}
      </div>,
      <div key="follower">
					팔로워
        <br />
        {me.Followers.length}
      </div>
			]}
		>
    <Card.Meta
      avatar={<Avatar>{me.nickname[0]}</Avatar>}
      title={me.nickname}
    />
    <Button onClick={onLogout}>로그아웃</Button>
  </Card>
	);
};

export default UserProfile;
```

```js
//pages/signup.js
import React, { useState, useCallback } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { useDispatch } from "react-redux";
import { signUpRequestAction } from "../reducers/user";

export const useInput = (initValue = null) => {
	const [value, setter] = useState(initValue);
	const handler = useCallback(e => {
		setter(e.target.value);
	}, []);
	return [value, handler];
};

const Signup = () => {
	const [passwordCheck, setPasswordCheck] = useState("");
	const [term, setTerm] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [termError, setTermError] = useState(false);

	const [id, onChangeId] = useInput("");
	const [nick, onChangeNick] = useInput("");
	const [password, onChangePassword] = useInput("");

	const dispatch = useDispatch();

	const onSubmit = useCallback(
		e => {
			e.preventDefault();
			if (password !== passwordCheck) {
				return setPasswordError(true);
			}
			if (!term) {
				return setTermError(true);
			}
			dispatch(
				signUpRequestAction({
					id,
					password,
					nick
				})
			);
		},
		[password, passwordCheck, term]
	);

	const onChangePasswordCheck = useCallback(
		e => {
			setPasswordError(e.target.value !== password);
			setPasswordCheck(e.target.value);
		},
		[password]
	);

	const onChangeTerm = useCallback(e => {
		setTermError(false);
		setTerm(e.target.checked);
	}, []);

	return (
  <>
    <Form onSubmit={onSubmit} style={{ padding: 10 }}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input
          name="user-id"
          value={id}
          required
          onChange={onChangeId}
        />
      </div>
      <div>
        <label htmlFor="user-nick">닉네임</label>
        <br />
        <Input
          name="user-nick"
          value={nick}
          required
          onChange={onChangeNick}
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          type="password"
          name="user-password"
          value={password}
          required
          onChange={onChangePassword}
        />
      </div>
      <div>
        <label htmlFor="user-password-check">비밀번호 체크</label>
        <br />
        <Input
          type="password"
          name="user-password-check"
          value={passwordCheck}
          required
          onChange={onChangePasswordCheck}
        />
        {passwordError && (
        <div style={{ color: "red" }}>
							비밀번호가 일치하지 않습니다.
        </div>
					)}
      </div>
      <div>
        <Checkbox
          name="user-term"
          checked={term}
          onChange={onChangeTerm}
        >
						동의합니다
        </Checkbox>
        {termError && (
        <div style={{ color: "red" }}>
							약관에 동의하셔야 합니다.
        </div>
					)}
      </div>
      <div style={{ marginTop: 10 }}>
        <Button type="primary" htmlType="submit">
						가입하기
        </Button>
      </div>
    </Form>
  </>
	);
};

export default Signup;
```

- 로그인 사이클: submit -> onSubmitForm(LoginForm.jsx) -> LOG_IN_REQUEST(redux.user) -> watchLogin -> login -> loginAPI(saga.user)