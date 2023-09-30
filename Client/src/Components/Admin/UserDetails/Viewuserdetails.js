import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function Viewuserdetails() {
    const [users, setUsers] = useState([])
    const[sno,setSno]=useState([])
    useEffect(() => {
        fetch("http://localhost:2023/getallusers")
            .then(data => data.json())
            .then((res) => {
                setUsers(res)
                setSno(res[0].s_no)
            })
    }, [])

    function handledelete(member_id){
        var deleteuser={
            member_id :member_id
        }
        axios.post("http://localhost:2023/deleteuser",deleteuser)
        .then((res)=>{
            if(res.data.status === "success"){
                alert("User deleted successfully !")
                window.location.reload();
            }
            else if(res.data.status === "error"){
                alert("Internal server error !")
            }
        })
    }
    return (
        <>
            <div className="container mt-5">
                <div className="row g-3">
                    <h1 className="text-center"><span className="text-primary">Users</span> of this Library</h1>
                    {
                        users.map((value, index) => (
                            <>
                                <div className="col-lg-4">
                                    <div className="card text-center mt-5">
                                        <h3 className="bg-success text-white">MemberId : {value.member_id}</h3>
                                        <div className="card-body">
                                            <h6>Username : {value.user_name}</h6>
                                            <h6>Email : {value.email}</h6>
                                            <h6>Phone Number : {value.phone_number}</h6>
                                            <Link to={`/updateuser/${value.member_id}`}><input type="button" className="btn btn-primary float-start" value="Update" /></Link>
                                            <input type="button" className="btn btn-danger float-end" value="Delete" onClick={() => { handledelete(value.member_id) }}/>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
                <Link to={`/admindashboard/${sno}`}><h4 className="text-center border-5 text-white">Click here to go back</h4></Link>
            </div>
        </>
    );
}