# 오늘의 달리기

##  1. 기획 의도
  1. 코로나-19 이후, 개인으로도 가능한 생활체육으로 걷기, 러닝, 마라톤 __수요의 증가__
  2. 러닝, 조깅의 경우 **매번 같은 코스**를 뛰거나, **코스에 대한 고민**이 항상 존재
  3. 사용자에게 **러닝 코스의 추천**을 통한 **다양한 러닝 경험의 제공**
  4. 매번 다른 코스의 추천을 통한 **러닝 빈도 증가*
  5. **러닝 인구의 증가**


## 2. 핵심 기능
1. 사용자에게 다양한 **러닝 코스의 추천**
2. 사용자들 간의 러닝 **경험 공유**(코스, 지형지물, 페이스 등) 

## 3. 개발환경
#### OS
![macOS](https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=macos&logoColor=F0F0F0)

#### IDE
<img src="https://img.shields.io/badge/VSCode-2C2C32.svg?style=for-the-badge&logo=visual-studio-code&logoColor=22ABF3" />


#### 사용언어
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> 
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">

#### UI Design
<img src="https://img.shields.io/badge/figma-F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white"> 




#### API
    KAKAO Maps API


#### TEST환경
    LiveServer Plugin(VScode)
    Google Chrome

#### DB
##### mysql
    $npm install mysql

## 4. MySQL 테이블 생성
#### board1
>함께달려요 게시판과 연결되는 테이블
```sql
    CREATE TABLE board1(
        num INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        pos VARCHAR(20) NOT NULL,
        title VARCHAR(100) NOT NULL,
        info VARCHAR(1000) NOT NULL,
        id VARCHAR(20) NOT NULL,
        FOREIGN KEY (id)
        REFERENCES user(id) ON DELETE CASCADE
);
```
#### board2
>크루 구인 게시판과 연결되는 테이블
```sql
CREATE TABLE board2(
    num INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    pos VARCHAR(20) NOT NULL,
    crewname VARCHAR(50) NOT NULL
    title VARCHAR(100) NOT NULL,
    info VARCHAR(1000) NOT NULL,
    id VARCHAR(20) NOT NULL,
    FOREIGN KEY (id)
    REFERENCES user(id) ON DELETE CASCADE
);
```
---
#### choice
>회원가입 시 선택 입력 사항 (신장, 체중, 나이)을 저장하는 테이블 
```sql
CREATE TABLE choice(
    id VARCHAR(20) NOT NULL PRIMARY KEY,
    height VARCHAR(10) NOT NULL,
    weight VARCHAR(10) NOT NULL,
    age VARCHAR(10) NOT NULL,
    FOREIGN KEY (id)
    REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE
);
```
---
#### Course
>코스 정보 (코스, 거리, 소요시간, 코스에대한 정보) 를 저장하는 테이블
```sql
CREATE TABLE Course(
    num INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    path JSON,
    distance VARCHAR(100) NOT NULL,
    time VARCHAR(100) NOT NULL,
    id VARCHAR(20) NOT NULL,
    title VARCHAR(100) NOT NULL,
    info VARCHAR(1000) NOT NULL,
    FOREIGN KEY (id)
    REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE
);
```
---
#### Essential
>사용자의 필수 입력정보 (전화번호, 주소)를 저장하는 테이블
```sql
CREATE TABLE Essential(
    id VARCHAR(20) NOT NULL PRIMARY KEY,
    phone VARCHAR(11) NOT NULL,
    address VARCHAR(200) NOT NULL,
    FOREIGN KEY (id)
    REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE
);
```
---
#### running
>사용자 개인의 러닝 기록들을 저장하는 테이블
```sql
CREATE TABLE running(
    id VARCHAR(20) NOT NULL PRIMARY KEY,
    cnt INT NOT NULL,
    distance INT NOT NULL,
    FOREIGN KEY (id)
    REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE
);
```
---
#### user
>사용자의 로그인을 위한 (ID,PW) 정보를 저장하는 테이블
```sql
CREATE TABLE user(
    id VARCHAR(20) NOT NULL PRIMARY KEY,
    pw VARCHAR(300) NOT NULL, 
    name VARCHAR(20) NOT NULL
);
```

## 5. 사용 모듈
#### express
    $npm intall express

#### mysql2
    $npm install mysql2

#### path
    $npm install path

#### server-static
    $npm install server-static

#### body-parser
    $npm intall body-parser

#### express-session
    $npm install express-session
#### cookie-parser

    $npm install cookie-parser
#### express-mysql-session

    $npm install express-mysql-session

#### cors
    $npm install cors

## 6. 실행방법
1. DB 계정 생성 (계정 - project / 비밀번호 - 1234)

2. DB 생성 (DB 이름 - project)

3. 다른 이름으로 DB 생성 시 config/dbconfig.json수정
    ```JSON
    dbconfig.json
    {
    "host": "localhost",
    "user": USER_DB_ID,
    "password": USER_PASSWORD,
    "database": USER_DB_NAME
    }
    ```
4. main.html, main.js course1.html, course2.html, course1.js. course2.js의 KAKAO Maps API키 수정(현재 수정되어 있음) 
 
5. 위의 모듈 모두 설치 후, LiveServer 확장설정

6. LiveServer 확장설정의 settings.json 수정
    ```JSON 
    "liveServer.settings.port": "5501"
    ```

7. 해당 코드 추가 (현재 테스트를 위해 모두 하드코딩 되어있음)
   따라서 클라이언트 측 포트 (**5501**) 서버측 포트(**5500**)고정 후 실행

8. VSCode에서 **server.js** 실행(codeRunner Plugin 사용)

9. main.html 접속(우클릭 후 Open with Live Server 클릭) 


## 7. 개발 목표 사항
#### 1) 회원가입(완료)
     DB연동 및 DB에 회원정보 저장
#### 2) 로그인 구현 및 유지(완료)
    * 사용자 ID, PW 일치 불일치에 따른 로그인 성공 시에 Session발급
    * 로그인 시 1시간 타임아웃 적용 하여 로그인 1시간 동안 유지
#### 3) 사용자 개인 정보 수정 기능

#### 4) 사용자 개인 러닝 기록 추가
    * 러닝 기록(코스, 거리, 페이스 등) 추가 기능 

#### 5) 사용자 개인 크루 관리 기능
    * 크루 생성, 크루 가입 및 탈퇴 기능 

#### 6) 코스 등록 및 조회(완료)
    * 사용자 입력에 따른 코스 정보 등록
    * 사용자가 등록한 코스 조회
    * 코스 등록 시, 코스 입력만으로 거리, 시간 계산 제공 

#### 7) 게시판 기능(완료)
    * 러닝 구인 게시판
    * 크루 구인 게시판
    * 일반적인 게시판 기능 제공 (글쓰기, 조회)

#### 8) 사용자 개인 기록에 따른 등급 구분 및 부여 
    * 브론즈 – 누적 거리 50km 이하, 평균 페이스 08’00’’ 이하
    * 실버   – 누적 거리 300km 이하, 평균 페이스 07’00’’ 이하
    * 골드   – 누적 거리 600km 이하, 평균 페이스 06’00’’ 이하 
    * 다이아 – 누적 거리 1000km 이상, 평균 페이스 05’00’’ 이상

#### 9) 사용자 개인 기록에 따른 코스 추천
    * 사용자가 등록한 개인 러닝 기록 기반 실력 구분 이후 수준에 맞는 러닝코스 제공
  
## 8. 개발현황
### 완료사항들
1. UI 디자인 및 HTML, CSS 구성 완료  
>   1. 메인 페이지
>   2. 로그인 페이지
>   3. 회원가입 페이지
>   4. 마이페이지_정보수정, 나의 러닝 기록 조회, 크루관리
>   5. 게시판_함께 달려요, 크루
>   6. 글쓰기_함께 달려요, 크루
>   7. 코스 등록
>   8. 코스 조회
2. 기능구현
>   1. 서버구성(express)
>   2. DB구성(MySQL)
>   3. 회원 가입 및 DB 저장 구현
>   4. 로그인 구현
>   5. 로그인 유지 구현
>   6. 지도 생성
>   7. 게시글 등록 기능
>   8. 게시글 조회 기능
>   9. 코스 등록 기능 
>   10. 코스 조회 기능
### 미완성 사항들
1.UI 디자인 및 HTML, CSS 구성
> 1. ID/PW 찾기 페이지

## 9. 실행중 오류 발생시
>Q. 지도가 뜨지않아요 <br>  A. 코드내에 API KEY 가 필요한 부분에 모두 넣었는지 확인

>Q. DB연결이 되지 않아요 <br> A. 올바른 이름으로 DB 계정과 DB가 생성되었는지 확인
 하고 config/dbconfig.json 파일을 올바르게 수정 할 것 

>위의 두 문제가 아닌 경우 해결이 불가능할 시 <br> ydh91026@kookin.ac.kr<br>
010-9695-9102
어느 것으로 연락 주셔도 괜찮습니다! 
---
<br><br><br><br><br><br><br><br><br><br>
# 하단은 참고용 입니다.
## 사용 Open Source

>KAKAO Maps API 지도 생성하기 
><https://apis.map.kakao.com/web/sample/basicMap/>
#### JavaScript
```JavaScript
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 
```
#### HTML
```HTML
<div id="map" style="width:100%;height:350px;"></div>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY를 사용하세요"></script>
```
---

>KAKAO Maps API 지도에 선긋기
<https://apis.map.kakao.com/web/sample/drawShape/>
#### JavaScript
```JavaScript
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 지도에 표시할 원을 생성합니다
var circle = new kakao.maps.Circle({
    center : new kakao.maps.LatLng(33.450701, 126.570667),  // 원의 중심좌표 입니다 
    radius: 50, // 미터 단위의 원의 반지름입니다 
    strokeWeight: 5, // 선의 두께입니다 
    strokeColor: '#75B8FA', // 선의 색깔입니다
    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'dashed', // 선의 스타일 입니다
    fillColor: '#CFE7FF', // 채우기 색깔입니다
    fillOpacity: 0.7  // 채우기 불투명도 입니다   
}); 

// 지도에 원을 표시합니다 
circle.setMap(map); 


// 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
var linePath = [
    new kakao.maps.LatLng(33.452344169439975, 126.56878163224233),
    new kakao.maps.LatLng(33.452739313807456, 126.5709308145358),
    new kakao.maps.LatLng(33.45178067090639, 126.5726886938753) 
];

// 지도에 표시할 선을 생성합니다
var polyline = new kakao.maps.Polyline({
    path: linePath, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 5, // 선의 두께 입니다
    strokeColor: '#FFAE00', // 선의 색깔입니다
    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'solid' // 선의 스타일입니다
});

// 지도에 선을 표시합니다 
polyline.setMap(map);  


var sw = new kakao.maps.LatLng(33.448842, 126.570379), // 사각형 영역의 남서쪽 좌표
    ne = new kakao.maps.LatLng(33.450026,  126.568556); // 사각형 영역의 북동쪽 좌표

// 사각형을 구성하는 영역정보를 생성합니다
// 사각형을 생성할 때 영역정보는 LatLngBounds 객체로 넘겨줘야 합니다
var rectangleBounds = new kakao.maps.LatLngBounds(sw, ne);

// 지도에 표시할 사각형을 생성합니다
var rectangle = new kakao.maps.Rectangle({
    bounds: rectangleBounds, // 그려질 사각형의 영역정보입니다
    strokeWeight: 4, // 선의 두께입니다
    strokeColor: '#FF3DE5', // 선의 색깔입니다
    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'shortdashdot', // 선의 스타일입니다
    fillColor: '#FF8AEF', // 채우기 색깔입니다
    fillOpacity: 0.8 // 채우기 불투명도 입니다
});

// 지도에 사각형을 표시합니다
rectangle.setMap(map);


// 다각형을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 다각형을 표시합니다
var polygonPath = [
    new kakao.maps.LatLng(33.45133510810506, 126.57159381623066),
    new kakao.maps.LatLng(33.44955812811862, 126.5713551811832),
    new kakao.maps.LatLng(33.449986291544086, 126.57263296172184),
    new kakao.maps.LatLng(33.450682513554554, 126.57321034054742),
    new kakao.maps.LatLng(33.451346760004206, 126.57235740081413) 
];

// 지도에 표시할 다각형을 생성합니다
var polygon = new kakao.maps.Polygon({
    path:polygonPath, // 그려질 다각형의 좌표 배열입니다
    strokeWeight: 3, // 선의 두께입니다
    strokeColor: '#39DE2A', // 선의 색깔입니다
    strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'longdash', // 선의 스타일입니다
    fillColor: '#A2FF99', // 채우기 색깔입니다
    fillOpacity: 0.7 // 채우기 불투명도 입니다
});

// 지도에 다각형을 표시합니다
polygon.setMap(map);
```
#### HTML
```HTML
<div id="map" style="width:100%;height:350px;"></div>    

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY를 사용하세요"></script>
```

---
>KAKAO Maps API 선의 거리 계산하기<https://apis.map.kakao.com/web/sample/basicMap/>
#### JavaScript
```JSP
var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

var drawingFlag = false; // 선이 그려지고 있는 상태를 가지고 있을 변수입니다
var moveLine; // 선이 그려지고 있을때 마우스 움직임에 따라 그려질 선 객체 입니다
var clickLine // 마우스로 클릭한 좌표로 그려질 선 객체입니다
var distanceOverlay; // 선의 거리정보를 표시할 커스텀오버레이 입니다
var dots = {}; // 선이 그려지고 있을때 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열입니다.

// 지도에 클릭 이벤트를 등록합니다
// 지도를 클릭하면 선 그리기가 시작됩니다 그려진 선이 있으면 지우고 다시 그립니다
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {

    // 마우스로 클릭한 위치입니다 
    var clickPosition = mouseEvent.latLng;

    // 지도 클릭이벤트가 발생했는데 선을 그리고있는 상태가 아니면
    if (!drawingFlag) {

        // 상태를 true로, 선이 그리고있는 상태로 변경합니다
        drawingFlag = true;
        
        // 지도 위에 선이 표시되고 있다면 지도에서 제거합니다
        deleteClickLine();
        
        // 지도 위에 커스텀오버레이가 표시되고 있다면 지도에서 제거합니다
        deleteDistnce();

        // 지도 위에 선을 그리기 위해 클릭한 지점과 해당 지점의 거리정보가 표시되고 있다면 지도에서 제거합니다
        deleteCircleDot();
    
        // 클릭한 위치를 기준으로 선을 생성하고 지도위에 표시합니다
        clickLine = new kakao.maps.Polyline({
            map: map, // 선을 표시할 지도입니다 
            path: [clickPosition], // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
            strokeWeight: 3, // 선의 두께입니다 
            strokeColor: '#db4040', // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid' // 선의 스타일입니다
        });
        
        // 선이 그려지고 있을 때 마우스 움직임에 따라 선이 그려질 위치를 표시할 선을 생성합니다
        moveLine = new kakao.maps.Polyline({
            strokeWeight: 3, // 선의 두께입니다 
            strokeColor: '#db4040', // 선의 색깔입니다
            strokeOpacity: 0.5, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid' // 선의 스타일입니다    
        });
    
        // 클릭한 지점에 대한 정보를 지도에 표시합니다
        displayCircleDot(clickPosition, 0);

            
    } else { // 선이 그려지고 있는 상태이면

        // 그려지고 있는 선의 좌표 배열을 얻어옵니다
        var path = clickLine.getPath();

        // 좌표 배열에 클릭한 위치를 추가합니다
        path.push(clickPosition);
        
        // 다시 선에 좌표 배열을 설정하여 클릭 위치까지 선을 그리도록 설정합니다
        clickLine.setPath(path);

        var distance = Math.round(clickLine.getLength());
        displayCircleDot(clickPosition, distance);
    }
});
    
// 지도에 마우스무브 이벤트를 등록합니다
// 선을 그리고있는 상태에서 마우스무브 이벤트가 발생하면 그려질 선의 위치를 동적으로 보여주도록 합니다
kakao.maps.event.addListener(map, 'mousemove', function (mouseEvent) {

    // 지도 마우스무브 이벤트가 발생했는데 선을 그리고있는 상태이면
    if (drawingFlag){
        
        // 마우스 커서의 현재 위치를 얻어옵니다 
        var mousePosition = mouseEvent.latLng; 

        // 마우스 클릭으로 그려진 선의 좌표 배열을 얻어옵니다
        var path = clickLine.getPath();
        
        // 마우스 클릭으로 그려진 마지막 좌표와 마우스 커서 위치의 좌표로 선을 표시합니다
        var movepath = [path[path.length-1], mousePosition];
        moveLine.setPath(movepath);    
        moveLine.setMap(map);
        
        var distance = Math.round(clickLine.getLength() + moveLine.getLength()), // 선의 총 거리를 계산합니다
            content = '<div class="dotOverlay distanceInfo">총거리 <span class="number">' + distance + '</span>m</div>'; // 커스텀오버레이에 추가될 내용입니다
        
        // 거리정보를 지도에 표시합니다
        showDistance(content, mousePosition);   
    }             
});                 

// 지도에 마우스 오른쪽 클릭 이벤트를 등록합니다
// 선을 그리고있는 상태에서 마우스 오른쪽 클릭 이벤트가 발생하면 선 그리기를 종료합니다
kakao.maps.event.addListener(map, 'rightclick', function (mouseEvent) {

    // 지도 오른쪽 클릭 이벤트가 발생했는데 선을 그리고있는 상태이면
    if (drawingFlag) {
        
        // 마우스무브로 그려진 선은 지도에서 제거합니다
        moveLine.setMap(null);
        moveLine = null;  
        
        // 마우스 클릭으로 그린 선의 좌표 배열을 얻어옵니다
        var path = clickLine.getPath();
    
        // 선을 구성하는 좌표의 개수가 2개 이상이면
        if (path.length > 1) {

            // 마지막 클릭 지점에 대한 거리 정보 커스텀 오버레이를 지웁니다
            if (dots[dots.length-1].distance) {
                dots[dots.length-1].distance.setMap(null);
                dots[dots.length-1].distance = null;    
            }

            var distance = Math.round(clickLine.getLength()), // 선의 총 거리를 계산합니다
                content = getTimeHTML(distance); // 커스텀오버레이에 추가될 내용입니다
                
            // 그려진 선의 거리정보를 지도에 표시합니다
            showDistance(content, path[path.length-1]);  
             
        } else {

            // 선을 구성하는 좌표의 개수가 1개 이하이면 
            // 지도에 표시되고 있는 선과 정보들을 지도에서 제거합니다.
            deleteClickLine();
            deleteCircleDot(); 
            deleteDistnce();

        }
        
        // 상태를 false로, 그리지 않고 있는 상태로 변경합니다
        drawingFlag = false;          
    }  
});    

// 클릭으로 그려진 선을 지도에서 제거하는 함수입니다
function deleteClickLine() {
    if (clickLine) {
        clickLine.setMap(null);    
        clickLine = null;        
    }
}

// 마우스 드래그로 그려지고 있는 선의 총거리 정보를 표시하거
// 마우스 오른쪽 클릭으로 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 생성하고 지도에 표시하는 함수입니다
function showDistance(content, position) {
    
    if (distanceOverlay) { // 커스텀오버레이가 생성된 상태이면
        
        // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
        distanceOverlay.setPosition(position);
        distanceOverlay.setContent(content);
        
    } else { // 커스텀 오버레이가 생성되지 않은 상태이면
        
        // 커스텀 오버레이를 생성하고 지도에 표시합니다
        distanceOverlay = new kakao.maps.CustomOverlay({
            map: map, // 커스텀오버레이를 표시할 지도입니다
            content: content,  // 커스텀오버레이에 표시할 내용입니다
            position: position, // 커스텀오버레이를 표시할 위치입니다.
            xAnchor: 0,
            yAnchor: 0,
            zIndex: 3  
        });      
    }
}

// 그려지고 있는 선의 총거리 정보와 
// 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 삭제하는 함수입니다
function deleteDistnce () {
    if (distanceOverlay) {
        distanceOverlay.setMap(null);
        distanceOverlay = null;
    }
}

// 선이 그려지고 있는 상태일 때 지도를 클릭하면 호출하여 
// 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 표출하는 함수입니다
function displayCircleDot(position, distance) {

    // 클릭 지점을 표시할 빨간 동그라미 커스텀오버레이를 생성합니다
    var circleOverlay = new kakao.maps.CustomOverlay({
        content: '<span class="dot"></span>',
        position: position,
        zIndex: 1
    });

    // 지도에 표시합니다
    circleOverlay.setMap(map);

    if (distance > 0) {
        // 클릭한 지점까지의 그려진 선의 총 거리를 표시할 커스텀 오버레이를 생성합니다
        var distanceOverlay = new kakao.maps.CustomOverlay({
            content: '<div class="dotOverlay">거리 <span class="number">' + distance + '</span>m</div>',
            position: position,
            yAnchor: 1,
            zIndex: 2
        });

        // 지도에 표시합니다
        distanceOverlay.setMap(map);
    }

    // 배열에 추가합니다
    dots.push({circle:circleOverlay, distance: distanceOverlay});
}

// 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 지도에서 모두 제거하는 함수입니다
function deleteCircleDot() {
    var i;

    for ( i = 0; i < dots.length; i++ ){
        if (dots[i].circle) { 
            dots[i].circle.setMap(null);
        }

        if (dots[i].distance) {
            dots[i].distance.setMap(null);
        }
    }

    dots = [];
}

// 마우스 우클릭 하여 선 그리기가 종료됐을 때 호출하여 
// 그려진 선의 총거리 정보와 거리에 대한 도보, 자전거 시간을 계산하여
// HTML Content를 만들어 리턴하는 함수입니다
function getTimeHTML(distance) {

    // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
    var walkkTime = distance / 67 | 0;
    var walkHour = '', walkMin = '';

    // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
    if (walkkTime > 60) {
        walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + '</span>시간 '
    }
    walkMin = '<span class="number">' + walkkTime % 60 + '</span>분'

    // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
    var bycicleTime = distance / 227 | 0;
    var bycicleHour = '', bycicleMin = '';

    // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
    if (bycicleTime > 60) {
        bycicleHour = '<span class="number">' + Math.floor(bycicleTime / 60) + '</span>시간 '
    }
    bycicleMin = '<span class="number">' + bycicleTime % 60 + '</span>분'

    // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
    var content = '<ul class="dotOverlay distanceInfo">';
    content += '    <li>';
    content += '        <span class="label">총거리</span><span class="number">' + distance + '</span>m';
    content += '    </li>';
    content += '    <li>';
    content += '        <span class="label">도보</span>' + walkHour + walkMin;
    content += '    </li>';
    content += '    <li>';
    content += '        <span class="label">자전거</span>' + bycicleHour + bycicleMin;
    content += '    </li>';
    content += '</ul>'

    return content;
}
```
#### HTML
```HTML
<div id="map" style="width:100%;height:350px;"></div>  
<p>
    <em>지도를 마우스로 클릭하면 선 그리기가 시작되고<br>오른쪽 마우스를 클릭하면 선 그리기가 종료됩니다</em>
</p>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY를 사용하세요"></script>
```
#### CSS
```CSS
.dot {
    overflow: hidden;
    float: left;
    width: 12px;
    height: 12px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/mini_circle.png');
}

.dotOverlay {
    position: relative;
    bottom: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    border-bottom: 2px solid #ddd;
    float: left;
    font-size: 12px;
    padding: 5px;
    background: #fff;
}

.dotOverlay:nth-of-type(n) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
}

.number {
    font-weight: bold;
    color: #ee6152;
}

.dotOverlay:after {
    content: '';
    position: absolute;
    margin-left: -6px;
    left: 50%;
    bottom: -8px;
    width: 11px;
    height: 8px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white_small.png')
}

.distanceInfo {
    position: relative;
    top: 5px;
    left: 5px;
    list-style: none;
    margin: 0;
}

.distanceInfo .label {
    display: inline-block;
    width: 50px;
}

.distanceInfo:after {
    content: none;
}
```
