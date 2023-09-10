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
