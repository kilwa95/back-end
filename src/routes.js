const express = require('express');
const router = express.Router();
router.use(express.json());
const {
  getCities,
  getForecastByCity,
} = require('./controller/weatherController');

router.get('/cities', getCities);
router.get('/weather/:city', getForecastByCity);

module.exports = router;
