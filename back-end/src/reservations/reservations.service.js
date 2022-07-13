const knex = require("../db/connection");

function list(date){
    return knex("reservations")
        .select("*")
        .where("reservation_date", date)
        .whereNot("status", "finished")
        .orderBy("reservation_time", "asc")
}

function listNumbers(number){
    return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date")
}

function create(reservation){
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then(allReservations => allReservations[0])
}

function read(reservation_id){
    return knex("reservations")
        .select("*")
        .where("reservation_id", reservation_id)
        .first();
}

function update(reservation){
    return knex("reservations")
        .select("*")
        .where("reservation_id", reservation.reservation_id)
        .update(reservation, "*")
        .then(allReservations => allReservations[0])
}

module.exports = {
    list,
    listNumbers,
    create,
    read,
    update,
}