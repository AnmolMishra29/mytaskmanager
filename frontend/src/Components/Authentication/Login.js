import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  getFormGroupUtilityClass,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";

function Login() {
  // const useStyles = makeStyles({
  // 	text1: {
  // 		color: "grey",
  // 		textAlign: "center",
  // 	},
  // 	text2: {
  // 		textAlign: "center",
  // 	},
  // 	card2: {
  // 		height: "8vh",
  // 		marginTop: "2%",
  // 		marginBottom: "2%",
  // 	},
  // });
  // const classes = useStyles();
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  console.log(error);

  useEffect(() => {
    if (userInfo) {
      setOpen(true);
      history("/mynotes");
    }
  }, [userInfo]);

  const handleGuest = () => {
    setEmail("abcd@example.com");
    setPassword("12345678");
  };
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success">
          Login Successfully!
        </Alert>
      </Snackbar>
      <Card varient="outlined" sx={{ p: 3 }}>
        <CardContent>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth={true}
            margin="normal"
            size="medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              autoComplete: "off",
              form: {
                autoComplete: "off",
              },
            }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth={true}
            margin="normal"
            size="medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              autoComplete: "off",
              form: {
                autoComplete: "off",
              },
            }}
          />
        </CardContent>

        <CardActions>
          <LoadingButton
            fullWidth={true}
            variant="contained"
            color="primary"
            onClick={handleClick}
            loading={loading}
            endIcon={<LoginIcon />}
            loadingPosition="end"
            size="large"
          >
            Log In
          </LoadingButton>
          <Button
            fullWidth
            size="large"
            variant="contained"
            style={{ backgroundColor: "#e53e3e" }}
            endIcon={<AccountCircleIcon />}
            onClick={handleGuest}
          >
            Get Guest Credentials
          </Button>
        </CardActions>
      </Card>
      <Card
        varient="outlined"
        // className={classes.card2}
      ></Card>
    </Box>
  );
}

export default Login;
