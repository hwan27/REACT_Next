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
//AppLayout.js
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
// index.js
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
// profile.js
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
// signup.js
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
-   `hook`에 대한 내용은 [React 무료 강의](https://www.youtube.com/watch?v=V3QsSrldHqI&list=PLcqDmjxt30RtqbStQqk-eYMK8N-1SYIFn)참조

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

    -   React에 들어갈 수 있는 모든 js형태를 `PropTypes.node`라고 한다
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
//AppLayout.js
import {Row, Col, Card, Avatar} from 'antd';

..

const dummy = {
    nickname: 'hwan',
    Post: [],
    Followings: [],
    Followers: []
}

..

<Row>
				<Col xs={24} md={6}>
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
				</Col>
				<Col xs={24} md={12}>
					{children}
				</Col>
				<Col xs={24} md={6}>
					세번째
				</Col>
			</Row>
```
