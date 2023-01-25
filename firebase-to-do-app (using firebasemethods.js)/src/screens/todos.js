import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import app from "../config/firebaseconfig";
import { userSignOut, checkUser, sendData, getData, delData } from "../config/firebasemethods";
import { Input, Btn } from '../components/InputandButton';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';



function Todos() {
    const auth = getAuth(app);
    const database = getDatabase(app);
    const navigate = useNavigate();
    const params = useParams();
    const [userUid, setUserUid] = useState('')
    const location = useLocation();
    let userDetails = location.state;

    let [toDo, setToDo] = useState('');
    let [list, setList] = useState([]);
    let [count, setCount] = useState(0);
    let [isEditing, setIsEditing] = useState(false);
    let [tempUid, setTempUid] = useState('');
    const [isLoading, setLoader] = useState(false);

    let handleSubmit = (e) => {
        e.preventDefault();
    }

    // console.log(userUid);
    const getTodosData = () => {
        getData(`todos/${params.id}`)
            .then((res) => {
                setList(res);
                setCount(res.length);
            }).catch((err) => {
                console.log(err);
            })
    }

    const add = () => {
        if (toDo.length >= 5 && toDo.length <= 40) {

            sendData(`todos/${userUid}`, {
                todo: toDo,
                time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
                userId: userUid,
            }).then((res) => {
                // console.log(res);
                getTodosData();
            }).catch((err) => {
                console.log(err);
            })
            setToDo('');
            setCount(++count);
        } else {
            alert("Invalid Entry, Please Enter a valid to-do");
        }
    }

    const clearAll = () => {
        delData(`todos/${userUid}`)
            .then((res) => {
                console.log(res)
                // getTodosData();
            })
            .catch((err) => {
                console.log(err)
            })
        setList([]);
        setCount(0)
    }

    const edit = (e, id) => {
        setIsEditing(true);
        setToDo(e.todo);
        // console.log(id);
        setTempUid(id)
    }

    let saveEdit = (e) => {
        if (toDo.length >= 5 && toDo.length <= 40) {

            sendData(`todos/${userUid}`, {
                todo: toDo,
                id: tempUid,
                time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
                // username: location.state.userName,
                // email: auth.currentUser.email,
                userId: userUid,
            }, tempUid).then((res) => {
                // setList(res)
                // console.log(res);
                getTodosData();
            }).catch((err) => {
                console.log(err);
            })

            setToDo('');
            setIsEditing(false);
        } else {
            alert("Invalid Entry, Please Enter a valid to-do");
        }
    }

    const del = (e, id) => {
        delData(`todos/${userUid}`, id)
            .then((res) => {
                console.log(res)
                setCount(--count)
                getTodosData();
            })
            .catch((err) => {
                console.log(err)
            })
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
            .then((userUid) => {
                if (params.id === userUid) {
                    setUserUid(userUid);
                    getTodosData();
                } else {
                    navigate('/Login');
                }
            }).catch(() => {
                navigate('/Login');
            })
    }

    useEffect(() => {
        checkAuth()
        setUserUid(params.id)
        getTodosData();
    }, [])


    return (
        <>
            <Grid container p={3} className="main">
                <Grid item mx="auto" lg={6} md={6} sm={12} flexDirection={"column"}>
                    <Box className="partition1">

                        <Typography mb={2} variant="h4" color="#fff" fontWeight={"bold"}>
                            To-Do List
                        </Typography>

                        <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", flexWrap: 'nowrap' }}>
                            <Box className="inputBoxToDo" sx={{ width: "100%" }}>
                                <Input
                                    value={toDo}
                                    type="text"
                                    placeholder="Enter a task"
                                    onChange={(e) => {
                                        toDo = e.target.value;
                                        setToDo(toDo);
                                    }}
                                />
                            </Box>

                            {isEditing ?
                                <Btn btnVal="Save" onClick={() => saveEdit()} />
                                :
                                <Btn btnVal="Add" onClick={() => add()} />
                            }
                            <Btn otherClasses='clearAllBtn' btnVal={<DeleteIcon />} onClick={() => clearAll()} />
                        </form>

                    </Box>

                    <Box className="partition2">
                        <Typography variant="h5" color="#fff" fontWeight={"bold"}>
                            To-Do:
                        </Typography>
                        <Typography variant="p" color="#fff">
                            You have: {count <= 0 ? "No" : count} {count == 1 ? "task" : "tasks"}
                        </Typography>
                    </Box>

                    <Box>
                        <ul>
                            {list.map((e) => {
                                    return (
                                        <li className="todo">
                                            <Typography variant="h5"
                                                key={e.id}
                                                m={0}>
                                                {e.todo}
                                            </Typography>
                                            <Box>
                                                <Btn otherClasses='editBtn' btnVal={<EditIcon />} onClick={() => edit(e, e.id)} />
                                                <Btn otherClasses='updateBtn' btnVal={<CloseIcon />} onClick={() => del(e, e.id)} />
                                            </Box>
                                        </li>
                                    )
                                })}
                        </ul>
                    </Box>
                </Grid>
            </Grid>

            <Box style={{ zIndex: 1, position: "fixed", right: "20px", bottom: "20px" }}>
                <Btn disabled={isLoading} btnVal={isLoading ? <CircularProgress /> : "Sign Out"} onClick={signOut} />
            </Box>
        </>
    )
}


export default Todos;