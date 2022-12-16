import React, { Component } from "react";

import {Link} from "react-router-dom"
import { Dialog , DialogContent, DialogActions, Snackbar, Alert, Slide} from '@mui/material';

import Navbar from "../../components/navbar";
// import LoginImage from "./images/loginScreen.jpg";
import LoginImage from "./images/login3.png";

import { employeeSignUp, sendForgotPasswordMail } from "../../services/user-service";
import { checkEmail } from "../../utils";
import { TransitionProps } from "@mui/material/transitions";

interface LoginState {
  loading: boolean;
  userEmail: string;
  password: string;
  showResetPasswordModal: boolean;
  forgetPasswordEmail: string;
  showPassword: boolean;
  showSuccessAlert: boolean;
  showFailureAlert: boolean;
  alertMessage: string;
}

class LoginPage extends Component<{}, LoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      userEmail: "",
      password: "",
      showResetPasswordModal: false,
      forgetPasswordEmail: "",
      showPassword: true,
      showSuccessAlert: false,
      alertMessage:"",
      showFailureAlert: false,
    };
  }
 
  handleSubmit = (event:any)=> {
    event.preventDefault();
    if(!checkEmail(this.state.userEmail)){
      alert("Add Proper email");
      return
    }
    employeeSignUp(this.state.userEmail, this.state.password).then((response)=> {
      if(response.status === "success"){
        // console.log(response);
        // alert("Success!");
        localStorage.setItem("email", response.message);
        window.location.href = "/dashboard";
      }
    }).catch(error => alert(error.message));
  }
  sendResetPasswordMail = (event:any)=> {
    event.preventDefault();
    this.setState({showResetPasswordModal : false});
    sendForgotPasswordMail(this.state.forgetPasswordEmail).then((response:any)=> {
      console.log(response);
      this.setState({showSuccessAlert : true, alertMessage:"Email has been sent"})

    }).catch((error)=> {
      console.log(error);
      this.setState({showFailureAlert : true, alertMessage:error.message});
    })
  }
  render(): React.ReactNode {
    return (
      <div className="loginMainDiv" 
      // style={{background:`url(${LoginImage})`, backgroundSize:"cover", backgroundRepeat:"no-repeat"}}
   
      >
            <Snackbar open={this.state.showSuccessAlert} autoHideDuration={6000} onClose={()=> this.setState({showSuccessAlert: false})}>
          <Alert onClose={()=> this.setState({showSuccessAlert: false})} severity="success" sx={{ width: '100%' }}>
            {this.state.alertMessage}
          </Alert>
        </Snackbar>
        <Snackbar open={this.state.showFailureAlert} autoHideDuration={6000} onClose={()=> this.setState({showFailureAlert: false})}>
          <Alert onClose={()=> this.setState({showFailureAlert: false})} severity="warning" sx={{ width: '100%' }}>
            {this.state.alertMessage}
          </Alert>
        </Snackbar>
        <Navbar/>
        {/* <Navbar />
        {this.state.loading && <Loader />} */}
        {this.state.showResetPasswordModal && (
          <ShowResetPasswordModal
            openConditon={this.state.showResetPasswordModal}
            onCloseCallback={() => {
              this.setState({ showResetPasswordModal: false });
            }}
            onSendEmail={this.sendResetPasswordMail}
            onChangeForgetPasswordEmail={(event) =>
              this.setState({
                forgetPasswordEmail: event.target.value,
              })
            }
          />
        )}
        
        <div className="loginLeftDiv"   
        //  style={{backgroundImage:`url(${LoginImage})`,backgroundSize:"cover",backgroundRepeat:"no-repeat"}} 
        >
          <img
            src={LoginImage}
            className="backgroundImg"
            alt="error loading"
          />
        
          {/* <div className="contentDiv">
     
          </div> */}
    
        </div>
        <div className="loginRightDiv">
          <form onSubmit={this.handleSubmit} className="loginBox">
            <div className="signInText">Employee Sign In</div>
            <div className="emailIDBox">Username</div>
            <input
              type="text"
              className="inputBox"
              placeholder="Enter your Email"
              onChange={(event: any) =>
                this.setState({ userEmail: event.target.value })
              }
            />
            <div className="passwordBox">Password</div>
          
            <input
              type="password"
              placeholder="Enter Password"
              className="passwordInput inputBox"
              onChange={(event: any) =>
                this.setState({ password: event.target.value })
              }
            />
           
            <div className="forgotPaswordBox">
              <div className="forgotPaswordText">Forgot password?</div>
              <div
                className="clickHere"
                onClick={() => this.setState({ showResetPasswordModal: true })}
              >
                Click here
              </div>
        
            </div>
            <Link to="/register" className="clickHere" style={{textDecoration:"none"}}>New here?</Link>
            <input className="signInButton"  type="submit"  value="Submit">
           
            </input>
          </form>
        </div>
      </div>
    );
  }
}

interface ShowResetPasswordModalProps {
  openConditon: boolean;
  onCloseCallback: () => void;
  onChangeForgetPasswordEmail: (event: any) => void;
  onSendEmail: (event:any) => void;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ShowResetPasswordModal = (props: ShowResetPasswordModalProps) => {
  return (
    <Dialog open={props.openConditon} onClose={props.onCloseCallback}   scroll='paper'
    maxWidth='xl' TransitionComponent={Transition}
    keepMounted PaperProps={{
      style:{borderRadius:15}
    }}>
      <DialogContent style={{height:"250px"}}>
        <div className="didYouForgetText">Did you forget the password?</div>
        <div className="enterYourText">Enter your Email to reset</div>
        <input
              type="text"
              className="inputBox"
              placeholder="Enter your Email"
              onChange={props.onChangeForgetPasswordEmail}
            />
        <div className="enterYourTextDesc">
          You'll receive the mail to the above email address. Follow the instructions to reset your password
        </div>
      </DialogContent>
      <DialogActions>
      <div className="resetPasswordButton" onClick={props.onSendEmail}>Send Email</div>
      <div className="resetPasswordButton" onClick={props.onCloseCallback}>Cancel</div>
      </DialogActions>
    
    </Dialog>
  );
};

export default LoginPage;