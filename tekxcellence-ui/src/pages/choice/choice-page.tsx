import { Edit } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Checkbox,
} from "@mui/material";
import React from "react";
import Loader from "../../components/loader";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { getAllDesigations } from "../../services/designation-service";
import {
  getAllEmployeeFromMaster,
  getManagerList,
  getManagerName,
  updateUserDetailsForAdmin,
} from "../../services/employee-list-service";
import { getWinnersAdmin, submitWinner } from "../../services/winner-service";
import { getAllPractises } from "../../services/practics-service";
import { getEmployeeDetails } from "../../services/user-service";
import { getAllFeedback } from "../../services/feedback-service";
import { columns } from "./constant";
import spotimg from '../images/spot_award.png';
import risingimg from '../images/rising_star.png';
import teamimg from '../images/best_team.png';
import { addAward, deleteAward, getAwards, updateAward } from "../../services/award-service";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface ChoicePageForAdminProps {}
interface ChoicePageForAdminState {
  adminChoice: string;
  loading: boolean;
  employeePerPage: number;
  totalEmployeeInTheDB: number;
  paginatedEmployeeItems: any[];
  currentPage: number;
  tableColumns: any[];
  employeeInfoDialog: boolean;
  selectedEmployeeDesignation: string | null;
  selectedEmployeeManager: string | null;
  selectedEmployeeEmail: string | null;
  selectedEmployeeName: string | null;
  selectedEmployeePractice: string | null;
  selectedEmployeeId: number | null;
  getEmployeeLoading: boolean;
  designationList: any[];
  practicesList: any[];
  managersList: any[];
  awardList : any[];
  awardName : string;
  awardBriefDescription : string;
  awardMainDescription : string;
  enableAwardSubmitButton : boolean;
  showAwardSuccessDialog : boolean;
  isEditAward : boolean;
  editedAwardObject : any;
  showAddAwardDialog : boolean;
  showEditAwardSuccessDialog : boolean;
  showMiscWinnersDialog : boolean;
  winnersObject : any;
  maxPointsList : any[];
  showMiscSuccessDialog : boolean;
  feedbackList: any[];
  feedbackPerPage: number;
  currentPageFeedback: number;
  totalNumberOfFeedback:number;
  showAlertSnackBar: boolean;
  showAwardDeletedDialog : boolean;
  miscCheckBoxValue : boolean;
  miscPointsObject : any;
  finalWinnersList : any[];
}


class ChoicePageForAdmin extends React.Component<
  ChoicePageForAdminProps,
  ChoicePageForAdminState
> {
  constructor(props: ChoicePageForAdminProps) {
    super(props);
    this.state = {
      adminChoice: "",
      loading: false,
      employeePerPage: 2,
      totalEmployeeInTheDB: 0,
      paginatedEmployeeItems: [],
      currentPage: 0,
      tableColumns: columns,
      employeeInfoDialog: false,
      getEmployeeLoading: false,
      selectedEmployeeDesignation: "",
      selectedEmployeeEmail: "",
      selectedEmployeeManager: "",
      selectedEmployeePractice: "",
      selectedEmployeeName: "",
      managersList: [],
      designationList: [],
      practicesList: [],
      selectedEmployeeId: null,
      showAlertSnackBar: false,
      awardList : [],
      awardName : "",
      awardBriefDescription : "",
      awardMainDescription : "",
      enableAwardSubmitButton : false,
      showAwardSuccessDialog : false,
      isEditAward : false,
      editedAwardObject : {},
      showAddAwardDialog : false,
      showEditAwardSuccessDialog : false,
      showMiscWinnersDialog : false,
      winnersObject : {},
      maxPointsList : [],
      showMiscSuccessDialog : false,
      feedbackList:[],
      feedbackPerPage:2,
      currentPageFeedback:0,
      totalNumberOfFeedback:0,
      // selectedEmployeeId: null,
      // showAlertSnackBar: false,
      showAwardDeletedDialog : false,
      miscCheckBoxValue : false,
      miscPointsObject : {},
      finalWinnersList : [],
    };
  }



  componentDidMount(): void {
    
    const url = window.location.href;
    this.setState(
      { loading: true, adminChoice: url.split("/").pop() as string },
      () => {
        // console.log(this.state.adminChoice);
        switch (this.state.adminChoice) {
          case "awards":
            this.getAwards();
            break;
          case "employee":
            this.getAllEmployeeFromDB(
              this.state.currentPage,
              this.state.employeePerPage
            );
            this.getManagerList();
            this.getAllDesignations();
            this.getAllPractices();
            break;
          case "misc":
            this.getWinnersAdmin();
            break;
          case "feedback":
            this.getAllFeedback(
              this.state.currentPageFeedback,
              this.state.feedbackPerPage,
              );
            break;
        }
      }
    );

    setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  }
  getAllFeedback = (currentPageFeedback:number,feedbackPerPage:number) => {
    getAllFeedback(currentPageFeedback,feedbackPerPage)
    .then((response:any)=> {
      console.log(response);
      this.setState({feedbackList : response.feedbackList, totalNumberOfFeedback: response.totalNumberOfFeedback}, ()=> {
        
        
         //console.log(this.state.feedbackList)
      })
    })
  };
  getAllPractices = () => {
    getAllPractises()
      .then((response: any) => {
        this.setState({ practicesList: response.data });
      })
      .catch((error) => console.log(error));
  };
  getAllAwards = () => {};
  getAllDesignations = () => {
    getAllDesigations()
      .then((response) => {
        this.setState({ designationList: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  getManagerList = () => {
    getManagerList()
      .then((response: any) => {
        // console.log(response);
        this.setState({ managersList: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getAllEmployeeFromDB = (currentPage: number, employeePerPage: number) => {
    getAllEmployeeFromMaster(currentPage, employeePerPage)
      .then((response: any) => {
        console.log(response);
        let totalNumberOfEmployees = response.totalNumberOfEmployees;
        let employeeData = [];
        for (let employee of response.employeeList) {
          let newEmployee: any = {};
          newEmployee.id = employee.employeeId;
          newEmployee.name = employee.employeeName;
          newEmployee.practiseName = employee.practiseName;
          newEmployee.employeeEmail = employee.employeeEmail;
          employeeData.push(employee);
        }
        this.setState(
          {
            paginatedEmployeeItems: employeeData,
            totalEmployeeInTheDB: totalNumberOfEmployees,
          },
          () => {
            // console.log(this.state.paginatedEmployeeItems);
          }
        );
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  componentDidUpdate(
    prevProps: Readonly<ChoicePageForAdminProps>,
    prevState: Readonly<ChoicePageForAdminState>,
    snapshot?: any
  ): void {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.employeePerPage !== this.state.employeePerPage
    ) {
      // console.log("called here")
      this.getAllEmployeeFromDB(
        this.state.currentPage,
        this.state.employeePerPage
      );
    }
    if(
      prevState.currentPageFeedback !== this.state.currentPageFeedback ||
      prevState.feedbackPerPage !== this.state.feedbackPerPage
    )
    {
      this.getAllFeedback(
        this.state.currentPageFeedback,
        this.state.feedbackPerPage
      );
    }
  }
  handleChangePage = (event: any, newPage: number) => {
    this.setState({ currentPage: newPage }, () => {});
  };
  handleRowsPerPageChange = (event: any) => {
    this.setState(
      { employeePerPage: event.target.value, currentPage: 0 },
      () => {}
    );
  };
  handleChangePageFeedback = (event: any, newPage: number) => {
    this.setState({ currentPageFeedback: newPage }, () => {});
  };
  handleRowsPerPageChangeFeedback = (event: any) => {
    this.setState(
      { feedbackPerPage: event.target.value, currentPageFeedback: 0 },
      () => {}
    );
  };
  getEmployeeDetail = (employeeEmail: string) => {
    this.setState({ getEmployeeLoading: true, employeeInfoDialog: true });
    getEmployeeDetails(employeeEmail)
      .then((response) => {
        const { data } = response;
        console.log(response);
        this.setState(
          {
            selectedEmployeeDesignation: data.designation,
            selectedEmployeeEmail: data.email,
            selectedEmployeePractice: data.practise,
            selectedEmployeeName: data.name,
            selectedEmployeeId: data.id,
          },
          () => {
            if (data.managerId != null) {
              getManagerName(data.managerId).then((response) => {
                this.setState({ selectedEmployeeManager: response.name });
              });
            }
          }
        );
      })
      .catch((error) => {
        console.log("error");
      });
    setTimeout(() => {
      this.setState({ getEmployeeLoading: false });
    }, 500);
  };
  // updateManager = (event: any) => {
  //   event.preventDefault();
  //   updateUserDetailsForAdmin(
  //     this.state.selectedEmployeeManager as string,
  //     this.state.selectedEmployeeId as number
  //   )
  //     .then(() => {
  //       this.setState({ showAlertSnackBar: true });
  //     })
  //     .catch((error) => {
  //       console.error("something went wrong", error);
  //     });
  // };

  // submitWinner = (event:any) => {
  //   const awardId = 1;
  //   submitWinner(awardId).then((response) => {
  //     if(response.status === "success"){
  //       this.setState({ showMiscWinnersDialog:false, showMiscSuccessDialog:true });
  //     }
  //     else{
  //       alert("ERROR! Winner Not Added.");
  //     }
  //   });
  // };

  submitWinner = (event:any) => {
    const awardId = 1;
    if(this.state.finalWinnersList.length>0){
      this.state.finalWinnersList.map((empObj:any)=>{

        let employeeName = Object.keys(empObj)[0];
        let pointsGained = Number(Object.values(empObj)[0]);
        submitWinner(awardId, employeeName, pointsGained ).then((response) => {
          if(response.status === "success"){
            this.setState({ showMiscWinnersDialog:false, showMiscSuccessDialog:true });
          }
          else{
            alert("ERROR! Winner Not Added.");
          }
        });
      });
    }
    else{
      alert("Please select atleast one winner!");
    }
  }

  getAwards = () => {
    getAwards().then((response) => {
      if(response.status === "success"){
        this.setState({ awardList : response.data });
      }
      else{
        alert(response.data);
      }
    });
  }

  editAward = (event:any, award:any) => {
    this.setState({
      isEditAward : true,
      showAddAwardDialog : true,
      awardName : award.awardName,
      awardBriefDescription : award.awardBriefDescription,
      awardMainDescription : award.awardMainDescription,
      editedAwardObject : award,
    }, () => {
      console.log("Edit Award Ovject (award)");
      console.log(award);
      console.log("Edited AO (EAO)");
      console.log(this.state.editedAwardObject);
    });
  }

  deleteAward = (event:any,awardId:number) => {
    if(window.confirm("Are you sure you want to delete AwardID : "+awardId+" ?")){
      deleteAward(awardId).then((response)=>{
        if(response.status === "success"){
          this.setState({ showAwardDeletedDialog:true });
        }
      });
    }
  }

  handleAwardInputChange = (event:any) => {
    this.setState({
      ...this.state,
      [event.target.name] : event.target.value,
    }, () => {
      if(this.state.isEditAward){
        this.setState({
          editedAwardObject : {
            awardID : this.state.editedAwardObject.awardID,
            awardName : this.state.awardName,
            awardBriefDescription : this.state.awardBriefDescription,
            awardMainDescription : this.state.awardMainDescription,
          }
        });
      }
    });
    this.setState({ enableAwardSubmitButton : true });
  }

  resetAwardFields = () => {
   this.setState({
    awardName : "",
    awardBriefDescription : "",
    awardMainDescription : "",
    isEditAward : false,
    enableAwardSubmitButton : false,
   }); 
  }

  addAward = (event:any) => {
    event.preventDefault();
    let awardName = this.state.awardName;
    let awardBriefDescription = this.state.awardBriefDescription;
    let awardMainDescription = this.state.awardMainDescription;

    addAward(awardName, awardBriefDescription, awardMainDescription).then((response) => {
      if(response.status === "success"){
        // alert("Success!");
        this.setState({
          enableAwardSubmitButton : false,
          awardName : "",
          awardBriefDescription : "",
          awardMainDescription : "",
        }, () => {
          this.setState({ showAddAwardDialog:false,showAwardSuccessDialog : true });
        });
      }
      else{
        alert("Failed!");
      }
    });
  }

  updateAward = (event:any) => {
    event.preventDefault(); 
    let awardID = this.state.editedAwardObject.awardID;
    let awardName = this.state.editedAwardObject.awardName;
    let awardBriefDescription = this.state.editedAwardObject.awardBriefDescription;
    let awardMainDescription = this.state.editedAwardObject.awardMainDescription;
    updateAward(awardID,awardName,awardBriefDescription,awardMainDescription).then((response) => {
      if(response.status === "success"){
        this.setState({ showEditAwardSuccessDialog : true, showAddAwardDialog:false });
      }
      else{
        alert("Failed!");
      }
    });
  }

  getWinnersAdmin = () => {
    let awardId = 1;
    getWinnersAdmin(awardId).then((response) => {
      if(response.status === "success"){
        this.setState(
          {
            winnersObject :  response.data
          });
        Object.keys(this.state.winnersObject).map((managerName:string,index:number)=>{
          Object.keys(this.state.winnersObject[managerName]).map((employeeName:string,empIndex:number)=>{
            if(employeeName === "max"){
              this.setState(prevState => ({
                maxPointsList : [...prevState.maxPointsList, Object.values(this.state.winnersObject[managerName])[empIndex]],
              }));
            }
            // if(employeeName !== "max" && (Object.values(this.state.winnersObject[managerName])[empIndex]) === maxPoints){
            //   this.setState({
            //     miscPointsObject : {
            //       ...this.state.miscPointsObject,
            //       [employeeName]: Object.values(this.state.winnersObject[managerName])[empIndex],
            //     }
            //   },()=>{
            //     console.log(this.state.miscPointsObject);
            //   });
            // }
          });
        });
      }
    });
  }

  handleMiscCheckBox = (event:any,employeeName:string,pointsGained:number) => {
    const {checked} = event.target;
    console.log(checked);
    if(checked === true){
      // this.setState({
      //   miscPointsObject : {
      //     ...this.state.miscPointsObject,
      //     [employeeName]:pointsGained
      //   }
      // },()=>{
      //   console.log(this.state.miscPointsObject);
      // });

      let miscPointsObject = {[employeeName]:pointsGained};
      this.setState({
        finalWinnersList : [...this.state.finalWinnersList, miscPointsObject]
      }, ()=>{
        console.log(this.state.finalWinnersList);
      });
    }
    else{
      // if(employeeName in this.state.miscPointsObject){
      //   const miscPointsObject = {...this.state.miscPointsObject};
      //   delete miscPointsObject[employeeName];
      //   this.setState({ miscPointsObject : miscPointsObject },()=>{console.log(this.state.miscPointsObject)});
      // }
      let finalWinnersListCopy = this.state.finalWinnersList;
      const finalWinnersList = finalWinnersListCopy.filter(obj=>{
        return Object.keys(obj)[0] !== employeeName;
      });
      this.setState({finalWinnersList:finalWinnersList},()=>{console.log(this.state.finalWinnersList)});
    }
  }

  updateManager = (event: any) => {
    event.preventDefault();
    updateUserDetailsForAdmin(
      this.state.selectedEmployeeManager as string,
      this.state.selectedEmployeeId as number
    )
      .then(() => {
        this.setState({ showAlertSnackBar: true });
      })
      .catch((error) => {
        console.error("something went wrong", error);
      });
  };
  render() {
    if (this.state.loading) {
      return <Loader />;
    } else {
      switch (this.state.adminChoice) {
        case "awards":
          return (
          <div>
            <Navbar/>
            <Sidebar/>
            <Snackbar open={this.state.showAwardSuccessDialog} autoHideDuration={6000} onClose={()=> this.setState({showAwardSuccessDialog: false}, ()=>{window.location.reload();})}>
              <Alert onClose={()=> this.setState({showAwardSuccessDialog: false}, ()=>{window.location.reload();})} severity="success" sx={{ width: '100%' }}>
                Award Added Successfully!
              </Alert>
            </Snackbar>
            <Snackbar open={this.state.showEditAwardSuccessDialog} autoHideDuration={6000} onClose={()=> this.setState({showEditAwardSuccessDialog: false}, ()=>{window.location.reload();})}>
              <Alert onClose={()=> this.setState({showEditAwardSuccessDialog: false}, ()=>{window.location.reload();})} severity="success" sx={{ width: '100%' }}>
                Award Updated Successfully!
              </Alert>
            </Snackbar>
            <Snackbar open={this.state.showAwardDeletedDialog} autoHideDuration={6000} onClose={()=> this.setState({showAwardDeletedDialog: false}, ()=>{window.location.reload();})}>
              <Alert onClose={()=> this.setState({showAwardDeletedDialog: false}, ()=>{window.location.reload();})} severity="success" sx={{ width: '100%' }}>
                Award Deleted Successfully!
              </Alert>
            </Snackbar>
            <Dialog open={this.state.showAddAwardDialog} onClose={() => {}}
              sx={{minHeight:"102%",paddingTop:"10px",overflow:"hidden",paddingBottom:"0px"}}>
              <DialogContent>
                  <div className="AdminAddAwardSection">
                    {
                      this.state.isEditAward === false
                      ? <div className="NewAwardHeader">
                          <h3>Add New Award</h3>
                        </div>
                      :
                        <div className="NewAwardHeader">
                          <h3>Edit An Award</h3>
                        </div>
                    }
                      
                      <div className="NewAwardFormContainer">
                        <form style={{ width: "100%" }} onSubmit={this.addAward}>
                          <TextField
                              id="outlined-required"
                              label="Award Name"
                              value={this.state.awardName}
                              name="awardName"
                              size="small"
                              fullWidth
                              required
                              onChange={this.handleAwardInputChange}
                              style={{width:"90%", marginTop:"15px"}}
                              InputProps={{
                              style: {fontSize:"15px", lineHeight:"20px", fontWeight:"bold", fontFamily:"Roboto"}}
                              }
                              InputLabelProps = {{
                              style: {fontSize:"14px", lineHeight: "16px", fontWeight:"400", fontFamily:"Comfortaa"
                              }
                              }}
                            />
                            <TextField
                              id="outlined-required"
                              label="Award Summary (Maximum Input Lines : 4)"
                              value={this.state.awardBriefDescription}
                              name="awardBriefDescription"
                              size="small"
                              fullWidth
                              multiline
                              rows={4}
                              maxRows={4}
                              required
                              onChange={this.handleAwardInputChange}
                              style={{width:"90%", marginTop:"15px"}}
                              InputProps={{
                              style: {fontSize:"15px", lineHeight:"20px", fontWeight:"bold", fontFamily:"Roboto", maxLines:5}}
                              }
                              InputLabelProps = {{
                              style: {fontSize:"14px", lineHeight: "16px", fontWeight:"400", fontFamily:"Comfortaa"
                              }
                              }}
                            />
                            <TextField
                              id="outlined-required"
                              label="Detailed Description (Maximum Input Lines : 7)"
                              value={this.state.awardMainDescription}
                              name="awardMainDescription"
                              size="small"
                              fullWidth
                              multiline
                              rows={7}
                              maxRows={7}
                              required
                              onChange={this.handleAwardInputChange}
                              style={{width:"90%", marginTop:"15px"}}
                              InputProps={{
                              style: {fontSize:"15px", lineHeight:"20px", fontWeight:"bold", fontFamily:"Roboto", maxLines:7}}
                              }
                              InputLabelProps = {{
                              style: {fontSize:"14px", lineHeight: "16px", fontWeight:"400", fontFamily:"Comfortaa"
                              }
                              }}
                            />
                            {
                              this.state.isEditAward === false
                              ?
                                <div className='NewAwardSubmitContainer'>
                                  <button type="submit" value="submit" className='NewAwardButton'
                                    disabled={!this.state.enableAwardSubmitButton}>
                                      Submit
                                  </button>
                                </div>
                              :
                                <div className='NewAwardSubmitContainer'>
                                  <button type="submit" value="submit" className='NewAwardButton'
                                      onClick={this.resetAwardFields}>
                                    Reset
                                  </button>
                                  | 
                                  <button type="submit" value="submit" className='NewAwardButton'
                                    disabled={!this.state.enableAwardSubmitButton} onClick={this.updateAward}>
                                    Update
                                  </button>
                                </div>
                            }
                        </form>
                      </div>
                   </div>
              </DialogContent>
              <DialogActions sx={{marginTop:"0px"}}>
                <Button onClick={() => (this.setState({ showAddAwardDialog : false }))}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            <div className="AdminAwardsContainer">
              <div className="AdminAwardsSection">
                <div className="AdminAwardsSectionHeader">
                  <h3>Awards in Database</h3>
                  <button onClick={(event:any) => {this.setState({ showAddAwardDialog : true })}}
                    className="NewAwardButton">
                      Add Award
                  </button>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ width:"100"}} aria-label="a dense table">
                      <TableHead>
                        <TableRow sx={{backgroundColor:"#F5F5F5"}}>
                          <TableCell sx={{textAlign:"center"}}>Award ID</TableCell>
                          <TableCell sx={{width:"20%"}}>Award Name</TableCell>
                          <TableCell>Award Summary</TableCell>
                          <TableCell>Detailed Description</TableCell>
                          <TableCell sx={{width:"10%",textAlign:"center"}}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          {this.state.awardList.map((award:any) => {
                            return(
                              <TableRow
                                key={award.awardID}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                              >
                                <TableCell component="th" scope="row" sx={{textAlign:"center"}}>
                                  {award.awardID}
                                </TableCell>
                                <TableCell>{award.awardName}</TableCell>
                                <TableCell><p className="AwardDesc">{award.awardBriefDescription}</p></TableCell>
                                <TableCell><p className="AwardDesc">{award.awardMainDescription}</p></TableCell>
                                <TableCell sx={{textAlign:"center",alignItems:"center"}}>
                                  <div className="AwardEditButtonContainer">
                                    <button className="AwardEditButton" onClick={event => this.editAward(event, award)}><EditIcon/></button>
                                    <button className="AwardEditButton AwardDeleteButton" onClick={event => this.deleteAward(event, award.awardID)}><DeleteIcon/></button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })
                          }
                      </TableBody>
                    </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        );
        case "employee":
          return (
            <>
              <Snackbar
                open={this.state.showAlertSnackBar}
                autoHideDuration={6000}
                onClose={() => this.setState({ showAlertSnackBar: false })}
              >
                <Alert
                  onClose={() => this.setState({ showAlertSnackBar: false })}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Updated Successfully!
                </Alert>
              </Snackbar>
              {this.state.employeeInfoDialog && (
                <Dialog
                  open={this.state.employeeInfoDialog}
                  onClose={() => this.setState({ employeeInfoDialog: false })}
                  scroll="paper"
                  maxWidth="lg"
                >
                  <DialogContent
                    style={{
                      width: "400px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    {this.state.getEmployeeLoading ? (
                      <CircularProgress />
                    ) : (
                      <form
                        style={{ width: "100%" }}
                        onSubmit={this.updateManager}
                      >
                        <label style={{ margin: "5px" }}>Name:</label>
                        <TextField
                          name="selectedEmployeeName"
                          margin="dense"
                          value={this.state.selectedEmployeeName}
                          variant="outlined"
                          aria-disabled
                          size="small"
                          fullWidth
                        />
                        <label style={{ margin: "5px" }}>Email:</label>
                        <TextField
                          name="selectedEmployeeEmail"
                          margin="dense"
                          value={this.state.selectedEmployeeEmail}
                          variant="outlined"
                          aria-disabled
                          size="small"
                          fullWidth
                        />
                        <FormControl fullWidth>
                          <label
                            style={{ margin: "5px" }}
                            id="demo-simple-select-label"
                          >
                            Manager
                          </label>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.selectedEmployeeManager}
                            fullWidth
                            margin="dense"
                            size="small"
                            onChange={(event: any) =>
                              this.setState({
                                selectedEmployeeManager: event.target.value,
                              })
                            }
                          >
                            {this.state.managersList!.map(
                              (manager: any, index: number) => {
                                return (
                                  <MenuItem
                                    value={manager.name}
                                    key={index}
                                    style={{ color: "black" }}
                                  >
                                    {manager.name}
                                  </MenuItem>
                                );
                              }
                            )}
                          </Select>
                        </FormControl>
                        <FormControl fullWidth>
                          <label
                            style={{ margin: "5px" }}
                            id="demo-simple-select-label"
                          >
                            Practice
                          </label>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            aria-disabled
                            value={this.state.selectedEmployeePractice}
                            fullWidth
                            margin="dense"
                            size="small"
                          >
                            {this.state.practicesList!.map(
                              (practise: any, index: number) => {
                                return (
                                  <MenuItem
                                    value={practise.practiseName}
                                    key={index}
                                    style={{ color: "black" }}
                                  >
                                    {practise.practiseName}
                                  </MenuItem>
                                );
                              }
                            )}
                          </Select>
                        </FormControl>
                        <FormControl fullWidth>
                          <label
                            style={{ margin: "5px" }}
                            id="demo-simple-select-label"
                          >
                            Designation
                          </label>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.selectedEmployeeDesignation}
                            fullWidth
                            margin="dense"
                            size="small"
                            aria-disabled
                            // onChange={(event:any)=> this.setState({selectedEmployeeManager: event.target.value})}
                          >
                            {this.state.designationList!.map(
                              (designation: any, index: number) => {
                                return (
                                  <MenuItem
                                    value={designation.designationName}
                                    key={index}
                                    style={{ color: "black" }}
                                  >
                                    {designation.designationName}
                                  </MenuItem>
                                );
                              }
                            )}
                          </Select>
                        </FormControl>
                      </form>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() =>
                        this.setState({ employeeInfoDialog: false })
                      }
                    >
                      Close
                    </Button>
                    <Button onClick={this.updateManager}>Update</Button>
                  </DialogActions>
                </Dialog>
              )}
              <Sidebar />
              <Navbar />
              <div className="choicePageAdminContainer">
                <div className="title">Employee Master</div>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {this.state.tableColumns.map((column) => (
                            <TableCell key={column.id} align={"left"}>
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.paginatedEmployeeItems.map(
                          (row: any, index: number) => {
                            return (
      
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={index}
                              >
                                <TableCell>{row.employeeId}</TableCell>
                                <TableCell>{row.employeeName}</TableCell>
                                <TableCell>{row.employeeEmail}</TableCell>
                                <TableCell>{row.practiseName}</TableCell>
                                <TableCell>
                                  <Edit
                                    style={{ color: "black", fontSize: "22px" }}
                                    onClick={() =>
                                      this.getEmployeeDetail(row.employeeEmail)
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          }
                        )}
                      </TableBody>
                      
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[2, 5]}
                    component="div"
                    count={this.state.totalEmployeeInTheDB}
                    rowsPerPage={this.state.employeePerPage}
                    page={this.state.currentPage}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleRowsPerPageChange}
                  />
                </Paper>
              </div>
            </>
          );


        case "misc":
          return(
            <>
              <Navbar/>
              <Sidebar/>
              <Snackbar open={this.state.showMiscSuccessDialog} autoHideDuration={6000} onClose={()=> this.setState({showMiscSuccessDialog: false})}>
                <Alert onClose={()=> this.setState({showMiscSuccessDialog: false})} severity="success" sx={{ width: '100%' }}>
                  Winners Submitted Successfully!
                </Alert>
              </Snackbar>
              <Dialog open={this.state.showMiscWinnersDialog} onClose={() => {}} fullScreen>
              <DialogContent sx={{textAlign:"center",marginBottom:"5px"}}>
                <div className="MiscWinnerHeader">
                  <h3>SPOT AWARDS - WINNERS</h3>
                </div>
                <TableContainer component={Paper} sx={{width:"100%"}}>
                  <Table sx={{ width:"100%"}} aria-label="a dense table">
                    <TableHead>
                      <TableRow sx={{backgroundColor:"#F5F5F5"}}>
                        <TableCell  sx={{textAlign:"center", maxWidth:"3%", fontSize:"1rem"}}>Sr. No.</TableCell>
                        <TableCell sx={{fontSize:"1rem",textAlign:"center"}}>Manager Name</TableCell>
                        <TableCell sx={{textAlign:"center", fontSize:"1rem"}}>Employees & Points</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        Object.keys(this.state.winnersObject).map((managerName:string, index:number) => {
                          return(
                            <TableRow key={index}>
                              <TableCell sx={{textAlign:"center"}}>{index+1}</TableCell>
                              <TableCell sx={{textAlign:"center"}}>{managerName}</TableCell>
                              <TableCell sx={{fontSize:"0.85rem"}}>
                                <div className="MiscEmployeesInTable">
                                  {
                                    Object.keys(this.state.winnersObject[managerName]).map((employeeName:string, empIndex:number) => {
                                      return(
                                        <div className="MiscEmployeeInTable" key={empIndex}>
                                          {
                                            employeeName.toString() !== "max" &&
                                            <>
                                              <div className="MiscEmployeeInTableName">
                                                {employeeName}
                                              </div>
                                              <div className="MiscEmployeeInTablePoints">
                                                <div>Final Points : {Number(Object.values(this.state.winnersObject[managerName])[empIndex])}</div>
                                                <div>
                                                  <Checkbox 
                                                  className="MiscCheckbox" 
                                                  name="MiscCheckBox"
                                                  id="MiscCheckBox"
                                                  // defaultChecked={Object.values(this.state.winnersObject[managerName])[empIndex] 
                                                  //   === this.state.maxPointsList[index]}
                                                  value=""
                                                  onChange={event => {this.handleMiscCheckBox(event,employeeName,Number(Object.values(this.state.winnersObject[managerName])[empIndex]))}}
                                                  />
                                                </div>
                                              </div>
                                            </>
                                          }
                                        </div>
                                      );
                                    })
                                  }
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* <TableContainer component={Paper}>
                      <Table sx={{ width:"100"}} aria-label="a dense table">
                        <TableHead>
                          <TableRow sx={{backgroundColor:"#F5F5F5"}}>
                            <TableCell sx={{textAlign:"center"}}>Team Sr. No.</TableCell>
                            <TableCell>Manger Name</TableCell>
                            <TableCell sx={{textAlign:"center"}}>Employee Points</TableCell>
                            <TableCell>Manager Name</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                              Object.keys(this.state.winnersObject).map((key:string,index:number) => {
                                return(
                                  <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                                  >
                                    <TableCell sx={{textAlign:"center"}}>{index+1}</TableCell>
                                    <TableCell>{Object.keys(this.state.winnersObject[key])}</TableCell>
                                    <TableCell sx={{textAlign:"center"}}>{Object.values(this.state.winnersObject[key])}</TableCell>
                                    <TableCell>{key}</TableCell>
                                  </TableRow>
                                );
                              })
                            }
                        </TableBody>
                      </Table>
                  </TableContainer> */}
              </DialogContent>
              <DialogActions>
                <Button onClick={this.submitWinner}>
                  Submit
                </Button>
                <Button onClick={() => (this.setState({ showMiscWinnersDialog : false }))}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
              <div className="MiscSubmitWinnerContainer">
                <div className="ActionLists">
                  <button className="ActionContent" onClick={()=>{this.setState({showMiscWinnersDialog:true})}}>
                    <div className="ActionImage">
                      <img src={spotimg} alt="" />
                    </div>
                    <div className="ActionDetails">
                      SUBMIT WINNER<br/>
                      (SPOT AWARDS)
                    </div>
                  </button>
                  <button className="ActionContent" disabled>
                    <div className="ActionImage">
                      <img src={risingimg} alt="" />
                    </div>
                    <div className="ActionDetails">
                      SUBMIT WINNER<br/>
                      (RISING STAR AWARDS)
                    </div>
                  </button>
                  <button className="ActionContent" disabled>
                    <div className="ActionImage">
                      <img src={teamimg} alt="" />
                    </div>
                    <div className="ActionDetails">
                      SUBMIT WINNER<br/>
                      (BEST TEAM AWARDS)
                    </div>
                  </button>
                </div>
              </div>
            </>
          );
          case "feedback":
            return (

              <>
              <h3 className="headerFeedback">FEEDBACK</h3>
              <Table className="feedbackTable">
                <TableHead>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Feedback</TableCell>
                  <TableCell>Rating</TableCell>
                </TableHead>
                <TableBody>
                        {this.state.feedbackList.map(
                          (row: any, index: number) => {
                            return (
      
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={index}
                              >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.feedback}</TableCell>
                                <TableCell>{row.rating}</TableCell>
                      
                              </TableRow>
                            );
                          }
                        )}
                      </TableBody>
              </Table>
              <TablePagination
                    // rowsPerPageOptions={[2, 5]}
                    rowsPerPage={5} 
                    component="div"
                    count={this.state.totalNumberOfFeedback} 
                    //rowsPerPage={this.state.feedbackPerPage}
                    page={this.state.currentPageFeedback}
                    onPageChange={this.handleChangePageFeedback}
                    onRowsPerPageChange={this.handleRowsPerPageChangeFeedback} 
                  />
              </>
              
            )
      }
    }
  }
}
export default ChoicePageForAdmin;
