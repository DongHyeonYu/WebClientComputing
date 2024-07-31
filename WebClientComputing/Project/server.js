const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const static = require("serve-static");
const dbconfig = require('./config/dbconfig.json');
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');




const pool = mysql.createPool({
    connectionLimit: 10,
    port: '3306',
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database,
    debug: false
});

const sessionStore = new MySQLStore({
    createDatabaseTable: true, 
}, pool);


const app = express();
const port = 5500;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5501',
    credentials: true
}));

//쿠키 
app.use(cookieParser());

// 로그인 세션 
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000
    },
    store: sessionStore,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", static(path.join(__dirname, "public")));

app.use('/getSession', (req, res, next) => {
    console.log("/getSession Called");
    const sessionData = req.session;
    if (sessionData.userID) {
        console.log("세션있음");
        console.log('userID: ' + sessionData.userID);
        // res.json(sessionData);
        res.redirect('/main');
    } else {
        console.log("세션없음");
        // res.redirect("http://localhost:5500/process/loginPage");
        res.sendStatus(403);
    };
})

app.post("/process/savePost", (req, res) => {
    const data = req.body
    if (!data.title || !data.content) {
        res.send("<script>alert('제목, 내용을 모두 입력하세요.');location.href='http://localhost:5501/WebClientComputing/Project/public/write.html'</script>");
        return;
    }
    const pos = data.pos;
    const title = data.title;
    const content = data.content;
    const userID = req.session.userID;
    if (!userID) {
        res.send("<script>alert('로그인이 필요합니다!');location.href='http;//localhost:5500/process/loginPage</script>");
        return;
    }

    pool.getConnection((err, conn) => {
        if (err) {
            console.log("MySQL연결오류");
            res.status(500).send("<script>alert('MySQL 연결 오류')</script>");
            return;
        }
        const exec = conn.query("INSERT INTO board1(pos, title, info, id) VALUES (?, ?, ?, ?)",
            [pos, title, content, userID],
            (err, result) => {
                conn.release();
                if (err) {
                    console.log("Query 에러!");
                    res.status(500).send("<script>alert('Query 에러!')</script");
                    return;
                }
                console.log("Query =>", exec.query);
                console.log("Res =>", result);
                res.status(200).send("<script>alert('게시글 저장 성공!');location.href='http://localhost:5501/WebClientComputing/Project/public/board1.html'</script>")
            })
    })
})

app.post("/process/saveRecruit", (req, res) => {
    const data = req.body
    if (!data.title || !data.content || !data.crewName) {
        res.send("<script>alert('제목, 내용, 크루명을 모두 입력하세요.');location.href='http://localhost:5501/WebClientComputing/Project/public/write.html'</script>");
        return;
    }
    const pos = data.pos;
    const crewName = data.crewName;
    const title = data.title;
    const content = data.content;
    const userID = req.session.userID;

    if (!userID) {
        res.send("<script>alert('로그인이 필요합니다!');location.href='http;//localhost:5500/process/loginPage</script>");
        return;
    }

    pool.getConnection((err, conn) => {
        if (err) {
            console.log("MySQL연결오류");
            res.status(500).send("<script>alert('MySQL 연결 오류')</script>");
            return;
        }
        const exec = conn.query("INSERT INTO board2(pos, crewname, title, info, id) VALUES (?, ?, ?, ?, ?)",
            [pos, crewName, title, content, userID],
            (err, result) => {
                conn.release();
                if (err) {
                    console.log("Query 에러!");
                    res.status(500).send("<script>alert('Query 에러!')</script");
                    return;
                }
                console.log("Query =>", exec.query);
                console.log("Res =>", result);
                res.status(200).send("<script>alert('게시글 저장 성공!');location.href='http://localhost:5501/WebClientComputing/Project/public/board2.html'</script>")
            })
    })
})




app.post('/process/saveCourseData', (req, res) => {
    const courseData = req.body;
    if (courseData.path.length < 2) {
        res.send("<script>alert('코스가 그려지지 않았습니다!');location.href='http://localhost:5501/WebClientComputing/Project/public/course2.html'</script>");
        return;
    }
    const path = JSON.stringify(courseData.path);
    const distance = courseData.distance;
    const time = courseData.time;
    const userID = req.session.userID;
    const title = courseData.title;
    const info = courseData.info;
    if (userID == ' ') {
        res.send('<script>alert("로그인 되지 않았습니다!");location.href="http://localhost:5501/WebClientComputing/Project/public/course2.html"</script>');
        return;
    }
    if (courseData.title == '') {
        res.send('<script>alert("제목이 입력되지 않았습니다!");location.href="http://localhost:5501/WebClientComputing/Project/public/course2.html"</script>');
        return;
    }
    if (courseData.info == '') {
        res.send('<script>alert("코스 정보가 입력되지 않았습니다!");location.href="http://localhost:5501/WebClientComputing/Project/public/course2.html"</script>');
        return;
    }

    console.log("path =>", path);
    console.log("distance =>", distance);
    console.log("time =>", time);
    console.log("UserID =>", userID);
    console.log("title =>", title);
    console.log("info =>", info);


    pool.getConnection((err, conn) => {
        if (err) {
            console.log("mySQL getConnection error:", err);
            res.status(500).send('<script>alert("서버 오류")</script>');
            return;
        }
        console.log("Successfully getConnection");
        const exec = conn.query("INSERT INTO course (path, distance, time, id, title, info) VALUES (?, ?, ?, ?, ?, ?)",
            [path, distance, time, userID, title, info],
            (err, result) => {
                conn.release();
                if (err) {
                    console.log("Error:", err);
                    res.status(500).send('<script>alert("SQL실행 오류")</script>');
                    return;
                }
                console.log("Run SQL: " + exec.sql);
                console.log("Result:", result);
                res.status(200).send("<script>alert('코스 등록 성공');location.href='http://localhost:5501/WebClientComputing/Project/public/course1.html'</script>");

            }
        );
    });
})


app.get("/getPost1", (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log("mySQL연결 오류", err);
            res.status(500).send('<script>alert("mySQL연결 오류!")</script>');
            return;
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const count = "SELECT COUNT(*) as count FROM board1";
        const query = `SELECT * FROM board1 LIMIT ${limit} OFFSET ${offset}`;
        conn.query(count, (err, countResult) => {
            if (err) throw err;
            console.log("3");

            const totalItems = countResult[0].count;
            const totalPages = Math.ceil(totalItems / limit);
            conn.query(query, (err, rows) => {
                conn.release();
                if (err) {
                    console.log("4");
                    res.status(500).send("<script>alert('MySQL Query Error!')</script>");
                    return;
                }
                console.log("5");

                res.json({
                    totalItems: totalItems,
                    totalPages: totalPages,
                    current: page,
                    data: rows
                })
            })
        })
    })
})


app.get("/getPost2", (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log("mySQL연결 오류", err);
            res.status(500).send('<script>alert("mySQL연결 오류!")</script>');
            return;
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const count = "SELECT COUNT(*) as count FROM board2";
        const query = `SELECT * FROM board2 LIMIT ${limit} OFFSET ${offset}`;
        conn.query(count, (err, countResult) => {
            if (err) throw err;
            console.log("3");

            const totalItems = countResult[0].count;
            const totalPages = Math.ceil(totalItems / limit);
            conn.query(query, (err, rows) => {
                conn.release();
                if (err) {
                    console.log("4");
                    res.status(500).send("<script>alert('MySQL Query Error!')</script>");
                    return;
                }
                console.log("5");

                res.json({
                    totalItems: totalItems,
                    totalPages: totalPages,
                    current: page,
                    data: rows
                })
            })
        })
    })
})


app.get('/getCourseData', (req, res) => {
    // console.log("/getCoruseData Called");
    pool.getConnection((err, conn) => {
        if (err) {
            console.log("mySQL연결 오류", err);
            res.status(500).send('<script>alert("mySQL연결 오류!")</script>');
            return;
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const offset = (page - 1) * limit;

        const count = "SELECT COUNT(*) as count FROM Course";
        const query = `SELECT * FROM Course LIMIT ${limit} OFFSET ${offset}`;
        conn.query(count, (err, countResult) => {

            if (err) throw err;
            const totalItems = countResult[0].count;
            const totalPages = Math.ceil(totalItems / limit);
            conn.query(query, (err, rows) => {
                conn.release();
                if (err) {
                    res.status(500).send("<script>alert('MySQL Query Error!')</script>");
                    return;
                }
                res.json({
                    totalItems: totalItems,
                    totalPages: totalPages,
                    current: page,
                    data: rows
                })
            })
        })
    })
})


app.get('/main', (req, res) => {
    res.redirect('http://localhost:5501/WebClientComputing/Project/public/main.html')
})

app.get('/', (req, res) => {
    res.redirect('/getSession')
});

app.get('/process/running', (req, res) => {
    res.redirect("http://localhost:5501/WebClientComputing/Project/public/running.html")
})

app.get('/process/adduser', (req, res) => {
    res.redirect('http://localhost:5501/WebClientComputing/Project/public/adduser.html');
});
app.get('/process/loginpage', (req, res) => {
    res.redirect('http://localhost:5501/WebClientComputing/Project/public/login.html')
})
app.get("/process/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.clearCookie('sessionID');
        res.redirect("/main");
    })
})

app.post('/process/login', (req, res) => {
    console.log("/process/login called");
    const id = req.body.input_ID;
    const pw = req.body.input_PW;

    if (req.session.userID) {
        res.redirect("setTimeout(function() {window.location.href = 'http://localhost:5501/WebClientComputing/Project/public/main.html'; }, 300)</>");
        return;
    }

    if (!id && !pw) {
        res.send("<script>alert('아무것도 입력되지 않았습니다.'); setTimeout(function() { window.location.href = 'http://localhost:5501/WebClientComputing/Project/public/login.html'; }, 300)</script>");
        return;
    }
    else if (!id) {
        res.send("<script>alert('ID를 입력해주세요.'); setTimeout(function() { window.location.href = 'http://localhost:5501/WebClientComputing/Project/public/login.html'; }, 300)</script>");
        return;
    }
    else if (!pw) {
        res.send("<script>alert('PW를 입력해주세요.'); setTimeout(function() { window.location.href = 'http://localhost:5501/WebClientComputing/Project/public/login.html'; }, 300)</script>");
        return;
    }

    console.log("Login Request : " + id + " / " + pw);
    pool.getConnection((err, conn) => {
        if (err) {
            console.log("mySQL getConnection error:", err);
            res.status(500).send('<h2>fail</h2>');
            return;
        }

        const exec = conn.query("SELECT `id`, `name` FROM user WHERE `id` = ? AND `pw` = SHA2(?, 256)",
            [id, pw],
            (err, rows) => {
                conn.release();
                console.log('SQL Query : ' + exec.sql);

                if (err) {
                    console.dir(err);
                    res.writeHead('200', { 'content-Type': 'text/html; charset=utf8' })
                    res.write('<h1>서버오류</h1>');
                    res.end()
                    return;
                }
                if (rows.length > 0) {
                    console.log("ID [%s] Login", id);
                    req.session.userID = id;
                    console.log(req.session)
                    res.cookie('sessionID', req.sessionID, { httpOnly: true });
                    res.redirect('/getSession');
                    return;
                }
                else {
                    console.log("ID [%s] Login Fail", id);
                    res.writeHead('200', { 'content-Type': 'text/html; charset=utf8' })
                    res.write('<script>alert("로그인 실패 ID와 PW를 확인하세요");setTimeout(function() { window.location.href = "http://localhost:5501/WebClientComputing/Project/public/login.html"},300)</script>');
                    res.end()
                    return;
                }
            }
        )
    });

});
app.post("/process/adduser", (req, res) => {
    console.log("/process/adduser called");

    //Essential
    const id = req.body.id;
    const pw = req.body.pw;
    const pw_check = req.body.pw_check;
    const name = req.body.name;
    const phone = req.body.phone;
    const address1 = req.body.join_address1;
    const address2 = req.body.join_address2;
    //Choice
    var height = req.body.height;
    var weight = req.body.weight;
    var age = req.body.age;
    if (height === '') height = 0;
    if (weight === '') weight = 0;
    if (age === '') age = 0;

    if (!id || !pw || !name || !pw_check || !address1 || !address2 || !phone) {
        res.send("<script>alert('필수 입력 사항을 입력하세요');location.href='http://localhost:5501/WebClientComputing/Project/public/adduser.html'</script>");
        return;
    }
    if (id.length < 6) {
        res.send("<script>alert('아이디는 6자 이상이어야합니다');location.href='http://localhost:5501/WebClientComputing/Project/public/adduser.html'</script>");
        return;
    }
    let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*]).{8,13}$/;
    if (!passwordPattern.test(pw)) {
        res.send("<script>alert('사용 불가능한 비밀번호!');location.href='http://localhost:5501/WebClientComputing/Project/public/adduser.html'</script>");
        return;
    }
    if (pw !== pw_check) {
        res.send("<script>alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');location.href='http://localhost:5501/WebClientComputing/Project/public/adduser.html'</script>");
        return;
    }
    if (name.length < 2) {
        res.send("<script>alert('잘못된 이름입니다.');location.href='http://localhost:5501/WebClientComputing/Project/public/adduser.html'</script>");
        return;
    }
    let phonePattern = /^\d{10,11}$/;
    if (!phonePattern.test(phone)) {
        res.send("<script> alert('전화번호는 숫자로만 구성되어야 하며, 10자 이상 11자 이하이어야 합니다.');location.href = 'http://localhost:5501/WebClientComputing/Project/public/adduser.html'</script > ");
        return;
    }
    if (address1 === '' || address2 === '') {
        res.send("<script> alert('주소를 모두 입력해주세요.');location.href = 'http://localhost:5501/WebClientComputing/Project/public/adduser.html'</script >");
        return;
    }
    const address = address1 + address2;

    console.log('Input id: ' + id + '\nInput pw: ' + pw + '\nInput name: ' + name)
    pool.getConnection((err, conn) => {
        if (err) {
            console.log("mySQL getConnection error:", err);
            res.status(500).send('<h1>서버오류</h1>');
            return;
        }

        console.log("Successfully getConnection");

        const exec = conn.query("INSERT INTO user (id, pw, name) VALUES (?, SHA2(?,256), ?)",
            [id, pw, name],
            (err, result) => {
                // conn.release();
                if (err) {
                    console.log("Error:", err);
                    res.status(500).send('<h2>fail</h2>');
                    return;
                }
                console.log("Run SQL: " + exec.sql);
                console.log("Result:", result);

                conn.query("INSERT INTO Essential (id, phone, address) VALUES (?, ?, ?)",
                    [id, phone, address],
                    (err, result) => {
                        conn.release();
                        if (err) {
                            console.log("Error: ", err);
                            res.status(500).send('<script>alert("회원 가입 실패");location.href="http://localhost:5501/WebClientComputing/Project/public/adduser.html"</script>');
                            return;
                        }
                        console.log("Result: ", result);
                    })
                conn.query("INSERT INTO Choice (id, height, weight, age) values(?, ?, ?, ?)",
                    [id, height, weight, age],
                    (err, result) => {
                        conn.release();
                        if (err) {
                            console.log("Error: ", err);
                            res.status(500).send("<script>alert('회원 가입 실패');location.href='http://localhost:5501/WebClientComputing/Project/public/adduser.html'</script>");
                        }
                        console.log("Successful Insert to choice Query", result);
                        res.status(200).send("<script>alert('회원 가입 성공');location.href='http://localhost:5501/WebClientComputing/Project/public/login.html'</script>");
                    })
            }
        );
    });
});
