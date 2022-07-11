import React from "react";
import {formatAsTime} from "../utils/date-time";


function Time({time}){

    if(!time) return null;
    return (
        <>
        {formatAsTime(time)}
        </>
    )
}

export default Time;