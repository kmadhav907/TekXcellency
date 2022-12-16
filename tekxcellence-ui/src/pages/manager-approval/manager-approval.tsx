import React, { Component } from 'react';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Select,
    MenuItem,
  } from "@mui/material";
import Loader from "../../components/loader";
import { getEmployeesUnderAManager } from "../../services/user-service";
import '../../styles/manager-approval.css';
import { TextChange } from 'typescript';
import { submitVote } from '../../services/vote-service';

interface ManagerApprovalState{
    employeeList: any;
    loading: boolean;
    showUnauthorizedDialog: boolean;
    showSuccessDialog : boolean;
    preferenceObj: any;
    managerPreferenceList: any;
    stateKeyList : any;
    stateValueList : any;
    enableSubmit: boolean;
    pointsObject : any;
}

interface ManagerApprovalProps{}

export default class ManagerApproval extends Component<ManagerApprovalProps, ManagerApprovalState> {

    constructor(props: ManagerApprovalProps) {
        super(props);
        this.state = {
            employeeList: [],
            loading: false,
            showUnauthorizedDialog: false,
            showSuccessDialog: false,
            preferenceObj: {},
            managerPreferenceList: [],
            stateKeyList: [],
            stateValueList: [],
            enableSubmit: false,
            pointsObject: {1:4,2:3,3:2,4:1,5:5}
        };
    }

    componentDidMount(): void {
        this.setState({ loading:true });
        let id = JSON.parse(localStorage.getItem("userObject")!).id;
        let designation = JSON.parse(localStorage.getItem("userObject")!).designation;
        if(designation !== "TECHNICAL SERVICE MANAGER"){
            this.setState({ showUnauthorizedDialog:true });
        }
        else{
            getEmployeesUnderAManager(id).then((response : any) => {
                this.setState({ employeeList: response.data });
                console.log("Employee List successful!");
            });
        }
    }

    handleSelect = (event: any) => {
        const tempEmpId = (event.target.name);
        const managerPreference = (event.target.value);

        if(this.state.stateKeyList.includes(tempEmpId) || this.state.stateValueList.includes(managerPreference)){
            alert('Duplicate Preference Detected! Please provide distinct preferences to each employee.');
        }
        else{
            this.setState({
                preferenceObj : {
                    ...this.state.preferenceObj,
                    [tempEmpId]:managerPreference,
                },
                stateKeyList : [...this.state.stateKeyList, tempEmpId],
                stateValueList : [...this.state.stateValueList, managerPreference]
            }, () => {
                console.log(this.state.preferenceObj);
                if(Object.keys(this.state.preferenceObj).length === this.state.employeeList.length){
                    this.setState({
                        managerPreferenceList : [...this.state.managerPreferenceList, this.state.preferenceObj],
                        enableSubmit : true
                    }, () => {
                        console.log(this.state.managerPreferenceList);
                        this.calculatePoints();
                    })
                }
            });
        }
    }

    calculatePoints = () => {
        let pointsKeyList = Object.keys(this.state.pointsObject);
        let preferenceObjCopy = this.state.preferenceObj;

        this.state.stateKeyList.map((employeeId:any) => {
            if((preferenceObjCopy[employeeId]) in pointsKeyList){
                preferenceObjCopy[employeeId] = this.state.pointsObject[preferenceObjCopy[employeeId]];
                console.log(preferenceObjCopy);
            }
        });

        this.setState({
            preferenceObj : preferenceObjCopy
        }, () => {
            console.log(this.state.preferenceObj);
        })
    }

    submitPreference = (event:any) => {
        let currentManagerId = JSON.parse(localStorage.getItem("userObject")!).id;
        this.state.stateKeyList.map((employeeId: any) => {
            const votedToId = parseInt(employeeId);
            const votedById = currentManagerId;
            const feedback = "Manager's Preference.";
            const pointsForTheEmployee = this.state.managerPreferenceList[0][votedToId];
            submitVote(pointsForTheEmployee, feedback, votedById, votedToId).then((response) => {
                if(response.message === "successfully voted"){
                    this.setState({ showSuccessDialog : true });
                }
            }).catch(error => {
                alert(error.message);
              });
        });
    }

    render() {
    return (
        <div>
            <Navbar/>
            <Sidebar/>
            <Dialog open={this.state.showUnauthorizedDialog} onClose={() => {}}
             PaperProps={{
                style:{borderRadius:15,backgroundColor:"#c5e5eb"}
              }}>
                <DialogContent>
                    You are not authorized to access this feature.
                </DialogContent>
                <DialogActions>
                <Button onClick={() => (window.location.href = "/dashboard")}>
                    Dashboard
                </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={this.state.showSuccessDialog} onClose={() => {}}>
                <DialogContent>
                    Congratulations! <br/><br/>
                    You have successfully provided your preferences.
                </DialogContent>
                <DialogActions>
                <Button onClick={() => (window.location.href = "/dashboard")}>
                    Dashboard
                </Button>
                </DialogActions>
            </Dialog>
            <div className="ManagerPreferenceContainer">
                <div className='UserListContainer2'>
                    <div className='UserLists'>
                        {this.state.employeeList.map((employee:any, index:number) => {
                            return(
                                <button
                                className='UserContent'
                                key={index}
                                >
                                    <img
                                        src={"https://picsum.photos/200"}
                                        className="UserImage"
                                        alt="Profile"
                                    />
                                    <div className='UserDetails'>
                                        <div>{employee.employeeName}</div>
                                        <div>{employee.employeeEmail}</div>
                                        <div>{employee.designationName}</div>
                                        <div>
                                            <Select
                                                id={employee.id.toString()}
                                                name={employee.id.toString()}
                                                defaultValue="select"
                                                onChange={this.handleSelect}
                                                className="selectMenu"
                                            >
                                                <MenuItem value="select" key="select">Select</MenuItem>
                                                {
                                                    this.state.employeeList.map((employee:any, managerPreference:number) => {
                                                        return(
                                                            <MenuItem
                                                                key={employee.id}
                                                                value={managerPreference+1}
                                                            >
                                                                    {managerPreference+1}
                                                            </MenuItem>
                                                        );
                                                })}
                                            </Select>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className='buttonContainer'>
                    <button type="submit" value="submit" className='submitButton'
                        onClick={this.submitPreference} disabled={!this.state.enableSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
}
