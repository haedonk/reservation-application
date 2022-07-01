import React, { useState } from "react";
import {Link, useHistory} from "react-router-dom";
import { addReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";



function NewReservation({reservationsError, setReservationsError}){
    let history = useHistory();


    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "08:00",
        people: ""
    };


    const [formData, setFormData] = useState({...initialFormState});

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
        formValidation(formData);
    };

    const formValidation = (formData) => {
        if(formData.date < today()){
            const err = new Error("Reservation date can not be a past date")
        } 
        console.log(today.getDay());
    }


    const handleSubmit = (event) => {
        event.preventDefault();
            addReservation(formData)
            .then(result => history.push(`/dashboard?newDate=${formData.reservation_date}`))
            .catch(setReservationsError);
      };


    return (
        <div>
            <ErrorAlert error={reservationsError} />
            <h2>New Reservation</h2>
            <form onSubmit={handleSubmit}>
                <div className="row p-2">
                <div className="form-group pr-2 col-4">
                    <label htmlFor="first_name">First Name</label>
                    <input type="text" className="form-control" id="first_name" name="first_name" placeholder="First Name" onChange={handleChange} value={formData.first_name} required/>
                </div>
                <div className="form-group pr-2 col-4">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" className="form-control" id="last_name" name="last_name" placeholder="Last Name" onChange={handleChange} value={formData.last_name} required/>
                </div>
                <div className="form-group col-4">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" className="form-control" id="phone" name="mobile_number" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={handleChange} value={formData.mobile_number} required/>
                    <div className="form-text" style={{ color: "gray" }}>Fomat: XXX-XXX-XXXX</div>
                </div>
                </div>
                <div className="row p-2">
                <div className="form-group pr-2 col-4">
                    <label htmlFor="reservation_date">Date</label>
                    <input type="date" className="form-control" id="reservation_date" name="reservation_date" onChange={handleChange} value={formData.reservation_date} required/>
                </div>
                <div className="form-group pr-2 col-4">
                    <label htmlFor="reservation_time">Time</label>
                    <input type="time" className="form-control" id="reservation_time" name="reservation_time" placeholder="8:00AM" onChange={handleChange} value={formData.reservation_time} required/>
                </div>
                <div className="form-group col-4">
                    <label htmlFor="group"># in group</label>
                    <input type="number" className="form-control" id="group" name="people" placeholder="E.g. 6" onChange={handleChange} value={formData.people} required/>
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