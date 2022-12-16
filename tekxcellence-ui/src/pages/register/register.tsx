import { getAllDesigations } from '../../services/designation-service';
import { getAllPractises } from '../../services/practics-service';
import Navbar from '../../components/navbar';
import React, { Component } from "react";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import LoginImage from "./images/reg1.png";
import {employeeRegistration} from "../../services/register-service";
import "../../styles/register.css";
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface RegisterState {
    loading: boolean;
    firstname: string;
    gender:string;
    phonenumber: string;
    email:string;
    username:string;
    password:string;
    showResetPasswordModal: boolean;
    forgetPasswordEmail: string;
    showPassword: boolean;
    firstnameerror:string;
    errors:{ firstnameerror?: string;
      passworderror?:string;
      phonenumbererror?:string;
      usernameerror?:string;
      emailerror?:string;
      gendererror?:string
    }
  }
  class RegisterScreen extends Component<{}, RegisterState> {
    constructor(props:any) {
      super(props);
      this.state = {
        loading: false,
       firstname:"",
        gender:"",
       phonenumber:"",
       email:"",
      username:"",
       password:"",
       showResetPasswordModal: false,
        forgetPasswordEmail: "",
        showPassword: true,
        firstnameerror:"",
       errors:{ firstnameerror: "",
          passworderror:"",
          phonenumbererror:"",
          usernameerror:"",
          emailerror:"",
          gendererror:""
        }
    
        
      };
      this.changefirstname=this.changefirstname.bind(this);
      this.changephonenumber=this.changephonenumber.bind(this);
      this.changeemailhandler=this.changeemailhandler.bind(this);
      this.changepasswordhandler=this.changepasswordhandler.bind(this);
      this.changegenderhandler=this.changegenderhandler.bind(this);
      this.changeusernamehandler=this.changeusernamehandler.bind(this);
      this.saveemployee=this.saveemployee.bind(this);
  
    }
    formValidation=()=>{
        const {firstname,gender,phonenumber,email,username,password,errors}=this.state;
        let isValid=true;
        // type errors = {
        //   firstnameerror?: string;
        //   passworderror?:string
        // };
        // const obj:errors={};
        if(firstname.trim().length<3){
          errors.firstnameerror="Firstname is too short !";
          isValid=false;
        }
        if (!firstname) {    
          isValid = false;    
          errors.firstnameerror= "Name is required !";    
      } 
        if (gender === '' || gender === "select") {    
          isValid = false;    
          errors.gendererror = "Select gender !";    
      } 
    
        if(password.trim().length<8){
          errors.passworderror="Password must be greater than 8 !";
          isValid=false;
        }
        if (!password) {    
          isValid = false;    
          errors.passworderror= "Password is required !";    
      } 
    
        if(phonenumber.trim().length<10){
          errors.phonenumbererror="Incorrect Phonenumber !";
          isValid=false;
        } else {    
          var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;    
          if (!mobPattern.test(phonenumber)) {    
              isValid = false;    
              errors.phonenumbererror = "Invalid phone number !";    
          }    
      }  
      if (!phonenumber) {    
        isValid = false;    
        errors.phonenumbererror= "Phonenumber is required !";    
    } 
      if (!email) {    
        isValid = false;    
        errors.emailerror = "Email id is required !";    
    }    
    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {    
    
      isValid = false;    
        errors.emailerror = "Invalid email id !";    
    } 
    
        if(!username.includes("@")){
          errors.usernameerror="Username must include @ !";
          isValid=false;
        }
        if (!username) {    
          isValid = false;    
          errors.usernameerror= "UserName is required !";    
      } 
        this.setState({errors});
        return isValid;     
      }
      saveemployee=(event: any)=>{
        event.preventDefault();
        const isValid=this.formValidation();
        if(isValid){
          const employee={firstname:this.state.firstname,gender:this.state.gender,phonenumber:this.state.phonenumber,email:this.state.email,username:this.state.username,password:this.state.password};
          console.log('employee=>'+JSON.stringify(employee));
          employeeRegistration(this.state.firstname,this.state.gender,this.state.phonenumber,this.state.email,this.state.username, this.state.password).then((response:any)=> {
              console.log(response);
              alert("Registration Success");
              window.location.href = "/login"
          });
        }
        
      }
      changefirstname=(event: { target: { value: any; }; })=>{
        this.setState({firstname:event.target.value})
      }
    
      changegenderhandler=(event: { target: { value: any; }; })=>{
        this.setState({gender:event.target.value})
      }
    
      changephonenumber=(event: { target: { value: any; }; })=>{
        this.setState({phonenumber:event.target.value})
      }
    
      changeemailhandler=(event: { target: { value: any; }; })=>{
        this.setState({email:event.target.value})
      }
    
      changeusernamehandler=(event:{target:{value:any;};})=>{
        this.setState({username:event.target.value})
      }
      changepasswordhandler=(event: { target: { value: any; }; })=>{
        this.setState({password:event.target.value})
      }
    
     
    
      render(): React.ReactNode {
       
        return (
          <div className="loginRegisterDiv">
            <Navbar/>
            {/* <Navbar />
            {this.state.loading && <Loader />} */}
           
            <div className="RegisterLeftDiv">
              <img
                src={LoginImage}
                className="backgroundImgRegister"
                alt="error loading"
              />
              <div className="contentDivRegister">
         
              </div>
        
            </div>
            <div className="RegisterRightDiv">
              <form method='post' onSubmit={this.saveemployee}
              className="RegisterBox">
                <div className="signUpText">Employee Sign Up</div>
                <div className="emailIDBox">FirstName</div>
                <input
                  type="text"
                  className="inputBox"
                  placeholder="Enter your Firstname"
                  value={this.state.firstname}
                 onChange={this.changefirstname}
             
                 
                />
                <p className="showError">{this.state.errors.firstnameerror}</p>
                 <div className="emailIDBox">
                  <h4>Gender</h4>
                  <input type="radio" name="gender" value="male" onChange={this.changegenderhandler} />Male
                  
                  <input type="radio" name="gender" value="female" onChange={this.changegenderhandler} />Female
                   {/* <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  ></RadioGroup>
                  <FormControlLabel value="female"name="gender" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" name="gender" control={<Radio />}   label="Male" /> */}
                 </div>
                 <p className="showError">{this.state.errors.gendererror}</p>
                <div className="emailIDBox">Phonenumber</div>
                <input
                  type="text"
                  className="inputBox"
                  placeholder="Enter your Phonenumber"
                  value={this.state.phonenumber}
                  onChange={this.changephonenumber}
                  
                  
                />
                <p className="showError">{this.state.errors.phonenumbererror}</p>
               
                
                <div className="emailIDBox">Email</div>
                <input
                  type="type"
                  className="inputBox"
                  placeholder="Enter your Email"
                  value={this.state.email}
                  onChange={this.changeemailhandler}
                  
                  
                />
                <p className="showError">{this.state.errors.emailerror}</p>
                <div className="emailIDBox">Username</div>
                <input
                  type="text"
                  className="inputBox"
                  placeholder="Enter your Email"
                  value={this.state.username}
                  onChange={this.changeusernamehandler}
                  
                  
                />
                <p className="showError">{this.state.errors.usernameerror}</p>
                <div className="passwordBox">Password</div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
                <input
                  type={this.state.showPassword === true ? 'password' : "text"}
                  placeholder="Enter Password"
                  className="passwordInput inputBox"
                  value={this.state.password}
                  onChange={this.changepasswordhandler}
                  
                 
                />
                
                <div className="passwordSeenIcon">
                {!this.state.showPassword && (
                        <VisibilityOutlinedIcon
                         style={{ width: "85%"}}
                          onClick={() => this.setState({ showPassword: true })}
                        />
                      )}
                      {this.state.showPassword && (
                        <VisibilityOffOutlinedIcon
                          style={{ width:"85%"}}
                          onClick={() => this.setState({ showPassword: false })}
                        />
                      )}
                </div>
                
                </div>
                <p className="showError">{this.state.errors.passworderror}</p>
               
                
                
                <input className="signInButton"  type="submit"  value="Submit">
               
                </input>
                
                {/* {Object.keys(this.state.errors).map((key)=>{
                    return <div key={key}>{(this.state.errors as any)[key]}</div>
                })} */}
              </form>
            </div>
          </div>
        );
      }
    }
    
    
    
    export default RegisterScreen;    

// class RegisterPage extends React.Component<{}, {}>{
//     componentDidMount(): void {
//         getAllDesigations().then((response:any)=> {
//             // console.log(response);
//         })
//         getAllPractises().then((response:any)=> {
//             // console.log(response);
//         })
//     }
//     render():React.ReactNode{
//         return <>
//         <Navbar/></>
//     }
// }
// export default RegisterPage;
