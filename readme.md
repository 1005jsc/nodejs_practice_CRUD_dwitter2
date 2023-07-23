# 노드 연습 2

## 로그인 만들기

1. 회원가입

POST signup
url : {{base}}/auth/me

req body: {
"username": "ellie",
"password": "12345",
"name": "Ellie",
"email": "ellie@gmail.com",
"url": ""
}

response : {
token,
username
}

    client에서 요청하게 되면
    authController에서
    1. body값을 받음,
    2. user가 이미 존재하고 있는지 확인, 이미 존재하면 409를 띄워줌
    3. 받은 password를 bcrypt로 hash시킴
    4. 받은 값들을 data에 저장시킴
    5. 생성시킨 user의 id로 jwt.sign({id}, jwtSecretKey, {expiresIn:jwtExpiresInDays})으로 token을 만듬
    6. 201을 띄우고 {token, username}을 client에 보내줌

2. 로그인

POST login
url : {{base}}/auth/login

req body: {
"username": "ellie",
"password": "12345"
}

res {
token,
username
}

    client에서 요청하게되면
    1. body값을 받음
    2. username이 존재하는지 확인, 존재하지 않는다면 401을 띄움
    3. password값을 bcrypt로 compare를 함, password가 맞지 않는 다면 401을 띄움
    4. user의 id값으로 jwt.sign({id}, jwtSecretKey, {expiresIn:jwtExpiresInDays})로 jwttoken을 만듬
    5. 200을 띄우고 response로 {token, username}을 보냄

3. 로그아웃

api없음

백엔드 쪽에서 api를 만들어 주지는 않는다
프론트에서 백엔드에서 줬던 토큰을 localstorage에서 지워주면 된다
그럼 다시는 전에 있든 credential로 못보내니까 그걸로 충분하다
프론트에서 localstorage에서 지우고, AuthContext에 state변수로 등록되어있는 기존의 user를 setUser(undefined)로 고친다
고치게되면 웹페이지가 login 화면으로 돌아오게 된다
(대충 프론트 코드는 이렇게 되어있다 : user? <App>:<Login>)

4. 유저 토큰 만료여부 확인하기

GET me
url : {{base}}/auth/me

req 없음

res {
token,
username
}

client에서 요청하게되면

1. middleware인 isAuth로 감
2. headers의 Authorization에서 token을 가져옴, headers에 token이 없으면 401을 반환
3. 'Bearer '를 걷어내고 jwt로 decode를 함
4. decode된 값에서 user의 id를 찾고 user의 정보를 users에서 찾음, 유저가 없으면 401에러를 띄움
5. user의 아이디를 req.userId로 할당하고 next()를 해 줌, me로 감
6. findById로 users에서 user를 찾음, 없으면 404를 띄움 (이건 앞에 행동이랑 중복이 되는 듯, 좀 어쩔 수 없는게 isAuth는 공용이니까...)
7. response로 {token, username}을 보냄
