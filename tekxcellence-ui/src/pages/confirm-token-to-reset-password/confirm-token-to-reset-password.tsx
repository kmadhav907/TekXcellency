import { Alert, Box, Snackbar } from '@mui/material';
import React from 'react'
import { validateToken } from '../../services/user-service';
import '../../styles/confirm-token-to-reset-password.css';
import forgetImage from "./images-for-password/forget2.jpg";
import PasswordIcon from '@mui/icons-material/Password';
import LockIcon from '@mui/icons-material/Lock';

interface ConfirmTokenToResetPasswordState {
    tokenToBeAuthenticated: string;
    alertMessage: string;
    showSuccessAlert: boolean;
    showFailureAlert: boolean;
    fetching: boolean;

}
class ConfirmTokenToResetPassword extends React.Component <{}, ConfirmTokenToResetPasswordState>{
    constructor(props:any){
        super(props);
        this.state = {
            tokenToBeAuthenticated: window.location.href.split("/").pop() as string,
            alertMessage:"",
            showSuccessAlert:false,
            showFailureAlert:false,
            fetching: false,
        }
    }
    componentDidMount(): void {
        validateToken(this.state.tokenToBeAuthenticated).then((response:any)=> {
            this.setState({showSuccessAlert: true, alertMessage:"You can reset your password"})
            
        }).catch((error:any)=> {
            this.setState({showFailureAlert: true, alertMessage:"Something went wrong"})
        })
    }

    render(): React.ReactNode {
        return <>
  {/* <head><script src="https://kit.fontawesome.com/a076d05399.js" ></script>
</head>          
  <div className="container">
	<div className="screen">
		<div className="screen__content">
			<form className="login">
				<div className="login__field">
          <LockIcon />
				<input type="password" className="login__input" placeholder="Password" />
				</div>
				<div className="login__field">
          <LockIcon />
					<input type="password" className="login__input" placeholder="Confirm Password" />
				</div>
				<button className="button login__submit">
					<span className="button__text">Submit</span>
				</button>				
			</form>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>

          */}

<div className="container-reset-password">
  <div className="left-reset-password">
    <div className="header-reset-password">
      <h1>Reset Password</h1>
      <br></br>
      <h2 >Welcome !!</h2>
      <h4 >Please enter your new Password:</h4>
    </div>
    <div className="form">
      <input type="password" className="form-field" placeholder="Password" />
      <input type="password" className="form-field" placeholder="Confirm Password" />
      <button>SUBMIT</button>
    </div>
  </div>
  <div className="right-reset-password" style={{background:`url(${forgetImage})`, backgroundSize:"cover", backgroundRepeat:"no-repeat"}}></div>
</div>

              <Snackbar
                open={this.state.showSuccessAlert}
                autoHideDuration={6000}
                onClose={() => this.setState({ showSuccessAlert: false })}
              >
                <Alert
                  onClose={() => this.setState({ showSuccessAlert: false })}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  {this.state.alertMessage}
                </Alert>
              </Snackbar>
        </>
    }
}
export default ConfirmTokenToResetPassword;