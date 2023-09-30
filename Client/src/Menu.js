import React from "react";
import { Link } from "react-router-dom";

export function Menu() {
    return (
        <>
            <div className="">
                <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <ul>
                    <button className="rounded border-0 bg-primary "><Link to='/' className="text-decoration-none text-white">SignUp</Link></button>
                </ul>
                <ul>
                    <button className="rounded border-0 bg-primary"><Link to='/login' className="text-decoration-none text-white">Login</Link></button>
                </ul>
                <ul>
                    <button className="rounded border-0 bg-primary"><Link to='/dashboard' className="text-decoration-none text-white">dashboard</Link></button>
                </ul>
                <ul>
                    <button className="rounded border-0 bg-primary"><Link to='/IstSem' className="text-decoration-none text-white">Istsem</Link></button>
                </ul>
                {/* <select>
                    <option><Link to='/Istsem'>IstSem</Link></option>
                    <option><Link to='/IIndsem'>IIndSem</Link></option>
                    <option><Link to='/IIIrdsem'>IIndSem</Link></option>
                </select> */}
                </nav>
            </div>
        </>
    );
}