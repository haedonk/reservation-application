import React from "react";

function DisplayTables({tables}){

    function occupied(value){
        if(value) return "occupied";
        return "free"
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
                                </tr>
                        )
                    })}
                    </tbody>
                </table>
        </div>
    )
}

export default DisplayTables;