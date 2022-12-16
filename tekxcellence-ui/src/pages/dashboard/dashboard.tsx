import React, { createRef} from "react";
import { getEmployeeDetails } from "../../services/user-service";
import Loader from "../../components/loader";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import Sidebar from "../../components/sidebar";
import ImageName from '../../components/images/img6.png';
import image3 from '../../components/images/img22.jpg';
import image5 from '../../components/images/img34.png';
import image7 from '../../components/images/img7.png';
import image2 from '../../components/images/img43.jpg';
import image4 from '../../components/images/10.jpg';
import image6 from '../../components/images/img40.png';
import { getChartData } from "../../services/chart-service";
import { getWinnersDataForChart } from "../../services/chart-winner-service";
import {getEmployeeWithHighestRewardPoints} from "../../services/employee-list-service";
import {  getElementAtEvent, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


import { Box, Button, Modal,  Table,  TableBody,  TableCell,  TableHead,  TableRow,  Typography } from "@mui/material";
import Navbar from "../../components/navbar";

import { color } from "@mui/system";
import { PieChart } from "recharts";
ChartJS.register(ArcElement, Tooltip, Legend,ChartDataLabels);

const AutoplaySlider = withAutoplay(AwesomeSlider);

const style = {

  position: 'absolute',

  top: '50%',

  left: '50%',

  transform: 'translate(-50%, -50%)',

  width: 400,

  bgcolor: 'background.paper',

  border: '2px solid #000',

  boxShadow: 24,

  p: 4,

};
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));


interface DashboardPageState {
  employeeList: any[];
  loading: boolean;
  userDetails: any;
  isLoaded: boolean;
  items: any[];
  awards: any;
  number: any;
  openModal: boolean;
  selectedAward: any;
  winnersName: any[];
  winnersId: any;

}
class DashboardPage extends React.Component<{}, DashboardPageState> {
  chartRef: React.RefObject<any>;
  constructor(props: any) {
    super(props);
    this.state = {
      employeeList: [],
      loading: false,
      userDetails: "",
      isLoaded: false,
      items: [],
      awards: [],
      number: "",
      openModal: false,
      selectedAward: "",
      winnersName: [],
      winnersId: "",
    };
    this.chartRef = createRef();
  }

  async componentDidMount() {
    // this.getEmployeeList()
    const userObject = localStorage.getItem("email");
    // const userObject1 = localStorage.key();
    this.getEmployeesWithHigestRewardPoints();
    this.setState({ loading: true });



    try {
      if (userObject == null) {
        window.location.href = "/login";
        return;
      } else {
        //console.log(userObject);
        this.getEmployeeDetails(userObject);
        this.getChartData();
        // this.getWinnersDataForChart(userObject1);

      }
    } catch (error) {
      alert("Something went wrong");
    }

    this.setState({ loading: false });

  }
  getEmployeesWithHigestRewardPoints = () =>{
    getEmployeeWithHighestRewardPoints().then(response => {
      this.setState({employeeList: response.data})
    })
    .catch((error)=> {
      console.log(error);
    })
  }
  getChartData() {
    const dataset1Award: any[] = [];
    const dataset2Number: any[] = [];

    getChartData().then((response: any) => {
      console.log(response);
      //console.log(response.chartDetails)
      // let iterableValues = Object.keys(response.chartDetails).map((item:any, index:number)=> {
      //   return {item: item, number: response.chartDetails[item]}
      // })
      // console.log(iterableValues);
      // for(const val of iterableValues){
      //     dataset1Award.push(val.item);
      //     dataset2Number.push(val.number);
      // }

      // this.setState({awards:dataset1Award, number: dataset2Number}, ()=> {
      // });
      // console.log(this.state.awards);
      // console.log(this.state.number);
      const { chartDetails } = response;
      let dataset1Id: any[] = []
      let dataset1Award: any[] = []
      let dataset2Number: any[] = []
      // let dataset2Award:any = []
      // let dataset3Winners: any = []
      // chartDetails.forEach((element:any) => {
      //   let idObject = {id: element.id}
      //   dataset1Id.push(idObject);
      //   dataset2Award.push(element.name)
      //   dataset3Winners.push(element.numberOfWinners)
      // });
      // this.setState({awards: dataset2Award, number: dataset3Winners})
      chartDetails.forEach((element: any) => {
        dataset1Id.push(element.id);
        dataset1Award.push(element.name);
        dataset2Number.push(element.numberOfWinners);
      })
      this.setState({ awards: { awardIds: dataset1Id, awardsName: dataset1Award, totalNumberOfWinners: dataset2Number } })
    })
  }
  getEmployeeDetails = (userEmail: string) => {
    getEmployeeDetails(userEmail)
      .then((response: any) => {
        //console.log(response);
        if (response.status === "success") {
          this.setState({ userDetails: response.data }, () => {
            localStorage.setItem("userObject", JSON.stringify(response.data));
          });
        }
      })
      .catch((error) => {
        throw error;
      });
  };



  // useEffect(()=>{
  //   const getData = async() =>{
  //     const reqData = await fetch("http://localhost:8083/get-chart-details");
  //     const resData = await reqData.json()
  //     console.log(resData);
  //   }
  //   getData();
  //  },[]
  //  );  for reference see vote-page.tsx

  handleClick = (event: any) => {
    console.log(getElementAtEvent(this.chartRef.current, event));
    let dataIndex = getElementAtEvent(this.chartRef.current, event);
    let dataAtIndex = dataIndex[0].index;
    console.log(this.state.awards["awardIds"][dataAtIndex])
    let id = this.state.awards["awardIds"][dataAtIndex];
    this.setState({ openModal: true })
    getWinnersDataForChart(id).then((response: any) => {
      const { winnerForCharts } = response;
      this.setState({ winnersName: winnerForCharts })
    });

  }
  onCloseModal = () => {
    this.setState({ openModal: false })
  }
  render(): React.ReactNode {
    if (this.state.loading) {

      return <Loader />;

    } else


      return (
        <>
          <Navbar />

          <div className="employeeListContainer">
            <div className="employeeListHeader">
              Hi {this.state.userDetails.name}
            </div>
            <div className="employeeLists">
              {this.state.employeeList.map((employee: any, index: number) => {
                return (
                  <div className="employeeContent" key={index}>
                    <img
                      src={employee.profileImage || "https://res.cloudinary.com/date5n64u/image/upload/v1669709085/Logo_zxkmsz.png"}
                      className="profileImage"
                      alt="Profile"
                    />
                    <div className="profileDetails">
                      <div style={{padding:"2px 0px"}}>{employee.name}</div>
                      <div style={{padding:"2px 0px"}}>{`${employee.email}`}</div>
                      <div style={{padding:"2px 0px"}}>{`${employee.designation}`}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            < div className="awardSliderContainer">
              <AutoplaySlider
                play={true}
                cancelOnInteraction={false} // should stop playing on user interaction
                //  style={{ height: "300px", width: "40%" }}
                className="dashboardEmployeeSlider"
                interval={6000}
              >
                <div className="ribbon">
                  <div className="ribbon-stitches-top"></div>
                  <div className="ribbon-content">
                    <p>
                      <b>Spot Awards</b>
                      <img src={ImageName} />
                    </p>
                  </div>
                  <div className="ribbon-stitches-bottom"></div>
                </div>

                <div className="ribbon">
                  <div className="ribbon-stitches-top"></div>
                  <div className="ribbon-content">
                    <p>
                      <b>Zen Master</b>
                      <img src={image3} />
                    </p>
                  </div>
                  <div className="ribbon-stitches-bottom"></div>
                </div>

                <div className="ribbon">
                  <div className="ribbon-stitches-top"></div>
                  <div className="ribbon-content">
                    <p>
                      <b>Customer MVP</b>
                      <img src={image5} />
                    </p>
                  </div>
                  <div className="ribbon-stitches-bottom"></div>
                </div>

                <div className="ribbon">
                  <div className="ribbon-stitches-top"></div>
                  <div className="ribbon-content">
                    <p>
                      <b>Rising Star Award</b>
                      <img src={image7} />
                    </p>
                  </div>
                  <div className="ribbon-stitches-bottom"></div>
                </div>

                <div className="ribbon">
                  <div className="ribbon-stitches-top"></div>
                  <div className="ribbon-content">
                    <p>
                      <b>Best Project of Quarter</b>
                      <img src={image2} />
                    </p>
                  </div>
                  <div className="ribbon-stitches-bottom"></div>
                </div>

                <div className="ribbon">
                  <div className="ribbon-stitches-top"></div>
                  <div className="ribbon-content">
                    <p>
                      <b>Work Anniversary Award</b>
                      <img src={image4} />
                    </p>
                  </div>
                  <div className="ribbon-stitches-bottom"></div>
                </div>

                <div className="ribbon">
                  <div className="ribbon-stitches-top"></div>
                  <div className="ribbon-content">
                    <p>
                      <b>Light House</b>
                      <img src={image6} />
                    </p>
                  </div>
                  <div className="ribbon-stitches-bottom"></div>
                </div>

              </AutoplaySlider>

              <div className="chart">
               <Pie
              ref={this.chartRef}
              width={450}
              height={450}
              // series={this.state.number}
              onClick={this.handleClick}
              data={{
                labels:this.state.awards["awardsName"],
                datasets:[
                  {
                    label:'winners',
                    data:this.state.awards["totalNumberOfWinners"],
                    backgroundColor: ['#fcba03', '#c42d1a', '#930ac9', '#c47a1a', '#53db18', '#27bdc2', '#3d6adb', '#db3dbe'],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
              
                  }
                ],
                // pieceLabels: {mode:'percentage',precision:2},


              }}
              options={{
                responsive: true,
                plugins:{
                  legend:{
                    display:true,
                    position: 'right',
                  
                  },
                  // ChartDataLabels:{
                  //   color:'red',
                  //   labels: {
                  //     title: {
                  //       font: {
                  //         weight: 'bolder'
                  //       }
                  //     },
                  //   }
                  // }
                  datalabels: {
                    color: 'black',
                    labels:{
                      title:{
                        font:{
                          weight: 'bold'
                        }
                      }
                    }
                  }
                  
                  //  dataLabels: {display:true{"}"}
                }

              }
                
                
              }       
              >
              </Pie> 
           
                <Modal
                  open={this.state.openModal}
                  onClose={this.onCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Winners:
                    </Typography>
                    <Typography id="modal-modal-description">
                      <Table >
                        <TableHead>
                          <TableCell align="center">Employee Name</TableCell>
                          <TableCell align="center">Employee ID</TableCell>
                        </TableHead>
                        <TableBody>
                          {this.state.winnersName.map((winner: any, index: number) => {
                            console.log(winner)
                            return <>
                              <TableRow>
                                <TableCell align="center">{winner.employeeName}</TableCell>
                                <TableCell align="center">{winner.employeeId}</TableCell>
                              </TableRow>
                            </>
                          })}

                        </TableBody>
                      </Table>

                    </Typography>
                    <Button onClick={this.onCloseModal}>Close</Button>
                  </Box>
                </Modal>
                {/* <PieChart 
                  data={{
                    labels: this.state.awards,
                    datasets: [
                      {
                        label: '# of Winner',
                        data: this.state.number,
                    
                        backgroundColor: ['#fcba03', '#c42d1a', '#930ac9', '#c47a1a', '#53db18', '#27bdc2', '#3d6adb', '#db3dbe'],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}    /> */}
              </div>
              {/* <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>  */}
            </div>
          </div>
          <Sidebar />
        </>
      );
  }
}

// const AwardSlider = React.createClass({
//   "render": (props:any)=> {
//     return <h1>hello world</h1>
//   }
// })
export default DashboardPage;

