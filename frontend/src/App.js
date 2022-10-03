import "./App.css";
import { LandingPage } from "./Pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import PrivateRoute from "./Extras/Privateroute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/mynotes"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
