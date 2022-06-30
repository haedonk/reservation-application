import React from "react";
import {formatAsTime} from "../utils/date-time";


function Time({time}){

    return (
        <>
        {formatAsTime(time)}
        </>
    )
}

export default Time;