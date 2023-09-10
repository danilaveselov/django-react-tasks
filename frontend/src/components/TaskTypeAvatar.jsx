import React from "react";
// Icons
import ChatIcon from "@mui/icons-material/Chat";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import PollIcon from "@mui/icons-material/Poll";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
// Material UI
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

const TaskTypeAvatar = ({ type }) => {
    switch (type) {
        case 1:
            return <Tooltip title="Survey"><Avatar><PollIcon /></Avatar></Tooltip>;
        case 2:
            return <Tooltip title="Discussion"><Avatar><ChatIcon /></Avatar></Tooltip>;
        case 3:
            return <Tooltip title="Diary"><Avatar><ImportContactsIcon /></Avatar></Tooltip>;
        default:
            return <Avatar><QuestionMarkIcon /></Avatar>;
    }
}

export default TaskTypeAvatar
