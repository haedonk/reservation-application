/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");

async function list(req, res) {
  const {date} = req.query;
  console.log(date)
  const data = await service.list(date);
  res.json({data: data,});
}

module.exports = {
  list,
};
