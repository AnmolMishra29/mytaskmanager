import background from "../Extras/background.jpg";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExploreIcon from "@mui/icons-material/Explore";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Mynotes from "../Components/SingleView/Mynotes";
import Myprofile from "../Components/SingleView/Myprofile";
import Explore from "../Components/SingleView/Explore";
import About from "../Components/SingleView/About";
import { logout } from "../actions/userAction";
import { useDispatch } from "react-redux";
import { Alert, Button, Snackbar } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { createtaskAction } from "../actions/taskAction";
import CloseIcon from "@mui/icons-material/Close";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#FF3B30" : "#FF453A",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const drawerWidth = "240px";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Homepage() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const [open1, setOpen1] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [taskstatus, setTaskstatus] = React.useState(false);
  const [ispublic, setIspublic] = React.useState(false);
  const taskCreate = useSelector((state) => state.taskCreate);
  const [openSnackSucess, setopenSnackSucess] = React.useState(false);
  const [openSnackError, setopenSnackError] = React.useState(false);

  const { loading, error, success } = taskCreate;

  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen1(false);
  };
  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createtaskAction(title, content, category, taskstatus));
    resetHandler();
  };
  React.useEffect(() => {
    if (success != undefined) {
      if (success) {
        setOpen1(false);
        setopenSnackSucess(true);
      } else {
        setopenSnackError(true);
      }
    }
  }, [taskCreate]);
  const handleChange = () => {
    setIspublic(!ispublic);
    console.log(ispublic);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const logoutHandler = () => {
    dispatch(logout());
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setopenSnackError(false);
    setopenSnackSucess(false);
  };

  return (
    <div
      style={{
        background: ` linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url(${background}) top left / cover no-repeat`,
        width: "100%",
        minHeight: "100vh",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <div>
          <Dialog
            open={open1}
            onClose={handleClose}
            scroll={"paper"}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth={"md"}
            fullWidth
          >
            <DialogTitle style={{ margin: "2%", padding: "0px 9px" }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="div">New Task</Typography>
                <CloseIcon
                  onClick={handleClose}
                  style={{ cursor: "pointer" }}
                />
              </Grid>
            </DialogTitle>
            <DialogContent style={{ overflow: "hidden" }}>
              <TextField
                variant="outlined"
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ m: 1 }}
              />
              <TextField
                label="Category"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{ m: 1 }}
              />
              <TextField
                label="Task"
                multiline
                fullWidth
                maxRows={8}
                value={content}
                sx={{ m: 1 }}
                onChange={(e) => setContent(e.target.value)}
              />
              <FormControlLabel
                label={
                  ispublic ? "Task Sharing : Public" : "Task Sharing : Private"
                }
                labelPlacement="start"
                control={
                  <IOSSwitch
                    checked={ispublic}
                    onChange={handleChange}
                    inputProps={{
                      "aria-label": "controlled",
                    }}
                    sx={{ m: 1 }}
                  />
                }
              />
              <Alert severity={ispublic ? "warning" : "info"}>
                {ispublic
                  ? "Notes can be seen and edited by other users"
                  : "Notes are private to you and you can make changes to them"}
              </Alert>
            </DialogContent>

            <DialogActions>
              <Button variant="contained" color="error" onClick={resetHandler}>
                Reset fields
              </Button>
              <Button variant="contained" onClick={submitHandler}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <CssBaseline />
        <Snackbar
          open={openSnackSucess}
          autoHideDuration={4000}
          onClose={handleCloseSnack}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleCloseSnack} severity="success">
            Task Created Successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openSnackError}
          autoHideDuration={4000}
          onClose={handleCloseSnack}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleCloseSnack} severity="error">
            {error}
          </Alert>
        </Snackbar>
        <AppBar open={open}>
          <Toolbar>
            <IconButton
              size="large"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Task Manager
            </Typography>
            <Button
              onClick={handleClickOpen}
              color="inherit"
              startIcon={<AddIcon />}
            >
              New Task
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          // variant="persistent"
          anchor="left"
          onClose={() => setOpen(false)}
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem
              disablePadding
              onClick={() => {
                setTab(0);
                setOpen(false);
              }}
              style={
                tab == 0
                  ? {
                      backgroundColor: "rgb(25,118,210)",
                      borderTopRightRadius: "24px",
                      borderBottomRightRadius: "24px",
                      color: "white",
                    }
                  : {}
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <NoteAltIcon style={tab == 0 ? { color: "white" } : {}} />
                </ListItemIcon>
                <ListItemText primary={"My Notes"} />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              onClick={() => {
                setTab(1);
                setOpen(false);
              }}
              style={
                tab == 1
                  ? {
                      backgroundColor: "rgb(25,118,210)",
                      borderTopRightRadius: "24px",
                      borderBottomRightRadius: "24px",
                      color: "white",
                    }
                  : {}
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <ExploreIcon style={tab == 1 ? { color: "white" } : {}} />
                </ListItemIcon>
                <ListItemText primary={"Explore"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem
              disablePadding
              onClick={() => {
                setTab(2);
                setOpen(false);
              }}
              style={
                tab == 2
                  ? {
                      backgroundColor: "rgb(25,118,210)",
                      borderTopRightRadius: "24px",
                      borderBottomRightRadius: "24px",
                      color: "white",
                    }
                  : {}
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleIcon
                    style={tab == 2 ? { color: "white" } : {}}
                  />
                </ListItemIcon>
                <ListItemText primary={"My Profile"} />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              onClick={() => {
                setTab(4);
                setOpen(false);
              }}
              style={
                tab == 4
                  ? {
                      backgroundColor: "rgb(25,118,210)",
                      borderTopRightRadius: "24px",
                      borderBottomRightRadius: "24px",
                      color: "white",
                    }
                  : {}
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <InfoIcon style={tab == 4 ? { color: "white" } : {}} />
                </ListItemIcon>
                <ListItemText primary={"About"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem
              disablePadding
              onClick={() => {
                setTab(3);
                logoutHandler();
              }}
              style={
                tab == 3
                  ? {
                      backgroundColor: "rgb(25,118,210)",
                      borderTopRightRadius: "24px",
                      borderBottomRightRadius: "24px",
                      color: "white",
                    }
                  : {}
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon style={tab == 3 ? { color: "white" } : {}} />
                </ListItemIcon>
                <ListItemText primary={"Log Out"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <DrawerHeader />
      </Box>
      <div>
        {tab == 0 ? (
          <Mynotes />
        ) : tab == 1 ? (
          <Explore />
        ) : tab == 2 ? (
          <Myprofile />
        ) : tab == 4 ? (
          <About />
        ) : null}
      </div>
    </div>
  );
}
