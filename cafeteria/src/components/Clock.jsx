import React, { useEffect, useState } from "react";

export function Clock() {
    const [clockState, setClockState] = useState();

    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            setClockState(date.toLocaleTimeString());
        }, 1000);
    }, []);

    return (
        <div className=' font-bold text-center p-3 m-4 bg-white shadow-lg rounded-lg mr-10 ' >
            Hora: {clockState}
        </div>
    )
}