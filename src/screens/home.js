import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useLocation } from "react-router-dom";
import { Input, Btn } from '../components/InputandButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';



export default function Home() {
    const location = useLocation();
    let userDetails = location.state;
    
    let handleSubmit = (e) => {
        e.preventDefault();
    }
    let [toDo, setToDo] = useState('');
    let [count, setCount] = useState(0);
    let [list, setList] = useState([]);

    const add = (e, i) => {
        if (toDo.length >= 5 && toDo.length <= 40) {
            setList([...list, toDo])
            console.log(list);
            setToDo('');
            (setCount(++count))

        } else {
            alert("Invalid Entry, Please Enter a valid to-do");
        }
    }

    const clearAll = () => {
        setList([]);
        (setCount(0))

    }
    const edit = (e, i) => {
        let editedToDo;
        do {
            editedToDo = prompt("Edit to-do", e);
        } while (!editedToDo);
        list.splice(i, 1, editedToDo);
        setList([...list])
    }

    const del = (i) => {
        list.splice(i, 1);
        setList([...list]);
        (setCount(--count))
    }

    return (
        <>
            <Grid container p={3} className="main">
                <Grid item mx="auto" lg={6} md={6} sm={12} flexDirection={"column"}>
                    <Box className="partition1">
                        <Typography mb={2} variant="h4" color="#fff" fontWeight={"bold"}>
                            To-Do List
                        </Typography>

                        <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", flexWrap: 'nowrap' }}>
                            <Box sx={{ width: "100%"}}>
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

                            <Box sx={{ width: "145px", flexWrap: 'wrap' }}>
                                <Btn btnVal="Add" onClick={() => add()} />
                                <Btn otherClasses='clearAllBtn' btnVal={<DeleteIcon />} onClick={() => clearAll()} />
                            </Box>
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
                                            {e}
                                        </Typography>
                                        <Box>
                                            <Btn otherClasses='editBtn' btnVal={<EditIcon />} onClick={() => edit(e, i)} />
                                            {/* <Btn otherClasses='updateBtn' btnVal={<CheckIcon />} onClick={() => save(e, i)} /> */}
                                            <Btn otherClasses='updateBtn' btnVal={<CloseIcon />} onClick={() => del(i)} />
                                        </Box>
                                    </li>
                                )
                            })}
                        </ul>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}