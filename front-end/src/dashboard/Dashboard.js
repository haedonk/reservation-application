import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DisplayReservations from "./DisplayReservations";
import DisplayTables from "./DisplayTables";
import { useLocation } from "react-router-dom";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate, reservationsError, setReservationsError, tables, setTables }) {
  const [reservations, setReservations] = useState([]);


  const search = useLocation().search;
  const newDate = new URLSearchParams(search).get("date");


  useEffect(loadDashboard, [date, setReservationsError, setDate, newDate, setTables]);

  function loadDashboard() {
    const abortController = new AbortController();
    if(newDate){
      setDate(newDate);
    }
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setReservationsError);
    return () => abortController.abort();
  }



  return (
    <main>
      <h1>Dashboard</h1>
      <hr/>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <DisplayReservations reservations={reservations} date={date} setDate={setDate}/>
      <hr />
      <DisplayTables tables={tables} />
    </main>
  );
}

export default Dashboard;
