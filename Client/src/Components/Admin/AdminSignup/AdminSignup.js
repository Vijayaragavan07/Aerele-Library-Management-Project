import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export function AdminSignup() {
    function adminsignup(event){
        event.preventDefault();
        var firstName = document.getElementById("fnameId").value;
        var lastName = document.getElementById("lnameId").value;
        var dob = document.getElementById("dobId").value;
        var age = document.getElementById("ageId").value;
        var email = document.getElementById("emailId").value;
        var password = document.getElementById("passId").value;
        var phoneNumber = document.getElementById("phoneId").value;
        var license = document.getElementById("licenseId").value;

        var adminRegister ={
            firstName:firstName,
            lastName:lastName,
            dob:dob,
            age:age,
            email:email,
            password:password,
            phoneNumber:phoneNumber,
            license:license
        }

        axios.post("http://localhost:2023/adminRegister",adminRegister)
        .then((res)=>{
            let id = res.data.dbId;
            if(res.data.status==="error"){
                alert("Please enter all the fields !")
            }
            else if(res.data.status==="success"){
                alert("Admin login successfully")
                window.location.href =`/admindashboard/${id}`
            }
            else if(res.data.status === "mismatchkey"){
                alert("Your license key is mismatch")
            }
        })
    }

    return (
        <>
            <div className="signup-background">
                <div className="card-background card mt-5 shadow-lg d-flex justify-content-center container p-2">
                    {/* <img src={nature}/> */}
                    <form onSubmit={adminsignup}>
                        <h1 className="text-success text-center">Admin SignUpForm</h1>
                        <table className="mt-5">
                            <tr>
                                <th>First Name</th>
                                <td><input className="w-100" id="fnameId" type="text" /></td>
                            </tr>
                            <tr>
                                <th>Last Name</th>
                                <td><input className="w-100" id="lnameId" type="text" /></td>
                            </tr>
                            <tr>
                                <th>Date of Birth</th>
                                <td><input className="w-100" id="dobId" type="date" /></td>
                            </tr>
                            <tr>
                                <th>Age</th>
                                <td><input className="w-100" id="ageId" type="text" /></td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td><input className="w-100" id="emailId" type="email" /></td>
                            </tr>
                            <tr>
                                <th>Password</th>
                                <td><input className="w-100" id="passId" type="password" /></td>
                            </tr>
                            <tr>
                                <th>Phone Number</th>
                                <td><input className="w-100" id="phoneId" type="text" /></td>
                            </tr>
                            <tr>
                                <th>License Key</th>
                                <td><input type='text' className="w-100" id="licenseId" /></td>
                            </tr>
                        </table>
                        <div className="text-center m-3">
                            <input type="submit" className="w-100 bg-primary border-0 text-white rounded m-3" value="SignUp" />
                            <p>Already have an account?<Link to='/adminlogin'>Login here</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}