import React, { useEffect, useState } from "react";

export function Clock() {
    const [clockState, setClockState] = useState();
    console.log(new Date().toLocaleTimeString().slice(0, 5))
    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            setClockState(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);
    }, []);

    return (
        <div className=' font-bold text-center text-[#3D5552] p-3 m-4 bg-white shadow-lg rounded  ' >
            Hora: {clockState}
        </div>
    )
}