import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export function AdminDashboard() {
    let { id } = useParams()
    const [details, setDetails] = useState([]);
    useEffect(() => {
        fetch("http://localhost:2023/getoneadmin/" + id)
            .then(data => data.json())
            .then((result) => {
                setDetails(result[0].first_name)
            })
    })
    function handleupload(event) {
        event.preventDefault();
        var bookId = document.getElementById("bookId").value;
        var department = document.getElementById("deptId").value;
        var title = document.getElementById("titleId").value;
        var about = document.getElementById("aboutId").value;
        var link = document.getElementById("linkId").value;
        var imageel = document.getElementById("imageId").value;

        var bookDetails = {
            bookId:bookId,
            department: department,
            title: title,
            about: about,
            link: link,
            imageel: imageel
        }
        if (department === "") {
            alert("enter department")
        }
        else if (title === "") {
            alert("enter title")
        } else if (about === "") {
            alert("Enter about")
        }
        else if (link === "") {
            alert("Upload image")
        }
        else if (imageel === "") {
            alert("upload image")
        }
        else {
            axios.post("http://localhost:2023/uploadbooks/"+id, bookDetails)
                .then((res) => {
                    console.log(res)
                    if (res.data.status === "success") {
                        alert("Book uploaded successfully!")
                        window.location.reload();
                    }
                    else if (res.data.status === "error") {
                        alert("Book not inserted!")
                    }
                })
        }
    }
    function handleUserRegister(event) {
        event.preventDefault()
        var memberId = document.getElementById("memberId").value;
        var userName = document.getElementById("userId").value;
        var email = document.getElementById("emailId").value;
        var phoneNumber = document.getElementById("phoneId").value;
        var amount = document.getElementById("amountId").value;

        var userDetails={
            memberId:memberId,
            userName:userName,
            email:email,
            phoneNumber:phoneNumber,
            amount:amount
        }

        if(memberId ===""){
            alert("Enter Memberid !")
        }
        else if(userName === ""){
            alert("Enter Username !")
        }
        else if(email === ""){
            alert("Enter Email !")
        }
        else if(phoneNumber === ""){
            alert("Enter Phonenumber !")
        }
        else if(amount === ""){
            alert("Enter Maximum amount !")
        }
        else{
            axios.post("http://localhost:2023/registeruser/"+id,userDetails)
            .then((res)=>{
                if(res.data.status === "success"){
                    alert("User Registered successfully !")
                    window.location.reload();
                }
                else if(res.data.status === "error"){
                    alert("User not Inserted ! please enter valid data..!")
                }
                else{
                    alert("Internal server Error !")
                }
            })
        }

    }

    return (
        <>
        <div className="container text-white m-2">
            <Link to={`/`}><input type="button" className="btn btn-danger float-end" value="Log out"/></Link>
            <Link to={`/transaction`}><input type="button" className="btn btn-info float-end" value="Issue book"/></Link>
        </div>
            <div className="container">
                <div className="text-center text-primary">
                    <h1>Welcome {details} !</h1>
                    {/* <h1>Admin DashBoard</h1> */}
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <form onSubmit={handleupload}>
                            <h1 className="text-center text-white">BOOKS UPLOAD</h1>
                            <div className="d-flex mt-5 justify-content-center align-items-center">
                                <div className="card w-100 p-5 bg-dark-subtle">
                                    <h3 className="p-1 m-2">Book Id</h3>
                                    <input type="text" id="bookId" className="p-1 m-2" placeholder="Book Id"/>
                                    <h3 className="p-1 m-2">Department</h3>
                                    <input type="text" id="deptId" className="p-1 m-2" placeholder="Department" />
                                    <h3 className="p-1 m-2">Enter Book Title</h3>
                                    <input type="text" id="titleId" className="p-1 m-2" placeholder="Book-title" />
                                    <h3 className="p-1 m-2">Enter about book</h3>
                                    <input type="text" id="aboutId" className="p-1 m-2" placeholder="Write about book" />
                                    <h3 className="p-1 m-2">Book image URL</h3>
                                    <input type="text" id="imageId" className="p-1 m-2" placeholder="image:url" />
                                    <h3 className="p-1 m-2">Upload Link</h3>
                                    <input type="text" id="linkId" className="p-1 m-2" placeholder="http://booklink" />
                                    <input type="submit" className="btn btn-primary m-2 w-50" value='Upload' />
                                    <Link to={`/viewbookdetails`}> <input type="button" className="btn btn-primary m-2" value='View book details' /></Link>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-6">
                        <form onSubmit={handleUserRegister}>
                            <h1 className="text-center text-white text-shadow-lg">User Registration</h1>
                            <div className="d-flex mt-5 justify-content-center align-items-center">
                                <div className="card w-100 p-5 bg-dark-subtle">
                                    <h3 className="p-1 m-2">MemberId</h3>
                                    <input type="text" id="memberId" className="p-1 m-2" placeholder="Create memberId" />
                                    <h3 className="p-1 m-2">Username</h3>
                                    <input type="text" id="userId" className="p-1 m-2" placeholder="Create username" />
                                    <h3 className="p-1 m-2">Email</h3>
                                    <input type="text" id="emailId" className="p-1 m-2" placeholder="Enter user email" />
                                    <h3 className="p-1 m-2">Phone Number</h3>
                                    <input type="text" id="phoneId" className="p-1 m-2" placeholder="Enter user Phonenumber" />
                                    <h3 className="p-1 m-2">Outstanding dept</h3>
                                    <input type="text" id="amountId" className="p-1 m-2" placeholder="Enter Maximum amount" />
                                    <input type="submit" className="btn btn-primary m-2 w-50" value='Register' />
                                    <Link to='/viewuserdetails'> <input type="button" className="btn btn-primary m-2" value='View users details' /></Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    );
}