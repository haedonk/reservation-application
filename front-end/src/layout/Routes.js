import React, { useState } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservation from "../NewReservation/NewReservation";
import NewTable from "../newTable/NewTable";
import SeatTable from "../seatTable/SeatTable";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [date, setDate] = useState(today());
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [makeChange, setMakeChange] = useState(0);

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <NewReservation setDate={setDate} reservationsError={reservationsError} setReservationsError={setReservationsError} date={date}/>
      </Route>
      <Route exact={true} path={"/reservations/:reservation_id/seat"} >
        <SeatTable tables={tables} reservationsError={reservationsError} setReservationsError={setReservationsError} setTables={setTables} setMakeChange={setMakeChange} makeChange={makeChange} />
      </Route>
      <Route exact={true} path="/reservations" >
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date} setDate={setDate} reservationsError={reservationsError} setReservationsError={setReservationsError} tables={tables} setTables={setTables} setMakeChange={setMakeChange} makeChange={makeChange} />
      </Route>
      <Route path="/tables/new">
        <NewTable setReservationsError={setReservationsError} reservationsError={reservationsError}/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
