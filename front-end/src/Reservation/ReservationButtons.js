import React from "react";
import {useHistory, Link} from "react-router-dom";
import {cancelReservation} from "../utils/api";


function ReservationButtons({id, status}){
    let history = useHistory();

    function displaySeatButton(id, status){
        if(status !== "booked") return <><td></td><td></td></>;
        return (
            <>
                <td>
                <Link to={`/reservations/${id}/seat`}>
                    <button type="button" className="btn btn-info btn-sm">Seat</button>
                </Link>
                </td>
                <td>
                    <Link to={`/reservations/${id}/edit`} >
                        <button type="button" className="btn btn-info btn-sm">Edit</button>
                    </Link> 
                </td>
            </>

        )
    }

    function displayCancelButton(id, status){
        if(status === "cancelled" || status === "finished") return null;
        return(
            <td> <button type="button" data-reservation-id-cancel={id} onClick={() => cancel(id)} className="btn btn-info btn-sm">Cancel</button> </td>
        )
    }

    function cancel(id){
        if(window.confirm("Do you want to cancel this reservation? This cannot be undone.")){
            cancelReservation(id)
                .then(() =>  history.go(0));
        }

    }

    return(
        <>
        {displaySeatButton(id, status)}
        {displayCancelButton(id, status)}
        </>
    )

}

export default ReservationButtons;