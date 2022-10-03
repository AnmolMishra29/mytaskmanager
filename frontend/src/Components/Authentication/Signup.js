import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Alert from "@mui/material/Alert";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, CardActions, IconButton, InputAdornment } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Signup() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [pic, setFile] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const userRegister = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userRegister;
  const [picLoading, setPicLoading] = useState(false);
  const [snack, setSnack] = useState(false);
  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", `${process.env.REACT_APP_CLOUD_NAME}`);
      fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        {
          method: "post",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("pic url = ", data.url.toString());
          setFile(data.url.toString());
          setPicLoading(false);
          setSnack(true);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setSnack(false);
  };
  useEffect(() => {
    if (userInfo) {
      setOpen(true);
      history("/mynotes");
    }
  }, [userInfo]);
  const handleClick = async (e) => {
    e.preventDefault();

    await dispatch(register(name, email, password, pic));
    if (userInfo) {
      setOpen(true);
    }
  };
  // console.log(error);
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success">
          Account Created Successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={snack}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success">
          Image Uploaded Successfully!
        </Alert>
      </Snackbar>
      <Card varient="outlined" sx={{ p: 3 }}>
        <CardContent>
          {/* {error != "" && <Alert severity="error">{error}</Alert>} */}
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth={true}
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            size="medium"
            inputProps={{
              autocomplete: "new-password",
              form: {
                autocomplete: "off",
              },
            }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            placeholder="Choose a password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth={true}
            margin="normal"
            size="medium"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              autocomplete: "new-password",
              form: {
                autocomplete: "off",
              },
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            placeholder="Enter your Name"
            fullWidth={true}
            margin="normal"
            size="medium"
            inputProps={{
              autocomplete: "new-password",
              form: {
                autocomplete: "off",
              },
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth={true}
            startIcon={<CloudUploadIcon />}
            component="label"
            // size="large"
          >
            Upload Profile Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </Button>
        </CardContent>
        <CardActions>
          <LoadingButton
            fullWidth={true}
            variant="contained"
            color="primary"
            loading={loading || picLoading}
            onClick={handleClick}
            endIcon={<PersonAddIcon />}
            loadingPosition="end"
            // size="large"
          >
            Sign Up
          </LoadingButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default Signup;
