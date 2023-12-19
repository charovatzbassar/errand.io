import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Stack } from "@mui/material";
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
          <Stack spacing={2} direction="row">
            {!localStorage.getItem("token") ? (
              <>
                {" "}
                <Button
                  variant="text"
                  sx={{ color: "white", fontWeight: "bold" }}
                  onClick={() => navigate("/auth/login")}
                >
                  Log In
                </Button>
                <Button
                  variant="text"
                  sx={{ color: "white", fontWeight: "bold" }}
                  onClick={() => navigate("/auth/register")}
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                sx={{ color: "white", fontWeight: "bold" }}
                variant="text"
                onClick={logout}
              >
                Log Out
              </Button>
            )}
          </Stack>
        </div>
        <div className="flex justify-center items-center h-screen">
          <Box
            sx={{
              width: "25%",
              height: "25%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              py: 3,
              px: 3,
              backgroundColor: "white",
              borderRadius: "1em",
            }}
          >
            <Typography sx={{ textAlign: "center" }} variant="h4">
              Welcome to Errand.io!
            </Typography>

            <Button
              variant="text"
              sx={{ color: "#3e47ff", fontWeight: "bold" }}
              onClick={() => navigate("/todos")}
            >
              My todos
            </Button>
          </Box>
        </div>
      </ul>
    </>
  );
};

export default HomePage;
