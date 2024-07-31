document.addEventListener('DOMContentLoaded', function() {
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