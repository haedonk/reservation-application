import React from "react";
import { freeTable } from "../utils/api";

function DisplayTables({tables, setUpTable, upTable, setTables}){

    function occupied(value){
        if(value) return "occupied";
        return "free"
    }

    function finish (id){
        if(window.confirm("Is this table ready to seat new guests? This cannot be undone.")){
            freeTable(id)
                .then(() => setUpTable(upTable+1))
        }
    }

    function displayButton(id, occupied){ 
        if(occupied){
            return(
                <button type="button" 
                onClick={()=>finish(id)} 
                data-table-id-finish={id} 
                className="btn btn-info">Finish</button>
            )
        }
    }


    return(
        <div>
            <h4>Tables</h4>
            <table className="table table-sm table-dark table-striped" style={{width: "100%"}}>
                    <tbody>
                    <tr>
                        <th>Table Name</th>
                        <th>Capacity</th>
                        <th>Occupied</th>
                        <th>Finish</th>
                    </tr>
                    {tables.map((table, index) => {
                        return(
                                <tr key={index}>
                                    <td>{table.table_name}</td>
                                    <td>{table.capacity}</td>
                                    <td data-table-id-status={`${table.table_id}`}>{occupied(table.reservation_id)}</td>
                                    <td>{displayButton(table.table_id, table.reservation_id)}</td>
                                </tr>
                        )
                    })}
                    </tbody>
                </table>
        </div>
    )
}

export default DisplayTables;