import React, { useEffect, useState } from "react";

function Clock() {
    const [clockState, setClockState] = useState();

    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            setClockState(date.toLocaleTimeString());
        }, 1000);
    }, []);


    return (
        <div className=' font-bold place-content-center  px-3 m-4  bg-white shadow-lg rounded-lg ' >
            User:
            <br />
            <div>Time: {clockState}</div>
        </div>
    )
}

export default Clock;