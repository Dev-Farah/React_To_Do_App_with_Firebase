import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { userSignOut, checkUser } from "../config/firebasemethods";
import { Btn } from '../components/InputandButton';
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from '@mui/system';
import giphy from '../assets/giphy.gif'


function Home() {

    const navigate = useNavigate();
    const params = useParams();
    const [userUid, setUserUid] = useState('');
    const [isLoading, setLoader] = useState(false);
    // const location = useLocation();
    // let userDetails = location.state;

    let goToTodos = () => {
        navigate(`/todos/${userUid}`);
    }

    let signOut = () => {
        setLoader(true)
        userSignOut().then(() => {
            setLoader(false)
            navigate('/Login');
        }).catch((err) => {
            setLoader(false)
            alert(err)
        })
    }

    let checkAuth = () => {
        checkUser()
            .then((currentUserUid) => {
                setUserUid(currentUserUid)
                if (params.id == userUid) {
                navigate(`/todos/${userUid}`)
                setUserUid(userUid);
                getTodosData();
                }
            }).catch(() => {
                navigate('/Login');
            })
    }

    
    useEffect(() => {
        checkAuth()
    }, [])


    return (
        <>
            <Container sx={{ textAlign: "center",  margin: "60px auto" }}>
                
                <Typography variant="h3" color="#00E0C2" fontWeight={"bold"}>
                    Hey there!
                </Typography>
                
                <Typography variant="h5" color="#00E0C2" fontWeight={"bold"}>
                    Nice to See You
                </Typography>

                <img src={giphy} width="190px" alt="giphy" />

                <Typography variant="h6" color="#345C65" fontWeight={"bold"}>
                    Go to your To-do list
                </Typography>
                <br />

                <Btn mb={2} variant="h4" onClick={goToTodos} btnVal="Show list" />

            </Container>

            
            <Box style={{ zIndex: 1, position: "fixed", right: "20px", bottom: "20px" }}>
                <Btn disabled={isLoading} btnVal={isLoading ? <CircularProgress /> : "Sign Out"} onClick={signOut} />
            </Box>
        </>
    )
}


export default Home;