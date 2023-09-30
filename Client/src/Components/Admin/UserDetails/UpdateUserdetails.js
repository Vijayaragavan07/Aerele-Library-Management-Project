import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export function UpdateUser() {
    var { member_id } = useParams()
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch("http://localhost:2023/getoneuser/" + member_id)
            .then(data => data.json())
            .then((res) => {
                setUsers(res[0])
            })
    },[])
    function handleUserUpdate(event) {
        event.preventDefault()
        var memberId = document.getElementById("memberId").value;
        var userName = document.getElementById("userId").value;
        var email = document.getElementById("emailId").value;
        var phoneNumber = document.getElementById("phoneId").value;
        var amount = document.getElementById("amountId").value;

        var updateUserDetails = {
            memberId: memberId,
            userName: userName,
            email: email,
            phoneNumber: phoneNumber,
            amount: amount
        }

        if (userName === "") {
            alert("Enter Username !")
        }
        else if (email === "") {
            alert("Enter Email !")
        }
        else if (phoneNumber === "") {
            alert("Enter Phonenumber !")
        }
        else if (amount === "") {
            alert("Enter Maximum amount !")
        }
        else {
            axios.post("http://localhost:2023/updateuserdetails/" + member_id, updateUserDetails)
                .then((res) => {
                    if (res.data.status === "success") {
                        alert("User updated successfully !")
                    }
                    else if (res.data.status === "error") {
                        alert("User not updated ! please enter valid data..!")
                    }
                    else {
                        alert("Internal server Error !")
                    }
                })
        }

    }
    function updateuser(event) {
        setUsers(event.target.value);
    }
    return (
        <>
        <div className="container">
            <form onSubmit={handleUserUpdate} onChange={updateuser}>
                <h1 className="text-center mt-2">Update user details</h1>
                <div className="d-flex mt-5 justify-content-center align-items-center">
                    <div className="card w-75 h-75 p-3">
                        <h3 className="p-1 m-2">MemberId</h3>
                        <input type="text" id="memberId" className="p-1 m-2" placeholder="Create memberId" value={users.member_id} />
                        <h3 className="p-1 m-2">Username</h3>
                        <input type="text" id="userId" className="p-1 m-2" placeholder="Create username" value={users.user_name} />
                        <h3 className="p-1 m-2">Email</h3>
                        <input type="text" id="emailId" className="p-1 m-2" placeholder="Enter user email" value={users.email} />
                        <h3 className="p-1 m-2">Phone Number</h3>
                        <input type="text" id="phoneId" className="p-1 m-2" placeholder="Enter user Phonenumber" value={users.phone_number} />
                        <h3 className="p-1 m-2">Outstanding dept</h3>
                        <input type="text" id="amountId" className="p-1 m-2" placeholder="Enter Maximum amount" value={users.amount} />
                        <input type="submit" className="btn btn-primary m-2 w-50" value='Update' />
            <Link to='/viewuserdetails'> <input type="button" className="btn btn-primary m-2" value='View users details' /></Link>
                    </div>
                </div>
            </form>
            </div>
        </>
    );
}