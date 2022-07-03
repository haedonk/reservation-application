
import React, { useState } from "react";
import {Link} from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function NewTable({reservationsError, setReservationsError}){

    const initialFormState = {
        table_name: "",
        capacity: 0
    }

    const [formData, setFormData] = useState({...initialFormState});

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    }

    const tableValidation = (name) => {
        if(name.length < 2){
            throw new Error("Name must be of length 2 or more")
        }
    }

    const capValidation = (cap) => {
        console.log(Number(cap) > 1)
        if(Number(cap) < 1){
            throw new Error("Capactiy must be at least 1")
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try{
            tableValidation(formData.table_name);
            capValidation(formData.capacity);
            //api call
        } catch (err){
            setReservationsError(err)
        }
    }



    return(
        <div className="ml-3 mt-3">
            <ErrorAlert error={reservationsError} />
            <form onSubmit={handleSubmit}>
                <h2 className="mb-3">New Table</h2>
                <div className="row d-flex justify-content-start mb-2">
                    <div className="form-group col-4">
                        <label htmlFor="table_name">Table Name</label>
                        <input type="text" className="form-control" id="table_name" name="table_name" placeholder="name" onChange={handleChange} value={formData.table_name} required />
                    </div>
                    <div className="form_group col-4">
                        <label htmlFor="capacity">Capacity</label>
                        <input type="number" className="form-control" id="capacity" name="capacity" placeholder="E.g. 10" onChange={handleChange} value={formData.capacity} required />
                    </div>
                </div>
                <div className="row d-flex justify-content-around col-8">
                    <Link to={"/"}><button type="button" className="btn btn-secondary mr-2">Cancel</button></Link>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default NewTable;