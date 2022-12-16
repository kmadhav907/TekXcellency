import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from "./images/logo.png";

interface navbarPageState{
  userChoice:string;
  loadingData:boolean;
  userDetails:string;
}

class Navbar extends React.Component<{}, navbarPageState>{

    constructor(props:any) {
      super(props);
      this.state = {
        userChoice:"",
        loadingData:false,
        userDetails:"",
      };

    }

    isUserLoggedIn = localStorage.getItem("email") == null ? false : true;
    // isProfilePath = localStorage.getItem("profilePath") === "true";
    url = window.location.href.split("/").pop() as string;
    switchStatement = ()=> {
      switch (this.url) {
        case "profile":
          //  return <Link to="/profile">PROFILE </Link>
          return [<Link to="/managerApproval">Manager Approval</Link>, 
          <Link to="/admin-dashboard">Admin Dashboard</Link>,
          <Link to="/award/spot">Awards</Link>, 
          <Link to="/dashboard">Dashboard</Link>
          ]

        case "managerApproval":
          return [<Link to="/admin-dashboard">Admin Dashboard</Link>,
           <Link to="/profile">Profile</Link>,
          <Link to="/award/spot">Awards</Link>, 
          <Link to="/dashboard">Dashboard</Link>]
        case "admin-dashboard":
          return [<Link to="/managerApproval">Manager Approval</Link>,
           <Link to="/profile">Profile</Link>,
          <Link to="/award/spot">Awards</Link>, 
          <Link to="/dashboard">Dashboard</Link>]
        case "dashboard":
          return [
            <Link to="/managerApproval">Manager Approval</Link>
            , <Link to="/profile">Profile</Link>
            , <Link to="/award/spot">Awards</Link>,
            <Link to="/admin-dashboard">Admin Dashboard</Link>

          ]
        case "/spot/award":
          return[
            <Link to="/managerApproval">Manager Approval</Link>
            , <Link to="/profile">Profile</Link>
            , <Link to="admin-dashboard">Admin Dashboard</Link>
            ,<Link to="/dashboard">Dashboard</Link>

          ]
        default:
          return [
            <Link to="/managerApproval">Manager Approval</Link>
            , <Link to="/profile">Profile</Link>
            , <Link to="/award/spot">Awards</Link>
            , <Link to="/dashboard">Dashboard</Link>,
            <Link to="admin-dashboard">Admin Dashboard</Link>
          ]
      }
    }

    render(): React.ReactNode {
        return <div className="nav">
        <input type="checkbox" id="nav-check"/>
        <div className="nav-header">
          <Link className="nav-title" to="/dashboard">
            <img src={logoImage} alt="logo" /> 

                      </Link>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        
        <div className="nav-links">
          <>
            {this.isUserLoggedIn === false
              ? <>
                  <Link to="/register">Register</Link>
                  <Link to="/login" >Login</Link>
                </>
              :
                <>
                     
          {this.switchStatement()}
                
                   
       
                </>
              }
          </>
        </div>
      </div>
    }
}
export default Navbar