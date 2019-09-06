# SNS 제작하기

[Inflearn: NodeBird SNS(React, Hooks, Next)
](https://www.inflearn.com/course/react_nodebird/lecture/20841)

# 0. 시작하기

선수강: React 무료강좌(hooks), Node 기본

## 0.1. 개요

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

## 0.2. Next와 eslint 설치하기

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

## 0.4 AntDesign

[참조 사이트(Antd)](https://ant.design/components/menu/)

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

```js
// signup.js
import React from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";

const Signup = () => {
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
                <div>회원가입</div>
            </AppLayout>
        </>
    );
};

export default Signup;
```
