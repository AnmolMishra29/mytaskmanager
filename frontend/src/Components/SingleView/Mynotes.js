import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  CardActionArea,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  Slide,
  Switch,
  TextField,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  listtask,
  deletetaskAction,
  updatetaskAction,
} from "../../actions/taskAction";
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const colors = [
  "#1BAAA0",
  "#7DDDF5",
  "#FBC396",
  "#FFBB2F",
  "#FFD275",
  "#FC91AD",
  "#3FBF595",
  "#7FBBDF",
  "#8DD7F2",
];

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 16,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  cardheader: {
    width: "250px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "inline-block",
    textOverflow: "ellipsis",
  },
}));

const Mynotes = React.memo(function Mynotes() {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.taskList);
  const { TASK } = taskList;
  const classes = useStyles();
  console.log(TASK);
  const [open, setOpen] = useState(false);
  const [modalObj, setModalObj] = useState(null);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [taskstatus, setTaskstatus] = React.useState(false);
  const [tempTitle, setTempTitle] = useState("");
  const [tempContent, setTempContent] = useState("");
  const [tempCategory, setTempCategory] = useState("");
  useEffect(() => {
    dispatch(listtask());
  }, []);

  const handleClick = (taskObj) => {
    setModalObj(taskObj);
    setTaskstatus(taskObj?.task_status);
    setTempTitle(taskObj?.title);
    setTempContent(taskObj?.content);
    setTempCategory(taskObj?.category);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = () => {
    setTaskstatus(!taskstatus);
  };
  const resetHandler = (taskObj) => {
    setTaskstatus(taskObj?.task_status);
    setTempTitle(taskObj?.title);
    setTempContent(taskObj?.content);
    setTempCategory(taskObj?.category);
  };
  const submitHandler = (taskObj) => {
    const id = taskObj?._id;
    dispatch(
      updatetaskAction(id, tempTitle, tempCategory, tempContent, taskstatus)
    );
    setOpen(false);
  };
  const handledelete = (id) => {
    dispatch(deletetaskAction(id));
  };
  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          maxWidth={"md"}
          fullWidth
        >
          <DialogTitle style={{ margin: "2%", padding: "0px 9px" }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="div">Edit Task</Typography>
              <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
            </Grid>
          </DialogTitle>
          <DialogContent style={{ overflow: "hidden" }}>
            <TextField
              variant="outlined"
              label="Title"
              fullWidth
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              sx={{ m: 1 }}
            />
            <TextField
              label="Category"
              fullWidth
              value={tempCategory}
              onChange={(e) => setTempCategory(e.target.value)}
              sx={{ m: 1 }}
            />
            <TextField
              label="Task"
              multiline
              fullWidth
              maxRows={8}
              value={tempContent}
              sx={{ m: 1 }}
              onChange={(e) => setTempContent(e.target.value)}
            />
            <FormControlLabel
              label={
                taskstatus
                  ? "Task Status : Completed"
                  : "Task Sharing : In Progress"
              }
              labelPlacement="start"
              control={
                <IOSSwitch
                  checked={taskstatus}
                  onChange={handleChange}
                  inputProps={{
                    "aria-label": "controlled",
                  }}
                  sx={{ m: 1 }}
                />
              }
            />
            <Alert severity={taskstatus ? "success" : "info"}>
              {taskstatus
                ? "This task will be marked as completed"
                : "Looks like you are still working on it."}
            </Alert>
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => resetHandler(modalObj)}
            >
              Reset changes
            </Button>
            <Button variant="contained" onClick={() => submitHandler(modalObj)}>
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Grid
        container
        alignItems="stretch"
        direction="row"
        spacing={2}
        justifyContent={"space-around"}
      >
        {TASK != undefined ? (
          TASK.map((taskObj, idx) => (
            <Grid item key={idx}>
              <Card
                className={classes.card}
                sx={{ width: 270 }}
                style={
                  taskObj?.task_status
                    ? {
                        backgroundColor: colors[idx % 9],
                        textDecoration: "line-through",
                      }
                    : { backgroundColor: colors[idx % 9] }
                }
              >
                <CardActionArea>
                  <CardHeader
                    title={taskObj?.title}
                    className={classes.cardheader}
                    style={
                      taskObj?.task_status
                        ? {
                            textDecoration: "line-through",
                          }
                        : {}
                    }
                  />
                  <CardContent onClick={() => handleClick(taskObj)}>
                    <Typography
                      variant="body2"
                      component="div"
                      style={{ wordWrap: "break-word" }}
                    >
                      Category : {taskObj?.category}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="div"
                      style={{ wordWrap: "break-word" }}
                    >
                      Task:
                    </Typography>
                    {(taskObj?.content).split("\n").map((line, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        component="div"
                        style={{
                          wordWrap: "break-word",
                        }}
                      >
                        {line}
                      </Typography>
                    ))}
                  </CardContent>
                  <CardActions style={{ justifyContent: "right" }}>
                    <Button
                      onClick={() => handleClick(taskObj)}
                      startIcon={<EditIcon style={{ color: "black" }} />}
                    ></Button>
                    <Button
                      onClick={() => handledelete(taskObj?._id)}
                      startIcon={<DeleteIcon style={{ color: "black" }} />}
                    ></Button>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </>
  );
});

export default Mynotes;
