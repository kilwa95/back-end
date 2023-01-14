const db = require('../database');
const axios = require('axios');

exports.findAllCities = async () => {
  try {
    return await db.all('select * from city');
  } catch (error) {
    console.error(error);
  }
};

exports.findForecastByCity = async (city) => {
  try {
    const forecast = await db.get(
      `select * from forecast where insee = '${city}'`
    );
    if (forecast) {
      return forecast;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

exports.findForecastByCityFromMeteoApi = async (city) => {
  try {
    const response = await axios.get(
      'https://api.meteo-concept.com/api/forecast/nextHours?latlng=48.086%2C-2.635&insee=35238',
      {
        params: {
          token:
            'ce3f9e80a67aafb9c8f02ad0328714a2591c79244122b41695d61cbdea7c345f',
          insee: city,
          format: 'json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

exports.saveForecast = async (forecast) => {
  try {
    return db.run(
      `insert into forecast (id,date,insee,details) values ('${forecast.id}','${forecast.date}','${forecast.insee}','${forecast.details}')`
    );
  } catch (error) {
    console.error(error);
  }
};
