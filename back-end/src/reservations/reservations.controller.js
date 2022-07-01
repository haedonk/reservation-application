/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");

async function list(req, res) {
  const {date} = req.query;
  const data = await service.list(date);
  res.json({data: data});
}

async function create(req, res){
  const data = await service.create(req.body)
  res.status(201).json({data: data});
}

module.exports = {
  list,
  create,
};
