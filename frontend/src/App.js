import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, AppBar, Typography, Toolbar, Button } from "@mui/material";

import ExerciseList from "./components/ExerciseList";
import EditExercise from "./components/EditExercise";
import CreateExercise from "./components/CreateExercise";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Exercise Tracker
          </Typography>
          <Button color="inherit" component={Link} to="/user">
            Create User
          </Button>
          <Button color="inherit" component={Link} to="/users">
            All User
          </Button>
          <Button color="inherit" component={Link} to="/create">
            Create Exercise
          </Button>
          <Button color="inherit" component={Link} to="/">
            All Exercises
          </Button>
        </Toolbar>
      </AppBar>
      <br />
      <Container maxWidth="sm">
        <Routes>
          <Route path="/" element={<ExerciseList />} />
          <Route path="/edit/:id" element={<EditExercise />} />
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
