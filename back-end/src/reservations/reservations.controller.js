/**
 * List handler for reservation resources
 */

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const bodyDataHas = require("../utils/bodyDataHas");

const service = require("./reservations.service");

async function list(req, res) {
  let {date} = req.query;
  date = date ? date : new Date();
  const data = await service.list(date);
  res.json({data: data});
}

async function create(req, res){
  const data = await service.create(res.locals.reservation);
  res.status(201).json({data: data});
}


function validDate(req, res, next){
  const reservation_date = res.locals.reservation.reservation_date;
  const today = new Date();
  const theDate = new Date(reservation_date);
  if(theDate < today){
    return next({status: 400, message: `future`});
  } else if(new Date(reservation_date).getDay() === 1){
    return next({status: 400, message: `closed`});
  }
  const split = reservation_date.split("-");
  split.forEach(num => {
    if(!Number(num)){
      return next({status: 400, message: `reservation_date`});
    } 
  })
  next();
}

function validTime(req, res, next){
  const reservation_time = res.locals.reservation.reservation_time;
  const split = reservation_time.split(":");
  split.forEach(num => {
    if(!Number(num) && Number(num) != 0){
      return next({status: 400, message: `reservation_time`});
    }
  })
  next();
}


function validGroup(req, res, next){
  res.locals.reservation = req.body.data;
  const people = res.locals.reservation.people;
  if(people > 0 && Number.isInteger(people)){
      return next();
  }
  next({status: 400, message: `people`})
}

module.exports = {
  list,
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    validGroup,
    validDate,
    validTime,
    asyncErrorBoundary(create)
  ],
};
