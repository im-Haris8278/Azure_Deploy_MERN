import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
  Typography,
} from "@mui/material";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteUser = (id) => {
    axios
      .delete("http://localhost:5000/users/" + id)
      .then((response) => {
        console.log(response.data);
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        User List
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user._id}>
            <ListItemText primary={user.username} />
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteUser(user._id)}
              >
                Delete
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserList;
