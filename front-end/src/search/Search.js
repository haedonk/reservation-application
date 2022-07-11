import React, { useState } from "react";
import { searchNumber } from "../utils/api";
import Time from "../dashboard/Time";
import ReservationButtons from "../Reservation/ReservationButtons";

function Search(){

    const [number, setNumber] = useState("");
    const [finds, setFinds] = useState([]);
    const [search, setSearch] = useState(false);

    const handleChange = ({target}) => {
        setNumber(target.value);
    }   

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch(true);
        searchNumber(number)
            .then(setFinds);
    }

    function displayfind(finds){
        if(finds.length !== 0) {
            return finds.map((reserve, index) => {
                return (
                    <tr key={index}>
                        <td>{reserve.reservation_id}</td>
                        <td>{reserve.first_name} {finds.last_name}</td>
                        <td>{reserve.mobile_number}</td>
                        <td>{reserve.reservation_date}</td>
                        <td><Time time={reserve.reservation_time}/></td>
                        <td>{reserve.people}</td>
                        <td data-reservation-id-status={`${reserve.reservation_id}`} >{reserve.status}</td>
                        <ReservationButtons  id={reserve.reservation_id} status={reserve.status} />
                    </tr>
                )
            })
        }
    }

    function noResultFound(){
        if(finds.length === 0 && search) return "No reservations found";
    }


    return(
        <div>
            <h2>Search</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="mobile_number">Mobile Number</label>
                    <input type="text" className="form-control" id="mobile_number" name="mobile_number" placeholder="Enter a customer's phone number" value={number} onChange={handleChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Find</button>
            </form>
            <table style={{width: "100%"}}>
                <tbody>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Group</th>
                    <th>Status</th>
                </tr>
                {displayfind(finds)}
                </tbody>
            </table>
            {noResultFound()}
        </div>
    )
}

export default Search;