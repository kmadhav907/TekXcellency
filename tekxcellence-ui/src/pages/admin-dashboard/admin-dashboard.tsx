import { Button, Dialog, DialogActions, DialogContent, Slide } from "@mui/material";
import React from "react";
import Tooltip from '@mui/material/Tooltip';

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ImageName from '../../components/images/emp2.jpg';
import Award from '../../components/images/s2.jpg';
import History from '../../components/images/history3.png';
import Mis from '../../components/images/misc2.jpg';
import Feedback from '../../components/images/f2.jpg';
import { TransitionProps } from "@mui/material/transitions";
//import { Tooltip } from "recharts";



interface AdminDashboardPageProps {}

interface AdminDashboardPageState {
    showUnauthorizedDialog: boolean;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class AdminDashboardPage extends React.Component<
  AdminDashboardPageProps,
  AdminDashboardPageState

> {
    constructor (props: AdminDashboardPageProps) {
        super(props);
        this.state = {
            showUnauthorizedDialog: false

        };
    }
    componentDidMount(): void {
        let userObject = localStorage.getItem('userObject'!);
        if(userObject == null){
            window.location.href = "/login";
            return;
        }
        let userDesignation = JSON.parse(userObject).designation;
        if(userDesignation !== "ADMIN")
            this.setState({showUnauthorizedDialog: true})
    }
   
  render() {
    return (
      <>
        <Navbar />
        <Dialog open={this.state.showUnauthorizedDialog} onClose={() => {}}
         TransitionComponent={Transition}
         keepMounted PaperProps={{
           style:{borderRadius:15,backgroundColor:"#c5e5eb"}
         }}>
            <DialogContent>
              You are not authorized to access this feature
            </DialogContent>
            <DialogActions>
              <Button onClick={() => (window.location.href = "/dashboard")}>
                Dashboard
              </Button>
            </DialogActions>
          </Dialog>
        <Sidebar />
      <>
        <div className="adminPageContainer">
          <div className="adminActionsContainer">
            <div className="adminActionCard" onClick={()=> window.location.href="/admin-dashboard/employee"} >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <Tooltip title='EMPLOYEE'>
                  <img  src={ImageName} height="90%" width="90%" />
                  {/* <div className="flip-card-title">Employee</div>    */}
                  </Tooltip>
                </div>
                <div className="flip-card-back"></div>
              </div>
            </div>
            <div className="adminActionCard" onClick={()=> window.location.href="/admin-dashboard/awards"}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <Tooltip title='AWARDS'>
                <img  src={Award} height="90%" width="90%" />
                  </Tooltip>
                  {/* <div className="flip-card-title">Awards</div> */}
                </div>
                <div className="flip-card-back"></div>
              </div>
            </div>
            {/* <div className="adminActionCard">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <Tooltip title='HISTORY'>
                <img  src={History} height="90%" width="90%" />
                  </Tooltip>
                </div>
                <div className="flip-card-back"></div>
              </div>
            </div> */}
            <div className="adminActionCard" onClick={()=> window.location.href="/admin-dashboard/misc"}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <Tooltip title='MISCELLANEOUS'>
                <img  src={Mis} height="90%" width="90%" />
                  </Tooltip>
                  {/* <div className="flip-card-title">Miscellaneous</div> */}
                </div>
                <div className="flip-card-back"></div>
              </div>
            </div>
            <div className="adminActionCard" onClick={()=> window.location.href="/admin-dashboard/feedback"}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <Tooltip title='FEEDBACK'>
                <img  src={Feedback} height="90%" width="90%" />
                  </Tooltip>
                  {/* <div className="flip-card-title">Feedback</div> */}

                </div>
                <div className="flip-card-back"></div>
              </div>
            </div>
          </div>
        </div> 
     </>
      </>
    );
  }
}
export default AdminDashboardPage;
