import React from "react";
// Colours
import { deepOrange, green, pink } from "@mui/material/colors";
// Icons
import AppsIcon from "@mui/icons-material/Apps";
import ArchiveIcon from "@mui/icons-material/Archive";
import HistoryIcon from "@mui/icons-material/History";
import StarIcon from "@mui/icons-material/Star";
// Material UI
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

// Allows us to render an avatar component based on status value provided.
const TileStatusAvatar = ({ status }) => {
    switch (status) {
        case 1:
            return (
                <Tooltip title="Live">
                    <Avatar variant="square" sx={{ bgcolor: green[500] }}>
                        <StarIcon />
                    </Avatar>
                </Tooltip>
            );
        case 2:
            return (
                <Tooltip title="Pending">
                    <Avatar variant="square" sx={{ bgcolor: pink[500] }}>
                        <HistoryIcon />
                    </Avatar>
                </Tooltip>
            );
        case 3:
            return (
                <Tooltip title="Archived">
                    <Avatar variant="square" sx={{ bgcolor: deepOrange[500] }}>
                        <ArchiveIcon />
                    </Avatar>
                </Tooltip>
            );
        default:
            return (
                <Avatar variant="square" sx={{ bgcolor: green[500] }}>
                    <AppsIcon />
                </Avatar>
            );
    }
};

export default TileStatusAvatar;
