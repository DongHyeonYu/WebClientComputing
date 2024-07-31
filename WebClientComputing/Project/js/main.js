function checkLoginStatus() {
    fetch('http://localhost:5500/getSession', {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                document.getElementById("button_logout").style.display = 'block';
                document.getElementById("kakaoMaps").style.display = "block";
                initMap();
                // relayout();
                map.setCenter(new daum.maps.LatLng(37.58800705903187, 126.93624716617047))
                console.log('세션 활성화됨');
            } else {
                document.getElementById("button_login").style.display = 'block';
                document.getElementById("need_to_login").style.display = 'block';
                console.log('세션 활성화되지 않음');
            }
        })
        .catch(error => {
            console.error('세션 상태 확인 실패:', error);
        });
}
function relayout() {
    map.relayout();
}
function initMap() {
    var container = document.getElementById('kakaoMaps');
    var options = {
        center: new kakao.maps.LatLng(37.58800705903187, 126.93624716617047),
        level: 7
    };
    var map = new kakao.maps.Map(container, options);

    var linePath = [
        new kakao.maps.LatLng(37.587720915975126, 126.93610305193512),
        new kakao.maps.LatLng(37.587324344318475, 126.9358543034439),
        new kakao.maps.LatLng(37.58699992553509, 126.93574136074578),
        new kakao.maps.LatLng(37.586477288317994, 126.93562858972064),
        new kakao.maps.LatLng(37.58609884682256, 126.9355836277167),
        new kakao.maps.LatLng(37.58570243486546, 126.93562925696493),
        new kakao.maps.LatLng(37.58454040058382, 126.93608312705003),
        new kakao.maps.LatLng(37.58287411732445, 126.93711480676583),
        new kakao.maps.LatLng(37.58247777077926, 126.93728496151869),
        new kakao.maps.LatLng(37.58213544753115, 126.93738714103303),
        new kakao.maps.LatLng(37.581675995072715, 126.9374894175416),
        new kakao.maps.LatLng(37.58127952810849, 126.93743314280847),
        new kakao.maps.LatLng(37.58094607050241, 126.9372636039662),
        new kakao.maps.LatLng(37.58072068352548, 126.93700340643929),
        new kakao.maps.LatLng(37.5805042755537, 126.93668659725478),
        new kakao.maps.LatLng(37.58026081861461, 126.93633584965661),
        new kakao.maps.LatLng(37.57897970077495, 126.93324633617989),
        new kakao.maps.LatLng(37.57801440183266, 126.93109625572018),
        new kakao.maps.LatLng(37.575623968250696, 126.92645709990184),
        new kakao.maps.LatLng(37.571358604662244, 126.92080142397005),
        new kakao.maps.LatLng(37.56932051911564, 126.91810955725951),
        new kakao.maps.LatLng(37.5687072032211, 126.91719336227862),
        new kakao.maps.LatLng(37.56773360254505, 126.91644737344171),
        new kakao.maps.LatLng(37.56703924883942, 126.91562185570977),
        new kakao.maps.LatLng(37.5666963752788, 126.91493178136903),
        new kakao.maps.LatLng(37.56643464474635, 126.91432085329369),
        new kakao.maps.LatLng(37.565775211671024, 126.91200123513285),
        new kakao.maps.LatLng(37.563082580466336, 126.90225918511929),
        new kakao.maps.LatLng(37.56053559526525, 126.89506420022097),
        new kakao.maps.LatLng(37.55940704994704, 126.89250793081901),
    ];
    var polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 10,
        strokeColor: 'blue',
        strokeOpacity: 0.7,
        strokeStyle: 'solid'
    });
    polyline.setMap(map);
}
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=API_KEY';
document.head.appendChild(script); 