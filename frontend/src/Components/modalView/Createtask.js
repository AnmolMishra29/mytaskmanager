import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createtaskAction } from "../../actions/taskAction";
import { styled } from "@mui/material/styles";
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
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [category, setCategory] = React.useState("");
  const history = useNavigate();
  const dispatch = useDispatch();
  const [taskstatus, setTaskstatus] = React.useState(false);
  const [ispublic, setIspublic] = React.useState(false);
  const taskCreate = useSelector((state) => state.taskCreate);
  const { loading, error, success } = taskCreate;
  console.log("task", loading, success);
  console.log("taskcreate", taskCreate);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createtaskAction(title, content, category, taskstatus));

    console.log(error);
    if (!title || !content || !category) return;

    resetHandler();
    history("/mynotes");
  };
  const handleChange = () => {
    setIspublic(!ispublic);
    console.log(ispublic);
  };
  const handleClose3 = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button onClick={handleClickOpen("paper")}>CreateTask</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth={"md"}
        fullWidth
      >
        <DialogTitle style={{ margin: "2%", padding: "0px 9px" }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="div">Note Task</Typography>
            <CloseIcon onClick={handleClose3} style={{ cursor: "pointer" }} />
          </Grid>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <TextField
            placeholder="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            placeholder="category"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            placeholder="Task"
            multiline
            fullWidth
            maxRows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <FormControlLabel
            label="Public"
            control={
              <IOSSwitch
                checked={ispublic}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
                sx={{ m: 1 }}
              />
            }
          />
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={resetHandler}>
            Reset fields
          </Button>
          <Button variant="contained" onClick={submitHandler}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
