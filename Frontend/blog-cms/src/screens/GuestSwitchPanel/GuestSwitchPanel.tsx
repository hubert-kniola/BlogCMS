import React from "react"
import { Outlet } from "react-router-dom"
import { MainPageMenu } from "../../components"

export const GuestSwitchPanel = () => {
    return (
      <>
        <MainPageMenu />
        <Outlet />
      </>
    );
}