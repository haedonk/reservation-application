import React, { useState } from "react";
import {Link, useHistory} from "react-router-dom";
import { addReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";



function NewReservation({reservationsError, setReservationsError}){
    let history = useHistory();


    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: ""
    };


    const [formData, setFormData] = useState({...initialFormState});

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        //add to api
        addReservation(formData)
            .then(result => history.push(`/reservations?date=${formData.reservation_date}`))
            .catch(setReservationsError)
      };


    return (
        <div>
            <ErrorAlert error={reservationsError} />
            <h2>New Reservation</h2>
            <form onSubmit={handleSubmit}>
                <div className="row p-2">
                <div className="form-group pr-2 col-4">
                    <label htmlFor="first_name">First Name</label>
                    <input type="text" className="form-control" id="first_name" name="first_name" placeholder="First Name" onChange={handleChange} value={formData.first_name}/>
                </div>
                <div className="form-group pr-2 col-4">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" className="form-control" id="last_name" name="last_name" placeholder="Last Name" onChange={handleChange} value={formData.last_name}/>
                </div>
                <div className="form-group col-4">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" className="form-control" id="phone" name="mobile_number" placeholder="123-456-7890" onChange={handleChange} value={formData.mobile_number}/>
                </div>
                </div>
                <div className="row p-2">
                <div className="form-group pr-2 col-4">
                    <label htmlFor="reservation_date">reservation_date</label>
                    <input type="date" className="form-control" id="reservation_date" name="reservation_date" onChange={handleChange} value={formData.reservation_date}/>
                </div>
                <div className="form-group pr-2 col-4">
                    <label htmlFor="reservation_time">reservation_time</label>
                    <input type="time" className="form-control" id="reservation_time" name="reservation_time" onChange={handleChange} value={formData.reservation_time}/>
                </div>
                <div className="form-group col-4">
                    <label htmlFor="group"># in group</label>
                    <input type="number" className="form-control" id="group" name="people" placeholder="E.g. 6" onChange={handleChange} value={formData.people}/>
                </div>
                </div>
                <div className="row justify-content-around">
                    <Link to={"/"}><button type="button" className="btn btn-secondary mr-2">Cancel</button></Link>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}


export default NewReservation;