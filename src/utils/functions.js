import {
  WiDirectionDown,
  WiDirectionLeft,
  WiDirectionRight,
  WiDirectionUp,
  WiDirectionDownLeft,
  WiDirectionDownRight,
  WiDirectionUpRight,
  WiDirectionUpLeft,
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnowWind,
  WiRainMix,
  WiSnow,
} from "weather-icons-react";

export const getWind = (value) => {
  if (value > 0 && value < 45) {
    return <WiDirectionDown />;
  } else if (value >= 45 && value < 90) {
    return <WiDirectionDownLeft />;
  } else if (value >= 90 && value < 135) {
    return <WiDirectionLeft />;
  } else if (value >= 135 && value < 180) {
    return <WiDirectionUpLeft />;
  } else if (value >= 180 && value < 225) {
    return <WiDirectionUp />;
  } else if (value >= 225 && value < 270) {
    return <WiDirectionUpRight />;
  } else if (value >= 270 && value < 315) {
    return <WiDirectionRight />;
  } else if (value >= 315 && value < 360) {
    return <WiDirectionDownRight />;
  } else {
    console.log("Problem", value);
  }
};

export const getWeatherCondition = (value) => {
  switch (value) {
    case 1:
    case 2:
      return <WiDaySunny />;
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      return <WiCloudy />;
    case 8:
    case 9:
    case 10:
    case 11:
      return <WiRain />;
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
      return <WiSnowWind />;
    case 18:
    case 19:
    case 20:
      return <WiRainMix />;
    default:
      return <WiSnow />;
  }
};
