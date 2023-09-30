import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function AdminLogin() {
    function adminlogin(event) {
        // alert("Hi this is admin login")
        // window.location.href ="/admindashboard"
        // var email = 
        event.preventDefault();
        var username = document.getElementById("userId").value;
        var password = document.getElementById("passId").value;
        var license = document.getElementById("licenseId").value;
        // var spanElement1 = document.getElementById("spanId1")
        // var spanElement2 = document.getElementById("spanId2")
        if(username === ""){
            // spanElement1.innerText = "*enter username"
            // spanElement1.className ="text-danger"
            alert("Enter username")
        }
        else if(password === ""){
            // spanElement2.innerText = "*enter password"
            // spanElement2.className ="text-danger"
            // spanElement1.innerText = ""
            alert("Enter password")

        }
        var adminloginDetails = {
            username : username,
            password : password,
            license : license
        }
        axios.post("http://localhost:2023/adminlogin",adminloginDetails)
        .then((response)=>{
            console.log(response.data.status, response.data.dbid, response.data.dbfname);
            let fname = response.data.dbfname;
            let lname = response.data.dblname;
            let id = response.data.dbid;
            console.log(lname);
            if(response.data.status === "error"){
                alert("Server error")
            }
            else if(response.data.status === "success"){
                alert("Hi "+fname+" "+lname +"  login successfully")
                window.location.href=`/admindashboard/${id}`
            }
            else if(response.data.status === "invalid"){
                alert("please enter valid password")
            }
            else if(response.data.status === "adminerror"){
                alert("User doesn't exist!")
            }
            else if(response.data.status === "invalidkey"){
                alert("Invalid license key!")
            }
        })
    }
    return (
        <>
            <form onSubmit={adminlogin}>
                <div className="container ">

                    <div className="d-flex mt-5 justify-content-center align-items-center">
                        <div className="card w-75 p-5 shadow-lg bg-light">
                            <h1 className="p-3 text-center">Admin Login</h1>
                            <h6>Email</h6>
                            <input type="text" id="userId" placeholder="example@gmail.com" /><span id="spanId1"></span>
                            <h6>Password</h6>
                            <input type="password" id="passId" placeholder="password" /><p>forget password?</p><span id="spanId2"></span>
                            <h6>License Key</h6>
                            <input type="password" id="licenseId" placeholder="password" />
                            <div className="">
                                <input type='submit' className="btn btn-primary w-50 m-3" value='Login' />
                                <p>Don't have an account? <Link to='/adminsignuppage' >SignUp here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}