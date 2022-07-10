const knex = require("../db/connection");

function list(){
    return knex("tables")
        .select("*")
        .orderBy("table_name", "asc")
}

function create(table){
    return knex("tables")
        .insert(table)
        .returning("*")
        .then(all => all[0])
}

function read(reservationId){
    return knex("reservations")
        .where({ "reservation_id": reservationId })
        .first();
}

function readTable(tableId){
    return knex("tables")
        .where({ "table_id": tableId })
        .first();
}

function update(table){
    return knex("tables")
        .select("*")
        .where("table_id", table.table_id)
        .update(table, "*");
}

function nextStatus(status){
    if(status === "booked"){
        return "seated";
    } 
    if(status === "seated"){
        return "finished";
    }
    return null;
}

function updateChange(table, reservation_id){
     return knex.transaction(trx => {
        return trx 
            .select("*")
            .from("tables")
            .where("table_id", table.table_id)
            .update(table, "*")
            .then((table) => {
                return trx
                    .select("*")
                    .from("reservations")
                    .where("reservation_id", reservation_id)
                    .then(reservation => {
                        return trx
                        .select("*")
                        .from("reservations")
                        .where("reservation_id", reservation_id)
                        .update({status: nextStatus(reservation[0].status)})
                        .returning("*")
                        .then(all => all[0])
                    })
            })
    })
    .catch(err => {
        return err;
    })
}

module.exports = {
    list,
    create,
    read,
    readTable,
    update,
    updateChange,
}