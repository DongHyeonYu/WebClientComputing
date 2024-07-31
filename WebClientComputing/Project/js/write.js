function checkLoginStatus() {
    fetch('http://localhost:5500/getSession', {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                document.getElementById("button_logout").style.display = 'block';
                document.getElementById("kakaoMaps").style.display = "block";
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

function savePost() {
    const post = {
        pos: document.getElementById("pos").value,
        title: document.getElementById("write_title").value,
        content: document.getElementById("write_content").value,
    };

    fetch("http://localhost:5500/process/savePost", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
        credentials: 'include'
    })
        .then(res => res.text())
        .then(data => {
            document.write(data);
        })
        .catch(err => {
            console.log("저장실패 :", err);
        })
}

function saveRecruit() {
    const post = {
        pos: document.getElementById("pos").value,
        crewName: document.getElementById("crew_name").value,
        title: document.getElementById("write_title").value,
        content: document.getElementById("write_content").value,
    };

    fetch("http://localhost:5500/process/saveRecruit", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
        credentials: 'include'
    })
        .then(res => res.text())
        .then(data => {
            document.write(data);
        })
        .catch(err => {
            console.log("저장실패 :", err);
        })
}   