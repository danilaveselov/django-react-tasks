import React, { useEffect, useState } from "react";
// Material UI
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AppsIcon from "@mui/icons-material/Apps";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
// Local Components
import TaskForm from "./TaskForm";
import TaskStepper from "./TaskStepper";
import TileForm from "./TileForm";
import TileStatusAvatar from "./TileStatusAvatar";
// Other
import { format } from "date-fns";
import { toast } from "react-toastify";

const TileList = () => {
    const [filterStatus, setFilterStatus] = useState("0");
    const [tiles, setTiles] = useState([]);
    const [showTileDialog, setShowTileDialog] = useState(false);
    const [showTaskDialog, setShowTaskDialog] = useState(false);
    const [selectedTile, setSelectedTile] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleFetch = () => {
        fetch("http://localhost:8000/api/tiles/")
            .then((response) => response.json())
            .then((data) => {
                data.sort((a, b) => new Date(b.launch_date) - new Date(a.launch_date));
                setTiles(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8000/api/tiles/${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    handleFetch();
                    toast.success("Tile deleted");
                } else {
                    console.error("Error:", response.statusText);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleOpenEditTileDialog = (tile) => {
        setSelectedTile(tile);
        setShowTileDialog(true);
    };

    const handleCloseTileDialog = () => {
        setSelectedTile(null);
        setShowTileDialog(false);
    };

    const handleOpenTaskDialog = (tile = null, task = null) => {
        setSelectedTask(task);
        setSelectedTile(tile);
        setShowTaskDialog(true);
    };

    const handleCloseTaskDialog = () => {
        setSelectedTask(null);
        setSelectedTile(null);
        setShowTaskDialog(false);
    };

    useEffect(() => {
        handleFetch();
    }, []);

    const TilesGrid = ({ status }) => {
        const filteredTiles = status ? tiles.filter((tile) => tile.status === parseInt(status)) : tiles;

        return (
            <Grid container spacing={2}>
                {filteredTiles.map((tile) => (
                    <Grid key={tile.id} item xs={4}>
                        <Card sx={{ height: "100%" }}>
                            <CardHeader
                                avatar={<TileStatusAvatar status={tile.status} />}
                                title={`Tile #${tile.id}`}
                                subheader={format(new Date(tile.launch_date), "MMMM dd, yyyy")}
                                action={
                                    <>
                                        <IconButton onClick={() => handleOpenTaskDialog(tile)} aria-label="add task">
                                            <AddTaskIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(tile.id)} aria-label="delete tile">
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                handleOpenEditTileDialog(tile);
                                            }}
                                            aria-label="edit tile"
                                        >
                                            <SettingsIcon />
                                        </IconButton>
                                    </>
                                }
                            />
                            <CardContent>
                                {tile.tasks.length > 0 && (
                                    <TaskStepper tasks={tile.tasks} handleEdit={handleOpenTaskDialog} handleRefresh={handleFetch} />
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    };

    return (
        <>
            <TabContext value={filterStatus}>
                <Card>
                    <TabList
                        value={filterStatus}
                        onChange={(event, newValue) => {
                            setFilterStatus(newValue);
                        }}
                        aria-label="tabs"
                        indicatorColor="secondary"
                        textColor="inherit"
                        centered
                        variant="fullWidth"
                    >
                        <Tab icon={<AppsIcon />} iconPosition="start" value="0" label="ALL" />
                        <Tab icon={<StarIcon />} iconPosition="start" value="1" label="LIVE" />
                        <Tab icon={<HistoryIcon />} iconPosition="start" value="2" label="PENDING" />
                        <Tab icon={<ArchiveIcon />} iconPosition="start" value="3" label="ARCHIVED" />
                    </TabList>
                </Card>
                <TabPanel value="0">
                    <TilesGrid />
                </TabPanel>
                <TabPanel value="1">
                    <TilesGrid status={filterStatus} />
                </TabPanel>
                <TabPanel value="2">
                    <TilesGrid status={filterStatus} />
                </TabPanel>
                <TabPanel value="3">
                    <TilesGrid status={filterStatus} />
                </TabPanel>
                <Box marginTop={2} display="flex" justifyContent="center">
                    <Button
                        onClick={() => {
                            setShowTileDialog(true);
                        }}
                        size="large"
                        component="label"
                        variant="contained"
                        startIcon={<AddCircleIcon />}
                    >
                        New Tile
                    </Button>
                </Box>
            </TabContext>
            {showTileDialog && (
                <TileForm onClose={handleCloseTileDialog} handleRefresh={handleFetch} tile={selectedTile} />
            )}
            {showTaskDialog && (
                <TaskForm
                    onClose={handleCloseTaskDialog}
                    handleRefresh={handleFetch}
                    tile={selectedTile}
                    task={selectedTask}
                />
            )}
        </>
    );
};

export default TileList;
