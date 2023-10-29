import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './App.css';
import React, { useState, useEffect } from 'react';

import CalendarPage from "./pages/CalendarPage";
import Login from './pages/LoginPage';
import Layout from "./components/layout/Layout";
import BoardPage from "./pages/BoardPage";
import {pageUrls} from './config/urls';
import GooglePage from "./pages/GooglePage";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false); // 로그인 상태
  console.log(pageUrls)
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path={pageUrls.calendarPageUrl} element={<Layout />}>
        <Route index element={<CalendarPage />}/>
        <Route path={pageUrls.boardPageUrl} element={<BoardPage />}/>
        <Route path={pageUrls.googleConnPageUrl} element={<GooglePage />}/>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
