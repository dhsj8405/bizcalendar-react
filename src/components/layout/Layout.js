import React from 'react'
import TopNavBar from './TopNavBar.js'
import Header from './Heder.js'
import { Link, Outlet } from "react-router-dom";

export default function Layout () {
    return (
       <>
        {/* <Header/> */}
        <TopNavBar/>
        <Outlet />
       </>
      )
}