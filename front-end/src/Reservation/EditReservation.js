import React, { useEffect, useState } from "react";
import { useHistory, useParams} from "react-router-dom";
import { editReservation, getReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import { dateValidation, timeValidation, phoneValidation, peopleValidation } from "../utils/formValidation";

function EditReservation({reservationsError, setReservationsError}){

    const {reservation_id} = useParams();

    const [reservation, setReservation] = useState(null);

    const histoy = useHistory();

    useEffect(() => {
        const abortController = new AbortController();

        getReservation(reservation_id, abortController.signal)
            .then(setReservation)

        return () => abortController.abort();
    }, [reservation_id]);


    const handleChange = ({target}) => {
        setReservation({
            ...reservation,
            [target.name]: target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        try{
            phoneValidation(reservation);
            dateValidation(reservation);
            timeValidation(reservation);
            peopleValidation(reservation);
            editReservation(reservation)
                .then(() => histoy.push(`/dashboard?date=${reservation.reservation_date}`))
        } catch (err){
            setReservationsError(err);
        }
      };



    if(reservation){
        return (
            <div>
                <h2>Edit Reservation</h2>
                <ReservationForm reservationsError={reservationsError} handleSubmit={handleSubmit} handleChange={handleChange} formData={reservation} />
            </div>
        );
    }

    return "loading...";

}

export default EditReservation;