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
                    <tr key={reserve.reservation_id}>
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
                <div className="form-inline row mb-4">
                    <label className="col-3 col-form-label" htmlFor="mobile_number">Mobile Number</label>
                    <div className="col-9">
                        <input type="text" className="form-control" id="mobile_number" name="mobile_number" placeholder="Enter a customer's phone number" value={number} onChange={handleChange} required/>
                        <button type="submit" className="btn btn-primary btn-sm ml-sm-3">Find</button>
                    </div>
                </div>
            </form>
            <table className="table table-sm table-dark table-striped" style={{width: "100%"}}>
                <tbody>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Group</th>
                    <th>Status</th>
                    <th>Seat</th>
                    <th>Edit</th>
                    <th>Cancel</th>
                </tr>
                {displayfind(finds)}
                </tbody>
            </table>
            {noResultFound()}
        </div>
    )
}

export default Search;