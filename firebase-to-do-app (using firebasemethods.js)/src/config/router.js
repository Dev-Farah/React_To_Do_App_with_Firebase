import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Importing All Pages
import Home from "../screens/home";
import Todos from "../screens/todos";
import Login from "../screens/login";
import SignUp from "../screens/signup";
import NotFound from "../screens/notfound";

export default function AppRouter() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="todos/:id" element={<Todos />} />
                    <Route path="Login" element={<Login />} />
                    <Route path="SignUp" element={<SignUp />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}