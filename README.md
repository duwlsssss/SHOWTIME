# 🍿 ShowTime 

### 토이프로젝트2 1조

![Image20241216121904](https://github.com/user-attachments/assets/8186a324-6f5e-468c-95fa-e360250ba0c6)

&nbsp;

## 💁 구성원

| [<img src="https://avatars.githubusercontent.com/u/55516901?v=4" width="150" height="150"/>](https://github.com/rondido) | [<img src="https://avatars.githubusercontent.com/u/92291790?v=4" width="150" height="150"/>](https://github.com/duwlsssss) | [<img src="https://avatars.githubusercontent.com/u/109134495?v=4" width="150" height="150"/>](https://github.com/choiyoungae) | [<img src="https://avatars.githubusercontent.com/u/182200395?v=4" width="150" height="150"/>](https://github.com/Hoonshi) | [<img src="https://avatars.githubusercontent.com/u/35955189?v=4" width="150" height="150"/>](https://github.com/whwjdan) |
| :-: | :-: | :-: | :-: | :-: |
| 🐯<br/>[박진현](https://github.com/rondido)<br/> 역할: 캘린더<br/>관리자 | 🐰<br/>[김여진](https://github.com/duwlsssss)<br/> 역할: 캘린더<br/>사용자 | 🐶<br/>[최영애](https://github.com/choiyoungae)<br/> 역할: 근태내역<br/>관리자 | 🐱<br/>[전영훈](https://github.com/Hoonshi)<br/> 역할: 근태내역 <br/>사용자 | 🐱<br/>[조정무](https://github.com/whwjdan)<br/> 역할: 회원관련 <br/>기능 |

&nbsp;

## 📂 프로젝트 소개

### **효율적인 근무를 위한 가상의 영화관 쇼타임의 급여 및 업무 관리 서비스입니다.**

&nbsp;

## 🧑‍💻 Tech Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) <br/> 모던한 웹 애플리케이션 개발에서 효율적이고 유지보수 가능한 코드 작성을 위해 React, TypeScript, Redux를 사용


#### 💻 Database 

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white) ![Supabase](https://shields.io/badge/supabase-black?logo=supabase&style=for-the-badge) <br/> firestore, 인증, 호스팅 등을 사용하여 빠르고 효율적인 개발을 위해 Firebase를 사용


#### 🛠 Tools 

![eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white) ![prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E) ![Lint-Staged](https://img.shields.io/badge/✔%20Lint--Staged-4B32C3?style=for-the-badge) ![Husky](https://img.shields.io/badge/🐶%20Husky-blue?style=for-the-badge) <br/> 모던 웹 개발에서 스타일링, 코드 품질, 일관된 코드 포맷팅을 효율적으로 관리하기 위한 eslint, prettier 설정,

&nbsp;

## 🔩 프로젝트 설정 및 실행 방법

1. 프로젝트 클론하기: 먼저, Git 저장소에서 프로젝트를 로컬로 클론해야 합니다. 터미널(또는 명령 프롬프트)을 열고 아래 명령어를 입력합니다.
   
   ```
   git clone https://github.com/Dev-FE-2/toy-project2-team1.git
   ```
   
   해당 명령어는 지정된 Git 저장소에서 프로젝트를 로컬 컴퓨터로 복사해옵니다.

2. 의존성 설치: 프로젝트가 로컬에 클론된 후, 프로젝트 폴더로 이동한 다음, 필요한 패키지들을 설치해야 합니다. Node.js 기반 프로젝트인 경우, npm 명령어를 사용하여 의존성을 설치할 수 있습니다.

   ```
   npm install
   ```
   
   이 명령어는 `package.json` 파일에 정의된 모든 의존성(dependencies)을 자동으로 설치해 줍니다.

3. 개발 서버 실행 모든 의존성이 설치되면, 개발 서버를 실행하여 프로젝트를 로컬에서 테스트할 수 있습니다.

   ```
   npm run dev
   ```
   
   이 명령어를 통해 개발 모드에서 서버를 시작하며, 변경 사항이 있을 때 자동으로 갱신됩니다. 이후, 브라우저에서 http://localhost:5173 주소로 접속하여 애플리케이션을 확인할 수 있습니다.

&nbsp;

## 💬 시스템 아키텍처

![시스템아키텍처](https://github.com/user-attachments/assets/eadc8364-965b-4b75-a850-86ba8a636f97)

&nbsp;

## 📄 폴더 구조

```
   📦github
   📦husky
   📦vscode
   📦public
   📦src
    ┣ 📂assets
    ┣ 📂components
    ┣ 📂constants
    ┣ 📂hooks
    ┣ 📂layout
    ┣ 📂pages
    ┣ 📂redux
    ┣ 📂routes
    ┣ 📂styles
    ┣ 📂types
    ┣ 📂utils
    ┣ App.tsx
    ┣ Main.tsx
    ┣ firebaseConfig.ts
```
&nbsp;

## 🙌🏻 컨벤션

- 커밋 컨벤션
  - 예시) feat: 홈페이지 스타일링 (#이슈번호)
  - `feat` : 새로운 기능 추가
  - `fix` : 버그 수정
  - `docs` : 문서 수정
  - `style` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
  - `refactor` : 코드 리펙토링
  - `test` : 테스트 코드, 리펙토링 테스트 코드 추가
  - `chore` : 빌드 업무 수정, 패키지 매니저 수정
- 브랜치 컨벤션
  - 이슈 브랜치명 예시: feat/login-signup-148
  - 이슈 브랜치에서 PR 올리면 검토 후 dev 브랜치로 병합
  - PR, Issue template 추가하기
  - MileStone 사용해서 일정 확인 및 관리하기
- 함수 또는 클래스 이름 컨벤션
  - 본인만 아는 이름 사용 x
  - 함수, 변수 이름: Camel Case (ex: userName, handleOnclick)
  - 클래스 컴포넌트 이름: Title Case (ex: Button)

&nbsp;

## 🕓 프로젝트 진행 과정

### 기획 및 ERD,API 문서화 (2024.11.22 ~ 2024.11.26) <br/> 기획 및 ERD, API 문서화를 진행하였습니다.

[사전 세팅(Figma)](https://www.figma.com/design/HW9kfkMlUT5xp9cT03XTTr/ShowTime1%EC%A1%B0?node-id=0-1&p=f&t=CYErJSZLoCisDW14-0) 및 레이아웃 (2024.11.22 ~ 2024.11.28) <br/> Figma 작업 및 기본 마크업 작업 과 레이아웃 작업을 진행하였습니다.

### 기능 개발(2024.11.29 ~ 2024.12.13) <br/>

역할을 분담해 전체적인 기능을 보완하고 서버를 연동했습니다.

### 테스트 및 기타 문서 정리(2024.12.14 ~ 2024.12.16) <br/>

개발 기능에 대한 테스트 및 기능에 대한 문서를 정리하였습니다.

&nbsp;

## 📄 프로젝트 ERD

![ERD](https://github.com/user-attachments/assets/3f1e3ded-1311-4bff-b0fa-197ee2323ada)

&nbsp;

## 📝 KPT 회고

#### 🌻 조정무

- KEEP

  - 팀원들과 의사소통 하며 진행 상황 체크하기
  - 궁금했던 부분 질문하기
  - 새로운 기술 학습하며 적용하기

- PROBLEM

  - 기능명세서 작성이나 마일스톤과 요구사항 중간점검이 부족했음

- TRY
  - 마일스톤이나 기능명세서 같은 부분 초기에 확실하게 정해놓고 시작하기

#### 🌻 전영훈

- KEEP

  - 모르거나 애매한 부분이 있을 땐 팀원 분들과 얘기해보기
  - 부족한 부분 구글링과 AI를 통해 계속 채우기
  - 공통적으로 작업하는 부분에 대해서 지속적으로 소통하기

- PROBLEM

  - 초기 요구사항을 안일하게 체크하였음
  - 먼저 빨리 완성하고 이후에 체크해보자 하는 생각이 많은 결점을 낳았음
  - 컨벤션에 대한 정확한 이해없이 진행하여 문제를 야기함

- TRY
  - 초기에 필요사항들을 확실히 알고 시작하기
  - 서두르지 않고 꼼꼼하게 작업하기

#### 🌻 김여진

- KEEP

  - 모르는 게 있으면 바로 질문하기
  - 궁금했던 점 멘토님께 적극적으로 질문하기
  - 부트캠프 시간동안 자리 비우지 않기
  - 기능 구현 전 팀원들과 충분한 논의를 통해 설계하기

- PROBLEM
  - 코드 리뷰가 조금 부진했음
  - 일정이 잘 공유되지 않았음
- TRY
  - 코드 리뷰 적극적으로 하고, 수용하기
  - 각자 하고 있는 작업 정확하고 빠르게 공유하기

#### 🌻 최영애

- KEEP

  - 정말 모르겠는 부분은 질문하기
  - 소통 잘 하기

- PROBLEM

  - 코드 리뷰가 잘 이루어지지 않았던 것 같음

- TRY
  - 더 적극적으로 소통하기
  - 코드 리뷰를 신경쓰기

#### 🌻 박진현

- KEEP

  - 팀원들과 의사소통 활발하게 하기
  - 프로젝트 기간내에 기능 개발 완료하기

- PROBLEM

  - 웹 접근성을 고려하지 못함
  - 날짜와 시간에 대해 정확하게 이해하지 못하고 사용했다
  - 중복되는 코드가 중간중간 있음
  - Typescript에 대한 지식이 부족하여 적재적소에 맞게 사용하지 못함
  - any 타입을 지양하지 못했음

- TRY
  - any 타입을 Unknown 타입으로 변경
  - 기본적인 테스트 코드 작성해보기
  - 적재적소에 맞는 Typescript type 사용하기
  - 중복 코드 개선하기
