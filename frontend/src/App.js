import React from "react";
import TileList from "./components/TileList";
import Container from "@mui/material/Container";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enGB from 'date-fns/locale/en-GB';

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
            <Container>
                <TileList />
            </Container>
        </LocalizationProvider>
    );
}

export default App;
