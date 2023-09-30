import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
export function ViewBookdetails() {
    // let { s_no } = useParams()
    const [details, setDetails] = useState([])
    const[sno,setSno]=useState([])
    useEffect(() => {
        fetch("http://localhost:2023/getbookdetails")
            .then(data => data.json())
            .then((res) => {
                setDetails(res)
                setSno(res[0].s_no)
            })
    }, [])

    function handledelete(book_id) {
        var deleteData = {
            book_id: book_id
        }
        axios.post("http://localhost:2023/deletebook", deleteData)
            .then((res) => {
                if (res.data.status === "error") {
                    alert("Book can't be deleted !")
                }
                else if (res.data.status === "success") {
                    alert("Book Successfully deleted !")
                    window.location.reload();
                }
            })
    }
    return (
        <>
            <div className="container mt-5">
                <div className="row g-3">
                    {
                        details.map((value, index) => (
                            <>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                    <div className="card h-100">
                                        <img className="h-50" src={value.book_image} alt="image" />
                                        <div className="card-body">
                                            <h3 className="card-title">Department : {value.department}</h3>
                                            <h5>{value.book_title}</h5>
                                            <p>{value.about_book}</p>
                                            Click here to <Link to='/'> Read more...</Link>
                                            <div className="card-footer mt-3">
                                                <Link to={`/update/${value.book_id}`}><input type="button" className="btn btn-success" value="Update" /></Link>
                                                <input type="button" className="btn btn-danger float-end" value="Delete" onClick={() => { handledelete(value.book_id) }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
                    <div className="pb-5">
                    <Link to={`/admindashboard/${sno}`}><h5 className="text-center">Click here to go back !</h5></Link>
                    </div>
            </div>
        </>
    );
}