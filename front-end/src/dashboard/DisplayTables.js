import React, { useEffect } from "react";
import { freeTable, listTables } from "../utils/api";

function DisplayTables({tables, setUpTable, upTable, setTables}){

    function occupied(value){
        if(value) return "occupied";
        return "free"
    }

    function finish (id){
        if(window.confirm("Is this table ready to seat new guests? This cannot be undone.")){
            freeTable(id);
            setUpTable(id);
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


    useEffect(reloadTable,[setTables, upTable]);

    function reloadTable(){
        listTables()
            .then(setTables)
    }


    return(
        <div>
            <h4>Tables</h4>
            <table style={{width: "100%"}}>
                    <tbody>
                    <tr>
                        <th>Table Name</th>
                        <th>Capacity</th>
                        <th>Occupied</th>
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