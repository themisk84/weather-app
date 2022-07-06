import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStore from "./components/GlobalStore";
import CurrentWeather from "./components/CurrentWeather";
import NavBar from "./components/NavBar";
import WeekForecast from "./components/WeekForecast";
import ErrorMessage from "./components/ErrorMessage";
import Bookmarked from "./components/Bookmarked";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStore>
        <NavBar />
        <Routes>
          <Route path="/" element={<CurrentWeather />} />
          <Route path="/weekly" element={<WeekForecast />} />
          <Route path="/bookmark" element={<Bookmarked />} />
          <Route path="*" element={<ErrorMessage />} />
        </Routes>
      </GlobalStore>
    </BrowserRouter>
  );
};

export default App;
