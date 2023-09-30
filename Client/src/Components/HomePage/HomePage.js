import React from "react";
import { Link } from "react-router-dom";

export function HomePage() {
    return (
        <>
            <div className="container  mt-5">
                <div className="text-center">
                    <h1>Engineering College Library</h1>
                    <p>*<u className="text-danger">Note:</u> Here, all Department books are available.</p>
                </div>
                <div className="row g-5 mt-3">
                    <div className="col-lg-12">
                        <div className="card text-center h-100 bg-dark-subtle text-dark shadow-lg">
                            <h1 className="card-title m-5 p-5">Admin</h1>
                            <p>(*Authorized persons only allowed here)</p>
                            <div className="card-body pb-5">
                                <Link to='/adminlogin'><input type="button" className="btn btn-primary w-50 fs-5" value='Login' /></Link>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-lg-6">
                        <div className="card text-center h-100">
                            <h1 className="card-title m-5 p-5">Student</h1>
                            <div className="card-body pb-5">
                                <Link to='/login'><input type="button" className="btn btn-primary w-50" value='Login' /></Link>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}