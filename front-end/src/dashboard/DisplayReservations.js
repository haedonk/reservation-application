import React from "react";
import Time from "./Time";
import {next, previous, today} from "../utils/date-time";
import {useHistory, Link} from "react-router-dom";


function DisplayReservations({reservations, date, setDate}){
    let history = useHistory();

        return(
            <div>
                <table style={{width: "100%"}}>
                    <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Data</th>
                        <th>Time</th>
                        <th>Group</th>
                    </tr>
                    {reservations.map((reserve, index) => {
                        return(
                                <tr key={index}>
                                    <td>{reserve.reservation_id}</td>
                                    <td>{reserve.first_name} {reserve.last_name}</td>
                                    <td>{reserve.mobile_number}</td>
                                    <td>{reserve.reservation_date}</td>
                                    <td><Time time={reserve.reservation_time}/></td>
                                    <td>{reserve.people}</td>
                                    <td><Link to={`/reservations/${reserve.reservation_id}/seat`}><button type="button" className="btn btn-info">Seat</button></Link></td>
                                </tr>
                        )
                    })}
                    </tbody>
                </table>
                <div className="row justify-content-between mx-3 mt-2">
                <button type="button" onClick={()=>history.push(`/dashboard?newDate=${previous(date)}`)} className="btn btn-danger">Previous</button>
                <button type="button" onClick={()=>history.push(`/dashboard?newDate=${today()}`)} className="btn btn-secondary">Today</button>
                <button type="button" onClick={()=>history.push(`/dashboard?newDate=${next(date)}`)} className="btn btn-primary">Next</button>
                </div>
            </div>
        )
}

export default DisplayReservations;
