import React, { useState } from "react";
// Material UI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers";
// Other
import { format } from "date-fns";
import { toast } from 'react-toastify';

const TileForm = ({ onClose, handleRefresh, tile = null }) => {
    const [status, setStatus] = useState(tile ? tile.status : 1);
    const [launchDate, setLaunchDate] = useState(tile ? new Date(tile.launch_date) : null);

    const handleCreate = () => {
        const payload = {
            status: status,
        };

        if (launchDate !== null) {
            payload.launch_date = format(launchDate, "yyyy-MM-dd");
        }

        fetch("http://localhost:8000/api/tiles/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (response.ok) {
                    handleRefresh();
                    toast.success("Tile created")
                    onClose();
                } else {
                    console.error("Error:", response.statusText);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleEdit = () => {
        const payload = {
            status: status,
            launch_date: format(launchDate, "yyyy-MM-dd"),
        };

        fetch(`http://localhost:8000/api/tiles/${tile.id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (response.ok) {
                    handleRefresh();
                    toast.success("Tile updated")
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
                <DialogTitle>{tile ? "Edit Tile" : "New Tile"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{tile ? `Editing tile #${tile.id}` : "Create a new tile"}</DialogContentText>
                    <Select
                        labelId="status-select-label"
                        id="status-select"
                        value={status}
                        label="Status"
                        onChange={(e) => setStatus(e.target.value)}
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        <MenuItem value={1}>Live</MenuItem>
                        <MenuItem value={2}>Pending</MenuItem>
                        <MenuItem value={3}>Archived</MenuItem>
                    </Select>
                    <DatePicker
                        value={launchDate}
                        onChange={(newValue) => setLaunchDate(newValue)}
                        slotProps={{ textField: { fullWidth: true } }}
                    />
                </DialogContent>
                <DialogActions>
                    {tile ? (
                        <Button variant="contained" onClick={handleEdit}>
                            Edit
                        </Button>
                    ) : (
                        <Button variant="contained" onClick={handleCreate}>
                            Create
                        </Button>
                    )}
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TileForm;
