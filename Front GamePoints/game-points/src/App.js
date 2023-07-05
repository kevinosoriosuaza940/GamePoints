import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import User from "./components/users/User";
import Tasks from "./components/tasks/Tasks";
import { UserProvider } from "./components/users/UserContext";

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<User />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
