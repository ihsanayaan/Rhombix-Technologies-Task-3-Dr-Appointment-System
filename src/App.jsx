import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import SelectDateTime from "./pages/SelectDateTime";
import UserDetails from "./pages/UserDetails";
import Summary from "./pages/Summary";
import Success from "./pages/Success";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/select-datetime" element={<SelectDateTime />} />
        <Route path="/details" element={<UserDetails />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/success" element={<Success />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
