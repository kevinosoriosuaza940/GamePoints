import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import User from "./components/users/User";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<User />} />
      </Routes>
    </Router>
  );
}


function About() {
  return <>about</>;
}
