import React from "react";

function DisplayTables({tables}){



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
                                </tr>
                        )
                    })}
                    </tbody>
                </table>
        </div>
    )
}

export default DisplayTables;