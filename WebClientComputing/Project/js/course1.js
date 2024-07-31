document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5500/getSession', {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (response.ok) {
                console.log("세션 활성화됨");
                initMap();
            } else {
                console.log('세션 비활성화');
                window.location.href = 'http://localhost:5500/process/loginpage';
            }
        })
        .catch(error => {
            console.error('로그인 상태 확인 중 오류 발생:', error);
        });
});
function relayout() {
    map.relayout();
}
function initMap() {
    var container = document.getElementById('kakaoMaps2');
    var options = {
        center: new kakao.maps.LatLng(37.58800705903187, 126.93624716617047),
        level: 7
    };
    var map = new kakao.maps.Map(container, options);

}

function getData(page, limit = 6) {
    fetch(`http://localhost:5500/getCourseData?page=${page}&limit=${limit}`)
        .then(res => res.json())
        .then(list => {
            const courseList = document.querySelector("#board_course tbody");
            courseList.innerHTML = "";
            list.data.forEach(data => {
                const row = document.createElement("tr");
                row.className = "line";
                const title = document.createElement("td");
                title.textContent = data.title;
                const distance = document.createElement("td");
                distance.textContent = data.distance + "m";
                const time = document.createElement("td");
                time.textContent = data.time + "분";
                const user = document.createElement("td");
                user.textContent = data.id;

                row.appendChild(title);
                row.appendChild(distance);
                row.appendChild(time);
                row.appendChild(user);

                row.addEventListener("click", () => {
                    var container = document.getElementById('kakaoMaps2');
                    var pathList = data.path;
                    
                    const courseInfo = data.info;
                    // console.log(courseInfo)
                    const popup = window.open("popup.html", "_blank", "width=680, height=480");
                    popup.onload = function() {
                        const popupContent = popup.document.getElementById("popup_content");
                        popupContent.innerHTML = data.info;
                    };

                    // kakao.maps.LatLng 형식으로 변환
                    var kakaoLatLngList = pathList.map(function (point) {
                        return new kakao.maps.LatLng(point.Ma, point.La);
                    });
                    console.log(kakaoLatLngList)
                    var options = {
                        center: kakaoLatLngList[Math.ceil(kakaoLatLngList.length/2)],
                        level: 7
                    };
                    var map = new kakao.maps.Map(container, options);
                    // console.log("aaaa", kakaoLatLngList);
                    var polyline = new kakao.maps.Polyline({
                        path: kakaoLatLngList,
                        strokeWeight: 10,
                        strokeColor: 'blue',
                        strokeOpacity: 0.7,
                        strokeStyle: 'solid'
                    });
                    polyline.setMap(map);
                });
                courseList.appendChild(row);
            })
            pagination(list.totalPages, page);
        })
}

function pagination(total, current) {
    const pagination = document.getElementById("num_page");
    pagination.innerHTML = "";

    for (let i = 1; i <= total; i++) {
        const pageNum = document.createElement("button");
        pageNum.textContent = i;
        if (i === current) {
            pageNum.classList.add("active");
        }
        (function (pageNumber) {
            pageNum.addEventListener("click", function () {
                getData(pageNumber);
            });
        })(i);
        pagination.appendChild(pageNum);
    }
}

