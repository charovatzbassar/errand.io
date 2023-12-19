import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import { logout } from "../utils/auth";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <ul className="background h-screen">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>{" "}
        <div className="flex justify-end p-5 fixed w-screen">
          {!localStorage.getItem("token") ? (
            <>
              {" "}
              <Button
                variant="contained"
                onClick={() => navigate("/auth/login")}
              >
                Log In
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/auth/register")}
              >
                Register
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={logout}>
              Log Out
            </Button>
          )}
        </div>
        <div className="flex justify-center items-center h-screen">
          <Box
            sx={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              py: 6,
              px: 3,
              backgroundColor: "white",
              borderRadius: "1em",
            }}
          >
            <Typography sx={{ textAlign: "center" }} variant="h4" gutterBottom>
              Welcome to Errand.io!
            </Typography>

            <Button variant="contained" onClick={() => navigate("/todos")}>
              My todos
            </Button>
          </Box>
        </div>
      </ul>
    </>
  );
};

export default HomePage;
