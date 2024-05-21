import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { List, ListItem, ListItemText, Button } from "@mui/material";

const ExerciseList = ({ loggedIn }) => {
  const [exercises, setExercises] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteExercise = (id) => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((response) => {
        console.log(response.data);
        setExercises(exercises.filter((exercise) => exercise._id !== id));
        setDeleteMessage("Deleted Successfully");

        // Clear the delete message after 3 seconds
        setTimeout(() => {
          setDeleteMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Exercises</h3>
      {loggedIn && (
        <Button component={Link} to="/create" variant="contained">
          Create New Exercise
        </Button>
      )}
      <br />
      <br />
      {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
      {exercises.length === 0 ? (
        <div className="no-exercises-container">
          <p>No exercises found.</p>
        </div>
      ) : (
        <List>
          {exercises.map((exercise) => (
            <ListItem key={exercise._id}>
              <ListItemText
                primary={exercise.username}
                secondary={exercise.description}
              />
              <div>
                <Button
                  component={Link}
                  to={"/edit/" + exercise._id}
                  variant="contained"
                  color="success"
                  sx={{ marginRight: "8px" }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteExercise(exercise._id)}
                >
                  Delete
                </Button>
              </div>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ExerciseList;
