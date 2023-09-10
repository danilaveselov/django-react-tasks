import React, { useState } from "react";
// Material UI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
// Other
import { toast } from "react-toastify";

const TaskForm = ({ onClose, handleRefresh, tile, task = null }) => {
    const [title, setTitle] = useState(task ? task.title : "");
    const [order, setOrder] = useState(task ? task.order : 1);
    const [description, setDescription] = useState(task ? task.description : "");
    const [type, setType] = useState(task ? task.type : 1);

    const handleCreate = (e) => {
        e.preventDefault();

        const payload = {
            title: title,
            order: order,
            description: description,
            type: type,
            tile: tile.id,
        };

        fetch("http://localhost:8000/api/tasks/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (response.ok) {
                    handleRefresh();
                    toast.success("Task created");
                    onClose();
                } else {
                    console.error("Error:", response.statusText);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleEdit = (e) => {
        e.preventDefault();

        const payload = {
            title: title,
            order: order,
            description: description,
            type: type,
            tile: task.tile,
        };

        fetch(`http://localhost:8000/api/tasks/${task.id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (response.ok) {
                    handleRefresh();
                    toast.success("Task updated");
                    onClose();
                } else {
                    console.error("Error:", response.statusText);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <>
            <Dialog open={true}>
                <form onSubmit={task ? handleEdit : handleCreate}>
                    <DialogTitle>{task ? "Edit Task" : "New Task"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{task ? `Task: ${task.title}` : "Create a new tile"}</DialogContentText>
                        <TextField
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id="title-field"
                            label="Title"
                            required
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                            id="order-field"
                            label="Order"
                            required
                            type="number"
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            id="description-field"
                            label="Description"
                            required
                            fullWidth
                            margin="dense"
                            multiline
                            rows={4}
                        />
                        <InputLabel id="type-select-label">Type</InputLabel>
                        <Select
                            labelId="type-select-label"
                            id="type-select"
                            value={type}
                            label="Type"
                            onChange={(e) => setType(e.target.value)}
                            fullWidth
                            margin="dense"
                        >
                            <MenuItem value={1}>Survey</MenuItem>
                            <MenuItem value={2}>Discussion</MenuItem>
                            <MenuItem value={3}>Diary</MenuItem>
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" variant="contained">
                            {task ? "Edit" : "Create"}
                        </Button>
                        <Button onClick={onClose}>Close</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default TaskForm;
