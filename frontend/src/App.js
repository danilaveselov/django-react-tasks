import React from "react";
// Material UI
import Container from "@mui/material/Container";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// Local Components
import TileList from "./components/TileList";
// Other
import enGB from "date-fns/locale/en-GB";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Root component. LocalizationProvider is required by @mui/x-date-pickers.
// ToastContainer to display our pop-up messages when an action has succeeded.
function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
            <Container>
                <TileList />
            </Container>
            <ToastContainer />
        </LocalizationProvider>
    );
}

export default App;
