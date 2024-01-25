import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme";

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const isAuth = Boolean(useSelector((state)=>state.token))

    return (
        <>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={!isAuth ? <LoginPage /> : <Navigate to='/home' />}></Route>
                        <Route path="/login" element={<LoginPage />}></Route>
                        <Route path="/home" element={isAuth ? <HomePage />: <Navigate to='/' />}></Route>
                        <Route
                            path="/profile/:userId"
                            element={isAuth ? <ProfilePage /> : <Navigate to='/' />}
                        ></Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
