document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5500/getSession', {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (response.ok) {
                console.log("세션 활성화됨");
            } else {
                console.log('세션 비활성화');
                window.location.href = 'http://localhost:5500/process/loginpage';
            }
        })
        .catch(error => {
            console.error('로그인 상태 확인 중 오류 발생:', error);
        });
});



function getData(page=1, limit = 10) {
    fetch(`http://localhost:5500/getPost2?page=${page}&limit=${limit}`)
        .then(res => res.json())
        .then(list => {
            console.log("ass",list);
            const contents = document.querySelector("#board tbody");
            contents.innerHTML = "";
            list.data.forEach(data => {
                const row = document.createElement("tr");
                row.className = "line";

                const pos = document.createElement("td");
                pos.textContent = data.pos;
                const crewName = document.createElement("td");
                crewName.textContent = data.crewname;
                const title = document.createElement("td");
                title.textContent = data.title;
                const user = document.createElement("td");
                user.textContent = data.id;

                row.appendChild(pos);
                row.appendChild(crewName);
                row.appendChild(title);
                row.appendChild(user);

                row.addEventListener("click", () => {
                    const content = data.info;
                    const popup = window.open("popup_board.html", "_blank", "width=400, height=300");
                    popup.onload = function() {
                        const popupContent = popup.document.getElementById("popup_content");
                        popupContent.innerHTML = data.info;
                    };

                });
                contents.appendChild(row);
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

