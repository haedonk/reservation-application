import React, { useState, useEffect } from "react";
import { useHistory, useParams} from "react-router-dom";
import { seatReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import {listTables} from "../utils/api";

function SeatTable({tables, reservationsError, setReservationsError, setTables}){
    const history = useHistory();

    const {reservation_id} = useParams();

    const initialFormState = {
        table_id: 0,
        reservation_id: 0,
    }

    useEffect(() => {
        const abortController = new AbortController();
        if(tables.length === 0){
            listTables(abortController.signal)
              .then(setTables)
              .catch(setReservationsError);
            return () => abortController.abort();
        }
    }, [tables, setReservationsError, setTables])


    const [tableData, setTableData] = useState({...initialFormState});

    const handleChange = ({target}) => {
        setTableData({
            table_id: target.value,
            reservation_id: reservation_id,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //test cap
        seatReservation(tableData)
            .then(() => history.push("/"))
            .catch(err => setReservationsError(err))
    }


    

    return (
        <div>
            <ErrorAlert error={reservationsError} />
            <h2>Table Seclection</h2>
            <form onSubmit={handleSubmit}>
                <select name="table_id" size="10" className="form-select" multiple aria-label="multiple select example" onChange={handleChange}>
                    <option value="DEFAULT" disabled>Select a table</option>
                    {tables.map(table => {
                        if(!table.occupied){
                            return(
                                <option key={table.table_id} value={table.table_id}>{table.table_name} - {table.capacity}</option>
                            )
                        }
                        return null;
                    })}
                </select>
                <div>
                    <button type="button" onClick={() => history.goBack()} className="btn btn-secondary mr-2">Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default SeatTable;