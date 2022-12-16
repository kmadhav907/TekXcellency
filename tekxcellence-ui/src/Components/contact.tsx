import ContactPic from "../components/images/bloco_final_image.svg";
import React, { useEffect, useState } from "react";
import { Pagination } from "./pagination";
import validator from "validator";

import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Rating, Typography, Paper } from "@mui/material";
import { text } from "stream/consumers";
import { tokenToString } from "typescript";

export const Contact = () => {
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [name, setName] = useState('')
  // const[review,setReview] = useState([]);
  const [review, setReview] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(3)
  const [value, setValue] = React.useState<number | null>(3);



  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    let token = localStorage.getItem("token") as string;
    const contact = { "email": email, "name": name, "feedback": feedback, "rating": value }
    console.log(contact)
    fetch("http://localhost:8083/feedback-add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(contact)
    }).then(() => {
      console.log("New data added successfully")
    })
    
  }



  const validateEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    var email = e.target.value

    if (validator.isEmail(email)) {
      setEmailError('Valid Email')
    } else {
      setEmailError('Enter valid Email!')
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  }

  const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber)

  //pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;


  return (
    <section className="contact" id="feedback">
      <div className="contatWrapper">
        <div className="leftContact">
          <div className="infosContact">
            <h2>Share your feedback with us</h2>
            <div className="btnContact">
              {/* <input type="text" placeholder="Enter your feedback"/> */}
              <p>Your Feedback is important for us.It will help us grow and imporve.So share your feedback with us!!</p>
              <Button variant="outlined" onClick={handleClickOpen}>Share</Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter details</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To share your feedback please enter your details below:
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="feedback"
                    label="Feedback"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={feedback}
                    onChange={(e) => { setFeedback(e.target.value) }}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={email}
                    // onChange={(e) => {setEmail(e.target.value)}}
                    onChange={e => { setEmail(e.target.value); validateEmail(e) }}
                  />

                  <span style={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}>{emailError}</span>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                  />
                  <Typography component="legend">Give a star rating</Typography>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(_event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClick}>Share</Button> 
               
                </DialogActions>
              </Dialog>

              
              
             
              {/* <Dialog open={open}>
                <DialogTitle>
                  The data is fetched from database
                </DialogTitle>
                <DialogContent>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Feedback</th>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {review.map((rev, index) => {
                        return <>
                          <tr>
                            <td>{rev.id}</td>
                            <td>{rev.email}</td>
                            <td>{rev.feedback}</td>
                            <td>{rev.name}</td>
                          </tr></>
                      })}
                    </tbody>
                  </table>
                  <Pagination postsPerPage={postsPerPage}
                    totalPosts={review.length}
                    paginate={paginate}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                </DialogActions>
              </Dialog> */}
            </div>
          </div>
        </div>

        <div className="rigthContact">
          <img src={ContactPic} alt="" />
        </div>



      </div>
    </section>
  );
};

function componentDidMount() {
  throw new Error("Function not implemented.");
}

