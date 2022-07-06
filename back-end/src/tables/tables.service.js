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

module.exports = {
    list,
    create,
    read,
    readTable,
    update,
}