import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Rating from "@mui/material/Rating";
import { getSkillsList } from "../../services/skill-service";
import Loader from "../../components/loader";
import { getEmployeesUnderAManager } from "../../services/user-service";
import { submitVote } from "../../services/vote-service";
import { TransitionProps } from "@mui/material/transitions";
// const employees = [{name: 'John doe', email:"jhon@gmail.com", profileImage:"https://picsum.photos/200", assosciation: "Designer"}, {name: 'John', email:"jhon@gmail.com", profileImage:"https://picsum.photos/200", assosciation:"Designer"},{name: 'Madhav', email:"jhon@gmail.com", profileImage:"https://picsum.photos/200", assosciation:"Designer"},{name: 'Jaideep', email:"jhon@gmail.com", profileImage:"https://picsum.photos/200", assosciation: "Designer"}, {name: 'Shreya', email:"jhon@gmail.com", profileImage:"https://picsum.photos/200", assosciation:"Designer"},{name: 'Sreekar', email:"jhon@gmail.com", profileImage:"https://picsum.photos/200", assosciation:"Designer"}]

interface VotePageState {
  typeOfAward: string;
  showHistroyVotingDialog: boolean;
  numberOfVotes: number;
  employeeList: any;
  showEmployeeVotingDialog: boolean;
  selectedEmployee: any;
  selectedRating: any[];
  successDialog: boolean;
  loading: boolean;
  showUnauthorizedDialog: boolean;
  feedback: string;
}
interface VotePageProps {}
class VotePage extends React.Component<VotePageProps, VotePageState> {
  constructor(props: VotePageProps) {
    super(props);
    this.state = {
      typeOfAward: "",
      showHistroyVotingDialog: false,
      numberOfVotes: 5,
      employeeList: [],
      showEmployeeVotingDialog: false,
      selectedEmployee: {},
      selectedRating: [],
      successDialog: false,
      loading: false,
      showUnauthorizedDialog: false,
      feedback:""
    };
  }


  componentDidMount(): void {
    this.setState({ loading: true });
    const url = new URLSearchParams(window.location.search);
    this.setState({ typeOfAward: url.get("award") as string });
    this.getSkillListFromBackend();
    let managerId = JSON.parse(localStorage.getItem("userObject")!).managerId;
    if (managerId == null) {
      this.setState({ showUnauthorizedDialog: true });
    } else {
      getEmployeesUnderAManager(managerId).then((response: any) => {
        this.setState({ employeeList: response.data });
      });
    }
    // getEmployeesUnderAManager()
    this.setState({ loading: false });
  }
     getSkillListFromBackend () {
      getSkillsList()
        .then((response: any) => {
          let array = response.data;
          let arrayToBeInserted = array.map((item: any, index: number) => {
            return { name: item.skillName, points: 0 };
          });
          this.setState({ selectedRating: arrayToBeInserted });
        })
        .catch((error) => console.log(error));
    }
  
  calculatePoints = ()=> {
   return parseFloat((this.state.selectedRating.reduce((previousItem, currentItem) => {
      return previousItem + currentItem.points
    }, 0)/this.state.selectedRating.length).toFixed(2));
  }
  submitVote = (event:any)=> {
    let userObject = JSON.parse(localStorage.getItem('userObject')!);
    if(this.state.selectedEmployee.employeeEmail === userObject.email){
      this.setState({})
      alert("You cant vote yourselves");
      return;
    }
 
    const pointsForTheEmployee = this.calculatePoints();
    const feedback = this.state.feedback;
    const votedById = userObject.id;
    const votedToid = this.state.selectedEmployee.id;
    submitVote(pointsForTheEmployee, feedback, votedById, votedToid).then((response)=> {
      if(response.message === "successfully voted") {
        this.setState({
          showEmployeeVotingDialog: false,
          successDialog: true,
        }, ()=> {
          this.getSkillListFromBackend();
        })
      }
    }).catch(error => {
      alert(error.message);
      this.setState({showEmployeeVotingDialog: false}, () => this.getSkillListFromBackend());
    });
  }


  render(): React.ReactNode {
    if (this.state.loading) {
      return (
        <>
          <Loader />
        </>
      );
    } else
      return (
        <>
          <Navbar />
          <Sidebar />
          <Dialog open={this.state.showUnauthorizedDialog} onClose={() => {}}
          
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

          <div className="UserListContainer">
            <div className="UserLists">
              {this.state.employeeList.map((employee: any, index: number) => {
                return (
                  <button
                    className="UserContent"
                    key={index}
                    disabled={this.state.numberOfVotes === 0}
                    onClick={() => {
                      this.setState({
                        selectedEmployee: employee,
                        showEmployeeVotingDialog: true,
                      });
                    }}
                  >
                    <img
                      src={"https://picsum.photos/200"}
                      className="UserImage"
                      alt="Profile"
                    />
                    <div className="UserDetails">
                      <div>{employee.employeeName}</div>
                      <div>{`${employee.employeeEmail}`}</div>
                      <div>{`${employee.designationName}`}</div>
                    </div>
                  </button>
                );
              })}
              <NumberOfVotesLeft
                numberOfVotes={this.state.numberOfVotes}
                openHistroyVoteFunction={() =>
                  this.setState({ showHistroyVotingDialog: true })
                }
              />

              <Dialog
                open={this.state.showHistroyVotingDialog}
                onClose={() =>
                  this.setState({ showHistroyVotingDialog: false })
                }
              >
                <DialogContent>Your Histroy Appears here</DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      this.setState({ showHistroyVotingDialog: false });
                    }}
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={this.state.showEmployeeVotingDialog}
                onClose={() =>
                  this.setState({ showEmployeeVotingDialog: false })
                }
                scroll="paper"
              >
                <DialogContent>
                  <>
                    Do you want to vote for {this.state.selectedEmployee.employeeName} ?
                    {this.state.selectedRating!.map(
                      (item: any, index: number) => {
                        // console.log(item);

                        return (
                          <div style={{ marginTop: "10px" }} key={index}>
                            <Typography component="legend">
                              {item["name"]}
                            </Typography>
                            <Rating
                              name="read-only"
                              value={item.points}
                              onChange={(event, selectedRating) => {
                                let ratings = this.state.selectedRating;
                                ratings[index].points = selectedRating;
                                this.setState({ selectedRating: ratings });
                              }}
                            ></Rating>
                          </div>
                        );
                      }
                    )}
                    <TextField
                      id="outlined-required"
                      label="Feedback"
                      className="inputBtn1"
                      size="small"
                      fullWidth
                      multiline
                      onChange={(event:any)=> {
                        this.setState({feedback: event.target.value});
                      }}
                      style={{ width: "100%", marginTop: "15px" }}
                      rows={3}
                      InputProps={{
                        style: {
                          fontSize: "14px",
                          lineHeight: "20px",
                          fontWeight: "bold",
                          fontFamily: "Comfortaa",
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          fontSize: "14px",
                          lineHeight: "16px",
                          fontWeight: "400",
                          fontFamily: "Comfortaa",
                        },
                      }}
                    />
                  </>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      this.setState({ showEmployeeVotingDialog: false });
                    }}
                  >
                    Close
                  </Button>
                  <Button
                  onClick={this.submitVote}
                    // onClick={(event:any) => {
                    //   this.setState({
                    //     // numberOfVotes: this.state.numberOfVotes - 1,
                    //     showEmployeeVotingDialog: false,
                    //     successDialog: true,
                    //   }, ()=> {
                    //     this.submitVote(event);
                    //   });
                    
                    // }}
                  >
                    Vote
                  </Button>
                </DialogActions>
              </Dialog>
              {/* <VoteDescription /> */}

              <Dialog
                open={this.state.successDialog}
                onClose={() => this.setState({ successDialog: false })}
                aria-labelledby="alert-dialog-title"
              >
                <DialogContent id="alert-dialog-title">
                
                  You have Successfully voted for your colleague's. You will get
                  to know the results soon!!
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      this.setState({ successDialog: false });
                    }}
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </>
      );
  }
}

interface NumberOfVotesLeftProps {
  numberOfVotes: number;
  openHistroyVoteFunction: () => void;
}
class NumberOfVotesLeft extends Component<NumberOfVotesLeftProps, {}> {
  render(): React.ReactNode {
    return (
      <>
        <>
          <Tooltip title="hello">
            <button
              className="numOfVotesCircle"
              onClick={() => this.props.openHistroyVoteFunction()}
            >
              {this.props.numberOfVotes}
            </button>
          </Tooltip>
        </>
      </>
    );
  }
}

export default VotePage;
