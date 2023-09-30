//const variable = require("package_name")
const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")
const mysql = require("mysql")
const crypto = require("crypto")

var storeEx = express()
storeEx.use(cors())
storeEx.use(bodyparser.json())
storeEx.use(express.json()) // connection between function and express package
storeEx.use(bodyparser.urlencoded({ extended: true }))//encrypt and decrypt process 
storeEx.use(express.static('public')) // react public folder

// create connection between back end and database
let localdb = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Newsreader@07",
    database: "myproject"

})
localdb.connect((error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("db connected !");
    }
})

storeEx.get('/getAll', (request, response) => {
    let selectquery = 'select * from user_details'
    localdb.query(selectquery, (error, result) => {
        // (error)?(response.send(error)):(response.send(result))
        if (error) {

            console.log(error);
        }
        else {
            response.send(result)
        }
    })
})
// var s_no = crypto.randomUUID();
// console.log(s_no);
// var datetime = new Date();
// var createdDate = datetime.toISOString().slice(0,10)
// console.log(createdDate);
storeEx.post('/register', (request, response) => {
    var sno = crypto.randomUUID();
    var datetime = new Date();
    var createdDate = datetime.toISOString().slice(0, 10)
    console.log(createdDate);
    let { firstName, lastName, dateOfBirth, age, email, password, phoneNumber, collegeName, department, location } = request.body;
    let insertQuery = `insert into students_corner(s_no, first_name, last_name, date_of_birth, age, email, password, phone_number, college_name, department, location, created_date, updated_date, created_by, updated_by) 
    values('${sno}',?,?,?,?,?,?,?,?,?,?,'${createdDate}','${createdDate}','${sno}','${sno}')`;
    localdb.query(insertQuery, [firstName, lastName, dateOfBirth, age, email, password, phoneNumber, collegeName, department, location], (error, result) => {

        if (error) {
            response.send({ "status": "error" });
            console.log(error);
        }
        else {
            response.send({ "status": "success", "dbId": sno })
            console.log(sno);
        }
    })
})

storeEx.post("/login", (request, response) => {
    let { email, password } = request.body;
    let selectquery = `select * from students_corner where email=?`
    localdb.query(selectquery, [email], (error, result) => {
        if (error) {
            response.send({ "status": "error" })
        }
        else if (result.length > 0) {
            let dbemail = result[0].email
            let dbpassword = result[0].password
            let dbid = result[0].s_no
            let dbdept = result[0].department
            if ((dbemail === email) && (dbpassword === password)) {
                response.send({ "status": "success", "dbid": dbid, "dbdept": dbdept })
            }
            else {
                response.send({ "status": "invalid" })
            }
        }
        else {
            response.send({ "status": "admin_error" })
        }
    })
})

storeEx.get("/getone/:id", (request, response) => {
    var { id } = request.params
    var getquery = `select * from students_corner where s_no='${id}'`
    localdb.query(getquery, (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send(result)
        }
    })
})

storeEx.get("/getoneadmin/:id", (request, response) => {
    var { id } = request.params
    var getquery = `select * from admin where s_no='${id}'`
    localdb.query(getquery, (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send(result)
        }
    })
})

storeEx.post("/adminRegister", (request, response) => {
    let sno = crypto.randomUUID();
    let datetime = new Date();
    var createdDate = datetime.toISOString().slice(0, 10);
    var key = "AuB00kP@$tDs";
    let { firstName, lastName, dob, age, email, password, phoneNumber, license } = request.body;
    if (license === key) {
        let insertQuery = `insert into admin(s_no, first_name, last_name, date_of_birth, age, email, password, phone_number, license_key, created_by, updated_by, created_date, updated_date) 
    values('${sno}',?,?,?,?,?,?,?,?,'${sno}','${sno}','${createdDate}','${createdDate}')`;
        localdb.query(insertQuery, [firstName, lastName, dob, age, email, password, phoneNumber, license], (error, result) => {
            if (error) {
                response.send({ "status": "error" })
            }
            else {
                response.send({ "status": "success", "dbId": sno })
            }
        })
    }
    else {
        response.send({ "status": "mismatchkey" })
    }
})

storeEx.post("/adminlogin", (request, response) => {
    let { username, password, license } = request.body;
    console.log(username, password);
    let loginQuery = `select * from admin where email=?`
    localdb.query(loginQuery, [username], (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else if (result.length > 0) {
            let dbemail = result[0].email;
            let dbpassword = result[0].password;
            let dbid = result[0].s_no;
            let dbfname = result[0].first_name;
            let dblname = result[0].last_name;
            let dblicense = result[0].license_key;
            if (dblicense === license) {
                if ((dbemail === username) && (dbpassword === password)) {
                    response.send({ "status": "success", "dbid": dbid, "dbfname": dbfname, "dblname": dblname })
                }
                else {
                    response.send({ "status": "invalid" })
                }
            }
            else {
                response.send({ "status": "invalidkey" })
            }
        }
        else {
            response.send({ "status": "adminerror" })
        }
    })
})

storeEx.get("/getbooks/:id", (request, response) => {
    var { id } = request.params;
    var getquery = `select * from book_table where s_no=${id}`
    localdb.query(getquery, (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send(result)
            console.log(result);
        }
    })
})

storeEx.get("/getbooksforupdate/:book_id", (request, response) => {
    var { book_id } = request.params;
    var getquery = `select * from book_table where book_id='${book_id}'`
    console.log(getquery);
    localdb.query(getquery, (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send(result)
            console.log(result);
        }
    })
})

storeEx.post("/uploadbooks/:id", (request, response) => {
    let { id } = request.params
    let { bookId, department, title, about, link, imageel } = request.body
    // let sno = crypto.randomUUID();
    console.log(id);
    let datetime = new Date();
    console.log(datetime);
    let createdDate = datetime.toISOString().slice(0, 10);
    // let selectquery = `select s_no from admin where s_no =${id}`
    let insertQuery = `insert into book_table (s_no,book_id, department, book_title, about_book, book_url, book_image, created_by, updated_by, created_date, updated_date) 
    values ('${id}',?,?,?,?,?,?,'${id}','${id}','${createdDate}','${createdDate}')`
    localdb.query(insertQuery, [bookId, department, title, about, link, imageel], (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send({ "status": "success" })
            console.log(result);
        }
    })


})
storeEx.put("/update/:book_id", (request, response) => {
    let { book_id } = request.params
    let { department, title, about, link, imageel } = request.body
    console.log(department);
    console.log(book_id);
    let datetime = new Date();
    console.log(datetime);
    let createdDate = datetime.toISOString().slice(0, 10);
    let updateQuery = `update book_table set department = '${department}', book_title='${title}', about_book='${about}', book_url='${link}', book_image='${imageel}', updated_date='${createdDate}' where book_id = '${book_id}'`
    localdb.query(updateQuery, (error, result) => {
        console.log(updateQuery);
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send({ "status": "success" })
            console.log(result);
        }
    })


})

storeEx.post("/registeruser/:id", (request, response) => {
    let { id } = request.params
    console.log(id);
    let { memberId, userName, email, phoneNumber, amount } = request.body
    let datetime = new Date();
    console.log(datetime);
    let createdDate = datetime.toISOString().slice(0, 10);
    let insertQuery = `insert into user_details (s_no,member_id,user_name,email,phone_number,amount,created_by,updated_by,created_date,updated_date)
     values('${id}',?,?,?,?,?,'${id}','${id}','${createdDate}','${createdDate}')`
    localdb.query(insertQuery, [memberId, userName, email, phoneNumber, amount], (error, result) => {
        console.log(insertQuery);
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send({ "status": "success" })
            console.log(result);
        }
    })
})

storeEx.get("/getbookdetails", (request, response) => {
    // var { s_no } = request.params
    var selectquery = `select * from book_table`
    localdb.query(selectquery, (error, result) => {
        console.log(selectquery);
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send(result)
            console.log(result);
        }
    })
})

storeEx.post("/deletebook", (request, response) => {
    var { book_id } = request.body
    var deleteQuery = `delete from book_table where book_id = '${book_id}'`;
    localdb.query(deleteQuery, (error, result) => {
        console.log(deleteQuery);
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send({ "status": "success" })
            console.log(result);
        }
    })
})

storeEx.get("/getallusers", (request, response) => {
    var selectquery = `select * from user_details`
    localdb.query(selectquery, (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send(result)
            console.log(result);
        }
    })
})

storeEx.post("/deleteuser", (request, response) => {
    let { member_id } = request.body
    let deleteQuery = `delete from user_details where member_id = ${member_id}`
    localdb.query(deleteQuery, (error, result) => {
        if (error) {
            response.send({ "status": "error" })
        }
        else {
            response.send({ "status": "success" })
        }
    })
})

storeEx.get("/gettransaction", (request, response) => {
    let selectquery = `select b.book_id,b.book_title,u.member_id,u.user_name,u.email,u.phone_number,u.amount from book_table as b,user_details as u where `
    localdb.query(selectquery, (error, result) => {
        console.log(selectquery);
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send(result)
            console.log(result);
        }
    })
})

storeEx.get("/getoneuser/:member_id", (request, response) => {
    var { member_id } = request.params
    var selectquery = `select * from user_details where member_id=${member_id}`
    localdb.query(selectquery, (error, result) => {
        console.log(selectquery);
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send(result)
            console.log(result);
        }
    })
})

storeEx.post("/updateuserdetails/:member_id", (request, response) => {
    var { member_id } = request.params
    var { userName, email, phoneNumber, amount } = request.body
    let datetime = new Date();
    console.log(datetime);
    let createdDate = datetime.toISOString().slice(0, 10);
    var updateQuery = `update user_details set user_name ='${userName}',email='${email}',phone_number='${phoneNumber}',amount ='${amount}',updated_date='${createdDate}' where member_id='${member_id}'`
    localdb.query(updateQuery, (error, result) => {
        console.log(updateQuery);
        if (error) {
            response.send({ "status": "error" })
            console.log(error);
        }
        else {
            response.send({ "status": "success" })
        }
    })
})

storeEx.get("/gettransactiondetails", (request, response) => {
    let userCount = `select * from transactions`
    console.log(userCount);
    localdb.query(userCount, (error, result) => {
        if (error) {
            response.send({ "status": "error" });
            console.log(error);
        } else {
            response.send(result);
            console.log(result);
        }
    });

});

storeEx.post('/issuebook', (request, response) => {
    let { member_id, book_id, dueDay, dateElement } = request.body
    let bookPrice
    var outDebt
    var memId
    var totalPrice


    let priceSql = 'select fees_perday from book_table where book_id = ?'
    localdb.query(priceSql, [book_id], (error, result) => {
        if (error) {
            response.send({ "status": "error" })
            console.log(error)
        }
        else {
            bookPrice = result[0].fees_perday
            totalPrice = bookPrice * dueDay
            // console.log(bookPrice);
        }
    })

    let debtSql = 'select out_dept, member_id from transactions where member_id = ?'
    localdb.query(debtSql, [member_id], (error, result) => {

        console.log('Entering debtSql');
        if (error) {
            response.send({ "status": "error" })
            console.log(error)
        } else {
            console.log('Entering else');
            console.log(result);
            if (result.length == 0) {
                console.log('Entering if');
                let sql = 'insert into transactions(book_id,member_id,issue_date,due_day,out_dept) values(?,?,?,?,?)'
                localdb.query(sql, [book_id, member_id, dateElement, dueDay, totalPrice], (error, result) => {
                    if (error) {
                        response.send({ "status": "error" })
                        console.log(error)
                    }
                    else {
                        response.send({ "status": "success" })
                    }
                })
            } else {

                console.log(result);
                outDebt = result[0].out_dept
                console.log(outDebt);
                console.log(totalPrice);

                var totalDebt = outDebt + totalPrice

                console.log(totalDebt);
                if (totalDebt > 500) {
                    console.log('limit reached');
                    response.send({ "status": "limit" })
                } else if (totalDebt > 0 && totalDebt < 500) {
                    console.log('last else if');

                    let updateSql = 'update transactions set out_dept = ? where member_id = ?'
                    console.log(updateSql);
                    localdb.query(updateSql, [totalDebt, member_id], (error, result) => {
                        if (error) {
                            response.send({ "status": "error" })
                            console.log(error)
                        }
                        else {

                            response.send({ "status": "success" })
                        }
                    })
                }
            }
        }
    })
})
storeEx.listen(2023, () => {
    console.log("Your port is running in 2023!");
})