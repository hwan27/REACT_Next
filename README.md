# NodeBird SNS 만들기

[Inflearn: NodeBird SNS(React, Hooks, Next)
](https://www.inflearn.com/course/react_nodebird/lecture/20841)

# 0. Hello. Nest.js.

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

    -   스케일링 이슈/ 복잡도 증가(CORS 등)
    -   프론트와 백엔드가 하는 일이 완전히 다르기 때문
    -   프론트 서버: 백엔드로부터 받은 데이터를 그려주는 서버

-   Why Next?
    -   SinglePage(React, Vue, Angular)는 검색이 불가
    -   서버사이드 렌더링
    -   코드 스플릿팅: spa로 많은 페이지를 만들었을 때, 필요한 페이지만 불러오기
    -   Next: 서버사이드에서 코드스플릿을 쉽게(spa의 공통적인 고민(Vue와 Nuxt))

## 0.2. next와 eslint 설치하기

-   기본 세팅

1. front폴더에서 npm init(node 프로젝트 선언)
2. npm i react react-dom next
3. npm i -D nodemon webpack

-   심화 세팅

4.  eslint 설정

    -   npm i -D eslint(코드형식과 규칙의 통일)
    -   .eslintrc 생성

        <pre>
        .eslintrc:
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
        </pre>

    -   npm i eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks

## 0.3 Next 라우팅 시스템

Next는 자체 라우터가 있음

1.  next 명령어 사용법

    -   global/ npx/ npm scripts

        <pre>
        package.json: 
                "scripts": {
                "dev": "next",
                "build": "next build",
                "start": "next start"
                }
        </pre>

2.  pages 폴더 생성

    -   pages 안에서 라우팅 알아서 처리(OhMyGod)
        
