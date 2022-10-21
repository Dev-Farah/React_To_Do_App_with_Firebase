import React from 'react';
import error from '../images/404-error.webp';
import { Btn } from '../components/InputandButton';
import { Container, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function NotFound() {
    return (
        <>
            <Container sx={{ textAlign: "center",  margin: "30px auto" }}>
            <Typography variant="h3" color="#00E0C2" fontWeight={"bold"}>
                    Page Not Found
                </Typography>
                <img src={error} width="35%" alt="error" />
                    <br />
                <Typography variant="p" color="#345C65">
                    We're sorry the page you requested could not be found
                    <br />
                    Please go back to the home page
                </Typography>
                <br />
                <br />
                <NavLink to="/" style={{ textDecoration: "none" }}>
                    <Btn btnVal="Go Back" />
                </NavLink>
            </Container>
        </>
    )
}