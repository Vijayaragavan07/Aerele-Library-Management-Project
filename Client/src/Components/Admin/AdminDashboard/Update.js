import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function Update() {
    var { book_id } = useParams()
    const [info, setInfo] = useState([])
    useEffect(() => {
        fetch("http://localhost:2023/getbooksforupdate/" + book_id)
            .then(data => data.json())
            .then((res) => {
                setInfo(res[0])
            })
    }, [])
    function handleupdate(event) {
        event.preventDefault();
        var department = document.getElementById("deptId").value;
        var title = document.getElementById("titleId").value;
        var about = document.getElementById("aboutId").value;
        var link = document.getElementById("linkId").value;
        var imageel = document.getElementById("imageId").value;

        var bookDetails = {
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
            axios.put("http://localhost:2023/update/" + book_id, bookDetails)
                .then((response) => {
                    if (response.data.status === "success") {
                        alert("Book updated successfully!")
                    }
                    else if (response.data.status === "error") {
                        alert("Book didn't get updated!")
                    }
                })

        }
    }
    function newdata(event) {
        setInfo(event.target.value);
    }
    return (
        <>
            <form onSubmit={handleupdate} onChange={newdata}>
                <h1 className="text-center">BOOKS</h1>
                <div className="d-flex mt-5 justify-content-center align-items-center">
                    <div className="card w-100 p-5">
                        <h3 className="p-1 m-2">Book Id</h3>
                        <input type="text" id="bookId" className="p-1 m-2" placeholder="Book Id" value={info.book_id} />
                        <h3 className="p-1 m-2">Department</h3>
                        <input type="text" id="deptId" className="p-1 m-2" placeholder="Department" value={info.department} />
                        <h3 className="p-1 m-2">Enter Book Title</h3>
                        <input type="text" id="titleId" className="p-1 m-2" placeholder="Book-title" value={info.book_title} />
                        <h3 className="p-1 m-2">Enter about book</h3>
                        <input type="text" id="aboutId" className="p-1 m-2" placeholder="Write about book" value={info.about_book} />
                        <h3 className="p-1 m-2">Book image URL</h3>
                        <input type="text" id="imageId" className="p-1 m-2" placeholder="image:url" value={info.book_image} />
                        <h3 className="p-1 m-2">Upload Link</h3>
                        <input type="text" id="linkId" className="p-1 m-2" placeholder="http://booklink" value={info.book_url} />
                        <input type="submit" className="btn btn-primary m-2 w-50" value='Upload' />
                        <Link to={`/viewbookdetails`}> <input type="button" className="btn btn-primary m-2" value='View book details' /></Link>
                    </div>
                </div>
            </form>
        </>
    );
}