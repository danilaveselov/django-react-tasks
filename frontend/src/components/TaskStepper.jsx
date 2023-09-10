import React from "react";
// Material UI
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import MobileStepper from "@mui/material/MobileStepper";
import { useTheme } from "@mui/material/styles";
// Component
import TaskTypeAvatar from "./TaskTypeAvatar";
import { toast } from 'react-toastify';

const TaskStepper = ({ tasks, handleEdit, handleRefresh }) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const sortedTasks = tasks.sort((a, b) => a.order - b.order);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8000/api/tasks/${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("Task removed")
                    handleRefresh();
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
            <ListItem
                secondaryAction={
                    <>
                        <IconButton
                            onClick={() => {
                                handleEdit(null, sortedTasks[activeStep]);
                            }}
                            aria-label="edit task"
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(sortedTasks[activeStep].id)} edge="end" aria-label="delete task">
                            <ClearIcon />
                        </IconButton>
                    </>
                }
            >
                <ListItemAvatar>
                    <TaskTypeAvatar type={sortedTasks[activeStep].type} />
                </ListItemAvatar>
                <ListItemText primary={sortedTasks[activeStep].title} secondary={sortedTasks[activeStep].description} />
            </ListItem>
            <MobileStepper
                variant="dots"
                steps={sortedTasks.length}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === tasks.length - 1}>
                        Next
                        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
        </>
    );
};

export default TaskStepper;
