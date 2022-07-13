import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import { dateValidation, timeValidation, phoneValidation, peopleValidation } from "../utils/formValidation";



function NewReservation({reservationsError, setReservationsError}){
    let history = useHistory();


    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "08:00",
        people: 0
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
        setReservationsError(null);
        try{
            console.log(formData.reservation_date)
            phoneValidation(formData);
            dateValidation(formData);
            timeValidation(formData);
            peopleValidation(formData);
            createReservation(formData)
                .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
        } catch (err){
            setReservationsError(err);
        }
      };


    return (
        <div>
            <h2>New Reservation</h2>
            <ReservationForm reservationsError={reservationsError} handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} />
        </div>
    );
}


export default NewReservation;