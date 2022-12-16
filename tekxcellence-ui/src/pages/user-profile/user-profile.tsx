import React, { Component } from 'react';
// import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { Alert, CardMedia, Snackbar } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { getProfileDetails, updateProfileDetails, uploadImageFile } from '../../services/user-service';

interface UserProfileState {
  loading: boolean;
  fileUrl: string;
  firstName: string;
  gender: string;
  phoneNumber: string;
  emailId: string;
  practice: string;
  designation: string;
  professionalSkills : Array<String>;
  personalSkills : Array<String>;
  showAlertDialog: boolean;
  enableUpdate: boolean;
}

interface UserProfileProps {
}

export default class UserProfile extends Component<UserProfileProps, UserProfileState> {
  constructor(props: UserProfileProps) {
    super(props);
    this.state = {
      loading: false,
      fileUrl: "",
      designation:"",
      firstName:"",
      gender:"",
      phoneNumber:"",
      emailId:"",
      practice:"",
      professionalSkills: ["Java", "SpringBoot" ,"React", "Jenkins"],
      personalSkills : ["Photography", "Writing"],
      showAlertDialog: false,
      enableUpdate: false
    };
  }

  async componentDidMount() {
    const userObject = localStorage.getItem("email");
    this.setState({loading: true});
    try {
      if (userObject == null) {
        window.location.href = "/login";
        return;
      }
      else {
        // console.log(userObject);
        this.getProfileDetails(userObject);
      }
    } catch (error) {
        alert("Something went wrong");
    }
  }

  getProfileDetails = (userEmail:string)=> {
    getProfileDetails(userEmail).then((response:any)=> {
      // console.log(response);
      if(response.status === "success") {
        let firstName = response.data.name;
        let designation = response.data.designation;
        let practise = response.data.practise;
        let phoneNumber = response.data.phoneNumber;
        let emailId = response.data.email;
        let gender = response.data.gender;
        let profilePicUrl = response.data.profilePicUrl || "https://res.cloudinary.com/date5n64u/image/upload/v1669709085/Logo_zxkmsz.png"
        this.setState({loading: false, designation:designation, practice: practise, firstName: firstName, phoneNumber: phoneNumber, emailId : emailId, gender:gender, fileUrl: profilePicUrl }, ()=> {
        })
      }
    }).catch(error => {
      throw error;
    });
  }

  handleFileChange = (event:any)=> {
    let file = event.target.files[0];
    // console.log(file);
    if(file != null){
    this.setState({fileUrl: URL.createObjectURL(file)})
    let empId =JSON.parse(localStorage.getItem('userObject')!).id;
    let data = new FormData();
    data.append("file", file);
    data.append("empId", empId);
    uploadImageFile(data).then((response:any)=> {
      console.log(response);
    });
  }
}

  handleInputChange = (event: any) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
    this.setState({ enableUpdate:true });
  };

  uploadProfilePic = (event: any) => {
    let file = document.getElementById("upload-profile-pic-input");
    if (file != null) {
      file.click();
    }
  };

  updateProfile = (event:any)=> {
    event.preventDefault();
    this.setState({ enableUpdate:false });
    let name = this.state.firstName;
    let gender = this.state.gender;
  if(!(gender === "MALE"  || gender ==="FEMALE")) {
    alert("Specify a gender");
    return;
    }
    let phoneNumber = this.state.phoneNumber;
    let id = JSON.parse(localStorage.getItem("userObject")!).id;
    updateProfileDetails(id, phoneNumber, name, gender).then((response) => {
      if(response.status === "success"){
        this.setState({showAlertDialog: true})
      }
    }).catch(error => {
      alert(error.message);
    });
  }

  render() {
    return (
      <div>
        <Snackbar open={this.state.showAlertDialog} autoHideDuration={6000} onClose={()=> this.setState({showAlertDialog: false})}>
          <Alert onClose={()=> this.setState({showAlertDialog: false})} severity="success" sx={{ width: '100%' }}>
            Profile Updated Successfully
          </Alert>
        </Snackbar>
        <Navbar />
        <Sidebar />
        <div className="profileContainer">
          <div className="left1">
            <div className="profilePic">
                <CardMedia image={this.state.fileUrl}></CardMedia>
              
                  <input    type="file"
                style={{ display: "none" }}
                accept="image/jpeg, image/jpg, image/png"  id="upload-profile-pic-input" onChange={this.handleFileChange}></input>
                <AddPhotoAlternateIcon style={{position:"absolute", bottom:"0", right: "0px", fontSize:"30px", color:"#f8951e", cursor: "pointer"}} onClick={this.uploadProfilePic}>

                </AddPhotoAlternateIcon>
              </div>
              <div className="empInfoLeft">
                <div><strong>Name : {this.state.firstName}</strong></div>
                <div><strong>Designation : {this.state.designation}</strong></div>
              </div>
              <div className='rewardPointsContainer'>
                <div>
                  Total Reward Points <span className="rewardPoints">{"200"}</span>
                </div>
                <div>
                Total Awards Won <span className="awardsWon">{"3"}</span>
                </div>
              </div>
            </div>
          <div className="right1">
            <div className="rightHeader"><strong>Account Settings</strong></div>
            
            <div className="rightForm">
             
                <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={this.updateProfile}
                  >
                    <TextField
                      id="outlined-required"
                      label="Name"
                      value={this.state.firstName}
                      name="firstName"
                      className="inputBtn1"
                      size="small"
                      fullWidth
                      onChange={this.handleInputChange}
                      style={{width:"90%", marginTop:"15px"}}
                      InputProps={{
                      style: {fontSize:"14px", lineHeight:"20px", fontWeight:"bold", fontFamily:"Comfortaa"}}
                      }
                      InputLabelProps = {{
                       style: {fontSize:"14px", lineHeight: "16px", fontWeight:"400", fontFamily:"Comfortaa"
                      }
                      }}
                    />
                    <TextField
                    disabled
                      id="outlined-required"
                      label="Email ID"
                      className="inputBtn1"
                      size="small"
                      name="emailId"
                      value={this.state.emailId}
                      onChange={this.handleInputChange}
                      fullWidth
                      style={{width:"90%", marginTop:"15px"}}
                      InputProps={{
                      style: {fontSize:"14px", lineHeight:"20px", fontWeight:"bold", fontFamily:"Comfortaa"}}
                      }
                      InputLabelProps = {{
                       style: {fontSize:"14px", lineHeight: "16px", fontWeight:"400", fontFamily:"Comfortaa"
                      }
                      }}
                    />
                    <TextField
                      id="outlined-required"
                      label="Phone Number"
                      className="inputBtn1"
                      size="small"
                      name="phoneNumber"
                      value={this.state.phoneNumber}
                      fullWidth
                      onChange={this.handleInputChange}
                      style={{width:"90%", marginTop:"15px"}}
                      InputProps={{
                      style: {fontSize:"14px", lineHeight:"20px", fontWeight:"bold", fontFamily:"Comfortaa"}}
                      }
                      InputLabelProps = {{
                       style: {fontSize:"14px", lineHeight: "16px", fontWeight:"400", fontFamily:"Comfortaa"
                      }
                      }}
                    />
                    <TextField
                      id="outlined-required"
                      label="Gender"
                      className="inputBtn1"
                      size="small"
                      name="gender"
                      value={this.state.gender}
                      onChange={this.handleInputChange}
                      fullWidth
                      style={{width:"90%", marginTop:"15px"}}
                      InputProps={{
                      style: {fontSize:"14px", lineHeight:"20px", fontWeight:"bold", fontFamily:"Comfortaa"}}
                      }
                      InputLabelProps = {{
                       style: {fontSize:"14px", lineHeight: "16px", fontWeight:"400", fontFamily:"Comfortaa"
                      }
                      }}
                    />
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Practice"
                      className="inputBtn1"
                      size="small"
                      value={this.state.practice}
                      onChange={this.handleInputChange}
                      fullWidth
                      name="practice"
                      style={{width:"90%", marginTop:"15px"}}
                      InputProps={{
                      style: {fontSize:"14px", lineHeight:"20px", fontWeight:"bold", fontFamily:"Comfortaa"}}
                      }
                      InputLabelProps = {{
                       style: {fontSize:"14px", lineHeight: "16px", fontWeight:"400", fontFamily:"Comfortaa"
                      }
                      }}
                    />
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Designation"
                      size="small"
                      value={this.state.designation}
                      className="inputBtn1"
                      name="designation"
                      fullWidth
                      onChange={this.handleInputChange}
                      style={{width:"90%", marginTop:"15px"}}
                      InputProps={{
                      style: {fontSize:"14px", lineHeight:"20px", fontWeight:"bold", fontFamily:"Comfortaa"}}
                      }
                      InputLabelProps = {{
                       style: {fontSize:"14px", lineHeight: "16px", fontWeight:"400", fontFamily:"Comfortaa"
                      }
                      }}
                    />
                    {/* <div className='professionalSkillsDiv'>
                      Professional Skills :
                    </div> */}
                    <TextField
                      id="outlined-disabled"
                      label="Professional Skill 1"
                      size="small"
                      value={this.state.professionalSkills[0]}
                      className="inputBtn1"
                      name="proSkill1"
                      fullWidth
                      onChange={this.handleInputChange}
                      style={{width:"90%", marginTop:"15px"}}
                      InputProps={{
                      style: {fontSize:"14px", lineHeight:"20px", fontWeight:"bold", fontFamily:"Comfortaa"}}
                      }
                      InputLabelProps = {{
                       style: {fontSize:"14px", lineHeight: "16px", fontWeight:"400", fontFamily:"Comfortaa"
                      }
                      }}
                    />
                    <TextField
                      id="outlined-disabled"
                      label="Professional Skill 2"
                      size="small"
                      value={this.state.professionalSkills[1]}
                      className="inputBtn1"
                      name="proSkill2"
                      fullWidth
                      onChange={this.handleInputChange}
                      style={{width:"90%", marginTop:"15px"}}
                      InputProps={{
                      style: {fontSize:"14px", lineHeight:"20px", fontWeight:"bold", fontFamily:"Comfortaa"}}
                      }
                      InputLabelProps = {{
                       style: {fontSize:"14px", lineHeight: "16px", fontWeight:"400", fontFamily:"Comfortaa"
                      }
                      }}
                    />
                    <TextField
                      id="outlined-disabled"
                      label="Professional Skill 3"
                      size="small"
                      value={this.state.professionalSkills[2]}
                      className="inputBtn1"
                      name="proSkill3"
                      fullWidth
                      onChange={this.handleInputChange}
                      style={{width:"90%", marginTop:"15px"}}
                      InputProps={{
                      style: {fontSize:"14px", lineHeight:"20px", fontWeight:"bold", fontFamily:"Comfortaa"}}
                      }
                      InputLabelProps = {{
                       style: {fontSize:"14px", lineHeight: "16px", fontWeight:"400", fontFamily:"Comfortaa"
                      }
                      }}
                    />
                    <TextField
                      id="outlined-disabled"
                      label="Professional Skill 4"
                      size="small"
                      value={this.state.professionalSkills[3]}
                      className="inputBtn1"
                      name="proSkill4"
                      fullWidth
                      onChange={this.handleInputChange}
                      style={{width:"90%", marginTop:"15px"}}
                      InputProps={{
                      style: {fontSize:"14px", lineHeight:"20px", fontWeight:"bold", fontFamily:"Comfortaa"}}
                      }
                      InputLabelProps = {{
                       style: {fontSize:"14px", lineHeight: "16px", fontWeight:"400", fontFamily:"Comfortaa"
                      }
                      }}
                    />
                    <TextField
                      id="outlined-disabled"
                      label="Personal Hobby 1"
                      size="small"
                      value={this.state.personalSkills[0]}
                      className="inputBtn1"
                      name="hobby1"
                      fullWidth
                      onChange={this.handleInputChange}
                      style={{width:"90%", marginTop:"15px"}}
                      InputProps={{
                      style: {fontSize:"14px", lineHeight:"20px", fontWeight:"bold", fontFamily:"Comfortaa"}}
                      }
                      InputLabelProps = {{
                       style: {fontSize:"14px", lineHeight: "16px", fontWeight:"400", fontFamily:"Comfortaa"
                      }
                      }}
                    />
                    <TextField
                      id="outlined-disabled"
                      label="Personal Hobby 2"
                      size="small"
                      value={this.state.personalSkills[1]}
                      className="inputBtn1"
                      name="hobby2"
                      fullWidth
                      onChange={this.handleInputChange}
                      style={{width:"90%", marginTop:"15px"}}
                      InputProps={{
                      style: {fontSize:"14px", lineHeight:"20px", fontWeight:"bold", fontFamily:"Comfortaa"}}
                      }
                      InputLabelProps = {{
                       style: {fontSize:"14px", lineHeight: "16px", fontWeight:"400", fontFamily:"Comfortaa"
                      }
                      }}
                    />
                    <div className='UpdateProfileButtonContainer'>
                      <button type="submit" value="submit" className="updateBtn" disabled={!this.state.enableUpdate}>
                        Submit
                      </button>
                    </div>
                  </Box>
            </div>
         
          </div>
        </div>
      </div>
    )
  }
}
