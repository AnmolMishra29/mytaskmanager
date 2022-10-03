import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
	Alert,
	Avatar,
	Badge,
	Button,
	FormControl,
	Input,
	InputLabel,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import LoadingButton from "@mui/lab/LoadingButton";

function Myprofile() {
	const userInfo = JSON.parse(localStorage.getItem("userInfo"));
	const [profile, setProfile] = useState(userInfo);
	const [openDelete, setOpenDelete] = React.useState(false);
	const [confirmDelete, setConfirmDelete] = useState("");
	const [edit, setEdit] = useState(false);
	const [newName, setNewName] = useState(userInfo?.name);
	const [newEmail, setNewEmail] = useState(userInfo?.email);
	const [new_profile_pic, setNew_profile_pic] = useState(
		userInfo?.profile_pic
	);
	const [snack, setSnack] = useState(false);
	const [picloading, setPicLoading] = useState(false);

	const handleClickOpenDelete = () => {
		setOpenDelete(true);
	};

	const handleCloseDelete = () => {
		setOpenDelete(false);
	};

	const handleUpdate = () => {
		//  send newname,newemail,new_profile_pic to update function and update userinfo in local storage
	};
	const handleDiscard = () => {
		setNewEmail(profile?.email);
		setNewName(profile?.name);
		setNew_profile_pic(profile?.profile_pic);
		setEdit(false);
	};
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setSnack(false);
	};
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
					setNew_profile_pic(data.url.toString());
					setSnack(true);
					setPicLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setPicLoading(false);
				});
		}
	};
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				marginTop: "1%",
			}}
		>
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
			<Paper elevation={3} style={{ width: "86vw" }}>
				<Typography sx={{ p: 1 }} variant="h4" align="center">
					My Profile
				</Typography>
				<div
					style={{
						padding: "1rem",
						display: " flex",
						flexWrap: "wrap",
						justifyContent: "center",
					}}
				>
					<div>
						<Badge
							overlap="circular"
							color="error"
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}
							badgeContent={
								edit ? (
									<Button
										startIcon={<EditIcon />}
										style={{ color: "white" }}
										component="label"
									>
										Edit
										<input
											type="file"
											accept="image/*"
											hidden
											onChange={(e) =>
												postDetails(e.target.files[0])
											}
										/>
									</Button>
								) : null
							}
						>
							<Avatar
								alt="Profile Photo"
								src={new_profile_pic}
								sx={{ width: 100, height: 100 }}
								style={{ height: "18rem", width: "18rem" }}
							/>
						</Badge>
					</div>
					{/* <form style={{ width: "100%" }}> */}
					{/* <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                disabled={!edit}
                type="text"
                value={edit ? newName : profile?.name}
                onChange={(e) => setNewName(e.target.value)}
                style={{ height: "3rem" }}
              />
            </Form.Group>
          </Form> */}
					<FormControl fullWidth variant="outlined">
						{/* <InputLabel htmlFor="my-input">Name</InputLabel> */}
						<TextField
							variant="outlined"
							id="my-input"
							label="Name"
							aria-describedby="my-helper-text"
							readOnly={!edit}
							type="text"
							value={edit ? newName : profile?.name}
							onChange={(e) => setNewName(e.target.value)}
							className="form-control"
							style={{ height: "3rem" }}
							sx={{ m: 1.5 }}
						/>
						<TextField
							variant="outlined"
							id="my-input"
							label="Email"
							aria-describedby="my-helper-text"
							readOnly={!edit}
							type="text"
							value={edit ? newEmail : profile?.email}
							onChange={(e) => setNewEmail(e.target.value)}
							className="form-control"
							style={{ height: "3rem" }}
							sx={{ m: 1.5 }}
						/>
					</FormControl>
					{/* <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                readOnly={!edit}
                type="text"
                value={edit ? newName : profile?.name}
                onChange={(e) => setNewName(e.target.value)}
                className="form-control"
                style={{ height: "3rem" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Email
              </label>
              <input
                readOnly={!edit}
                type="text"
                className="form-control"
                value={edit ? newEmail : profile?.email}
                onChange={(e) => setNewEmail(e.target.value)}
                style={{ height: "3rem" }}
              />
            </div>
          </form> */}
					<div style={{ width: "100%", textAlign: "right" }}>
						{edit ? (
							<>
								<LoadingButton
									loading={picloading}
									startIcon={<DoneIcon />}
									variant="contained"
									sx={{ m: 1.5 }}
								>
									Save Changes
								</LoadingButton>
								<Button
									startIcon={<CloseIcon />}
									variant="contained"
									color="error"
									onClick={handleDiscard}
									sx={{ m: 1.5 }}
								>
									Discard Changes
								</Button>
							</>
						) : (
							<>
								<Button
									startIcon={<EditIcon />}
									variant="contained"
									onClick={() => setEdit(true)}
									sx={{ m: 1.5 }}
								>
									Edit Profile
								</Button>
								<Button
									startIcon={<DeleteIcon />}
									variant="contained"
									color="error"
									onClick={handleClickOpenDelete}
									sx={{ m: 1.5 }}
								>
									Delete Profile
								</Button>
							</>
						)}
					</div>
					<Dialog
						open={openDelete}
						onClose={handleCloseDelete}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
							Are you sure you want to delete your account ?
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								Type <b>{profile?.email}</b> to confirm account
								deletion
								<input
									type="text"
									className="form-control"
									value={confirmDelete}
									onChange={(e) =>
										setConfirmDelete(e.target.value)
									}
									style={{ height: "3rem" }}
								/>
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={handleCloseDelete}
								variant="contained"
								color="primary"
							>
								Cancel
							</Button>
							<Button
								onClick={handleCloseDelete}
								autoFocus
								variant="contained"
								color="error"
								disabled={!(confirmDelete == profile?.email)}
							>
								Delete Account
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</Paper>
		</div>
	);
}

export default Myprofile;
