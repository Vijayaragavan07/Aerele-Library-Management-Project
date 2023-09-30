import React, { useEffect, useState } from "react";

export function Demo() {
    const [details, setDetails] = useState([])
    useEffect(() => {
        fetch("http://localhost:2023/userdetailsss")
            .then(data => data.json())
            .then((res) => {
                setDetails(res)
            })
    }, [])
    return (
        <>
            Hi
            {
                details.map((value, index) => (
                    <>
                        <h1>{value.member_id}</h1>

                    </>
                ))
            }
        </>
    );
}