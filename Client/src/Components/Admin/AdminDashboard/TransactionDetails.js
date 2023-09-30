import React, { useEffect, useState } from "react";

export function Transactiondetails() {
    const [details, setDetails] = useState([])
    useEffect(() => {
        fetch("http://localhost:2023/gettransactiondetails")
            .then(data => data.json())
            .then((res) => {
                setDetails(res)
            })
    }, [])
    return (
        <>
        <div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <table className="border">
                    <thead className="border text-center">
                        <th>Transaction_Id</th>
                        <th>Book_Id</th>
                        <th>Member_Id</th>
                        <th>Due day</th>
                        <th>Issue date</th>
                    </thead>
                    <tbody className="border">
                        {
                            details.map((value, index) => (
                                <>

                                    <tr className="border">
                                        <td>{value.transaction_id}</td>
                                        <td>{value.book_id}</td>
                                        <td>{value.member_id}</td>
                                        <td>{value.due_day}</td>
                                        <td>{value.issue_date}</td>
                                    </tr>

                                </>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            </div>
        </>
    );
}