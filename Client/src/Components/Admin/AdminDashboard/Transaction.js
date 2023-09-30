import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function Transaction() {
    const [details, setDetails] = useState([])
    useEffect(() => {
        fetch("http://localhost:2023/transaction")
            .then(data => data.json())
            .then((res) => {
                setDetails(res)
            })
    }, [])

    function issuebook(event) {
        event.preventDefault();
        var member = document.getElementById("memberId").value;
        var book = document.getElementById("bookId").value;
        var dueDate = document.getElementById("dueId").value;
        var dateElement = document.getElementById("dateId").value;

        var issueDetails = {
            member_id: member,
            book_id: book,
            dueDay: dueDate,
            dateElement: dateElement
        }
        if(member === ""){
            alert("Enter member Id !")
        }
        else if(book === ""){
            alert("Enter book Id !")
        }
        else if(dueDate === ""){
            alert("Enter due date !")
        }
        else if(dateElement === ""){
            alert("Enter Return date !")
        }

        axios.post("http://localhost:2023/issuebook", issueDetails)
            .then((res) => {
                if (res.data.status === "success") {
                    alert("Issued successfully !")
                    window.location.reload();
                }
                else if (res.data.status === "error") {
                    alert("Internal server error")
                    window.location.reload();
                }
                else if (res.data.status === "limit") {
                    alert("User has exceed his limit to buy a book !")
                }
            })
    }

    return (
        <>
            <div className="container m-2">
                <Link to={`/transactiondetails`}><input type="button" className="btn btn-primary float-end" value="Transaction Details" /></Link>
            </div>

            <div className="d-flex justify-content-center  ">
                <div className="card w-75 p-3 bg-light shadow-lg mt-5">
                    <form onSubmit={issuebook}>
                        <h1>Issue Book</h1>
                        <h3>MemberId</h3>
                        <input type="text" className="p-1 m-2 w-100" id="memberId" placeholder="Enter bookId" />
                        <h3>BookId</h3>
                        <input type="text" className="p-1 m-2 w-100" id="bookId" placeholder="Enter bookId" />
                        <h3>Due Day</h3>
                        <input type="input" className="p-1 m-2 w-100" id="dueId" placeholder="How many days" />
                        <h3>Issue date</h3>
                        <input type="date" className="p-1 m-2 w-100" id="dateId" placeholder="Enter bookId" /><br />
                        <input type="submit" className="btn btn-primary" value="Issue" />
                    </form>
                </div>
            </div>
        </>
    );
}


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export function Transaction() {

//     const [data, setData] = useState([]);
//     useEffect(() => {
//         fetch("http://localhost:2023/transaction")
//             .then((res) =>
//                 setData(res))
//     }, []);


//     return (
//         <>
//             <div
//                 className="d-flex bg-primary justify-content-center align-items-center"
//                 style={{ width: "100%" }}
//             >
//                 <div className=" bg-white rounded p-3">
//                     <h2 className="text-center" style={{ color: "#B22222" }}>
//                         Transaction List
//                     </h2>
//                     <table className="p-3 border-table">
//                         <thead>
//                             <tr>
//                                 <th>Transaction Id</th>
//                                 <th>Book Id</th>
//                                 <th>Member Id</th>
//                                 <th>Transaction Date</th>
//                                 <th>Due Date</th>
//                                 <th>Return Date</th>
//                                 <th>Fine Amount</th>
//                                 <th>Status</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>{data.book_id}</td>
//                             </tr>
//                             {
//                                 data.map((trans, index) => {
//                                     return (
//                                         <>
//                                             <tr key={index}>
//                                                 <td>{trans.transaction_id}</td>
//                                                 <td>{trans.book_id}</td>
//                                                 <td>{trans.member_id}</td>
//                                                 <td>{trans.transaction_date}</td>
//                                                 <td>{trans.due_date}</td>
//                                                 <td>{trans.return_date}</td>
//                                                 <td>{trans.fine_amount}</td>
//                                                 <td>{trans.status}</td>
//                                             </tr>
//                                         </>
//                                     );
//                                 })}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </>
//     );
// }

