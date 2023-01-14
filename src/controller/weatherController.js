const {
  findAllCities,
  findForecastByCity,
  findForecastByCityFromMeteoApi,
  saveForecast,
} = require('../queries/weatherQuerie');
const uuid = require('uuid');

exports.getCities = async (req, res) => {
  try {
    const cities = await findAllCities();
    res.json(cities);
  } catch (error) {
    console.error(error);
  }
};

exports.getForecastByCity = async (req, res) => {
  try {
    const forecast = await findForecastByCity(req.params.city);
    if (!forecast) {
      const forecastFromApi = await findForecastByCityFromMeteoApi(
        req.params.city
      );
      const data = {
        id: uuid.v4(),
        insee: forecastFromApi.city.insee,
        details: forecastFromApi.city.name,
        date: new Date(),
      };
      await saveForecast(data);
    }
    res.json(forecast);
  } catch (error) {
    console.error(error);
  }
};
