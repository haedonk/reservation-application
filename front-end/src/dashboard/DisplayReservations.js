import React from "react";
import Time from "./Time";
import {next, previous, today} from "../utils/date-time";
import {useHistory} from "react-router-dom";
import ReservationButtons from "../Reservation/ReservationButtons";


function DisplayReservations({reservations, date}){
    let history = useHistory();



    return(
        <div>
            <table className="table table-sm table-dark table-striped" style={{width: "100%", emptyCells: "show"}}>
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Data</th>
                    <th>Time</th>
                    <th>Group</th>
                    <th>Status</th>
                    <th>Seat</th>
                    <th>Edit</th>
                    <th>Cancel</th>
                </tr>
                {reservations.map((reserve, index) => {
                    if(reserve.status === "finished") return null;
                    return(
                            <tr key={index}>
                                <td>{reserve.first_name} {reserve.last_name}</td>
                                <td>{reserve.mobile_number}</td>
                                <td>{reserve.reservation_date}</td>
                                <td><Time time={reserve.reservation_time}/></td>
                                <td>{reserve.people}</td>
                                <td data-reservation-id-status={`${reserve.reservation_id}`} >{reserve.status}</td>
                                <ReservationButtons  id={reserve.reservation_id} status={reserve.status} />
                            </tr>
                    )
                })}
                </tbody>
            </table>
            <div className="row justify-content-between mx-3 mt-2">
            <button type="button" onClick={()=>history.push(`/dashboard?date=${previous(date)}`)} className="btn btn-danger">Previous</button>
            <button type="button" onClick={()=>history.push(`/dashboard?date=${today()}`)} className="btn btn-secondary">Today</button>
            <button type="button" onClick={()=>history.push(`/dashboard?date=${next(date)}`)} className="btn btn-primary">Next</button>
            </div>
        </div>
    )
}

export default DisplayReservations;
