import React, { useEffect, useState } from "react";
// Material UI
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AppsIcon from "@mui/icons-material/Apps";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import StarIcon from "@mui/icons-material/Star";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
// Other
import { format } from "date-fns";
import TileForm from "./TileForm";

const TileList = () => {
    const [value, setValue] = useState("0");
    const [tiles, setTiles] = useState([]);
    const [showTileDialog, setShowTileDialog] = useState(false);
    const [selectedTile, setSelectedTile] = useState(null);

    const handleFetch = () => {
        fetch("http://localhost:8000/api/tiles/")
            .then((response) => response.json())
            .then((data) => {
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

    useEffect(() => {
        handleFetch();
    }, []);

    const TilesGrid = ({ status }) => {
        const filteredTiles = status ? tiles.filter((tile) => tile.status === parseInt(status)) : tiles;

        return (
            <Grid container spacing={2}>
                {filteredTiles.map((tile) => (
                    <Grid key={tile.id} item xs={4}>
                        <Card>
                            <CardActionArea onClick={() => console.log("Test")}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" textAlign="center">
                                        Tile #{tile.id}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {format(new Date(tile.launch_date), "MMMM dd, yyyy")}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions disableSpacing>
                                <IconButton
                                    onClick={() => {
                                        handleOpenEditTileDialog(tile);
                                    }}
                                    aria-label="edit tile"
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(tile.id)} aria-label="delete tile">
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    };

    return (
        <>
            <TabContext value={value}>
                <Card>
                    <TabList
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
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
                    <TilesGrid status={value} />
                </TabPanel>
                <TabPanel value="2">
                    <TilesGrid status={value} />
                </TabPanel>
                <TabPanel value="3">
                    <TilesGrid status={value} />
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
        </>
    );
};

export default TileList;
