import "./App.css";
import NewsUpdate from "./components/NewsUpdate";
import TaskItem from "./components/TaskItem";
import { Box, Grid, Container, Typography, Toolbar } from "@mui/material";

function App() {
    return (
        <>
            <Toolbar></Toolbar>
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4">Hi, Welcome back</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={8}>
                        <NewsUpdate />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <TaskItem />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default App;
