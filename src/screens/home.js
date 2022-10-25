import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue, update, remove } from "firebase/database";
import app from "../config/firebaseconfig";
import { userSignOut } from "../config/firebasemethods";
import { Input, Btn } from '../components/InputandButton';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';



export default function Home() {

    const auth = getAuth(app);
    const database = getDatabase(app);
    const navigate = useNavigate();
    const location = useLocation();
    let userDetails = location.state;

    let key = Date.now();
    let [toDo, setToDo] = useState('');
    let [list, setList] = useState([]);
    let [count, setCount] = useState(0);
    let [isEditing, setIsEditing] = useState(false);
    let [tempUid, setTempUid] = useState('');

    let handleSubmit = (e) => {
        e.preventDefault();
    }

    const add = (e, i) => {
        if (toDo.length >= 5 && toDo.length <= 40) {

            set(ref(database, `/todos/${auth.currentUser.uid}/${key}`), {
                todo: toDo,
                key: key,
                time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
                username: location.state.userName,
                email: auth.currentUser.email,
            });
            setToDo('');
            (setCount(++count))

        } else {
            alert("Invalid Entry, Please Enter a valid to-do");
        }
    }

    const clearAll = () => {
        remove(ref(database, `todos/${auth.currentUser.uid}/`));
        setList([]);
        (setCount(0))
    }

    const edit = (e, i) => {
        setIsEditing(true);
        setToDo(e.todo);
        setTempUid(e.key)
    }

    let saveEdit = (e) => {
        if (toDo.length >= 5 && toDo.length <= 40) {

            update(ref(database, `todos/${auth.currentUser.uid}/${tempUid}`), {
                todo: toDo,
                key: tempUid,
                time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
                username: location.state.userName,
                email: auth.currentUser.email,
            });
            setToDo('');
            setIsEditing(false);
        } else {
            alert("Invalid Entry, Please Enter a valid to-do");
        }
    }

    const del = (e) => {
        remove(ref(database, `todos/${auth.currentUser.uid}/${e.key}`));
        (setCount(--count))
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                onValue(ref(database, `todos/${auth.currentUser.uid}`), (snapshot) => {
                    setList([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map((e) => {
                            setList((OldArray) => [e, ...OldArray]);
                        })
                        count = Object.values(data).length
                        setCount(count)
                    }
                })
            } else if (!user) {
                navigate('/Login')
            }
        })
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
                                        console.log(toDo);
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
                            {list.map((e, i) => {
                                return (
                                    <li className="todo">
                                        <Typography variant="h5"
                                            key={i}
                                            m={0}>
                                            {e.todo}
                                        </Typography>
                                        <Box>
                                            <Btn otherClasses='editBtn' btnVal={<EditIcon />} onClick={() => edit(e, i)} />
                                            <Btn otherClasses='updateBtn' btnVal={<CloseIcon />} onClick={() => del(e)} />
                                        </Box>
                                    </li>
                                )
                            })}
                        </ul>
                    </Box>
                </Grid>
            </Grid>

            <Box style={{ zIndex: 1, position: "fixed", right: "20px", bottom: "20px" }}>
                <Btn btnVal="Sign Out" onClick={() => userSignOut()} />
            </Box>
        </>
    )
}