import {defineComponent} from 'vue'
import {getWeatherData, WeatherConditionIcons} from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',
  setup() {
    function getCelsiusTemperature(geoItem) {
      let temperature = +geoItem.current.temp - 273.15;
      return temperature.toFixed(1)
    }
    function getPressure(geoItem) {
      let pressure = +geoItem.current.pressure * 0.75;
      return Math.round(pressure)
    }

    function getWeatherIcon(geoItem) {
      return WeatherConditionIcons[geoItem.current.weather.id]
    }

    function isNight(geoItem) {
      let sunrise = new Date();
      let currentSunrice = geoItem.current.sunrise.split(":");
      sunrise.setHours(+currentSunrice[0], +currentSunrice[1], 0, 0);

      let sunset = new Date();
      let currentSunset = geoItem.current.sunset.split(":");
      sunset.setHours(+currentSunset[0], +currentSunset[1], 0, 0);

      let nowTime = new Date();
      let currentTime = geoItem.current.dt.split(":");
      nowTime.setHours(+currentTime[0], +currentTime[1], 0, 0);


      return sunrise.getTime() > nowTime.getTime()
      || sunset.getTime() < nowTime.getTime()
    }

    return {
      geoItems: getWeatherData(),
      weatherConditionIcons: WeatherConditionIcons,
      getCelsiusTemperature,
      getPressure,
      getWeatherIcon,
      isNight
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li class="weather-card" :class="isNight(geoItem)?'weather-card--night':''" v-for="geoItem in geoItems">
          <div class="weather-alert" v-if="geoItem.alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ geoItem.alert.sender_name }}:
              {{ geoItem.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ geoItem.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ geoItem.current.dt }}
            </div>
          </div>
          <div class="weather-conditions" v-if="geoItem.current.weather">
            <div class="weather-conditions__icon" :title="geoItem.current.weather.description">
              {{ getWeatherIcon(geoItem) }}️
            </div>
            <div class="weather-conditions__temp">{{ getCelsiusTemperature(geoItem) }} °C</div>
          </div>
          <div class="weather-details" v-if="geoItem.current">
            <div class="weather-details__item" v-if="geoItem.current.pressure">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ getPressure(geoItem) }}</div>
            </div>
            <div class="weather-details__item" v-if="geoItem.current.humidity">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ geoItem.current.humidity }}</div>
            </div>
            <div class="weather-details__item" v-if="geoItem.current.clouds">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ geoItem.current.clouds }}</div>
            </div>
            <div class="weather-details__item" v-if="geoItem.current.wind_speed">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ geoItem.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
