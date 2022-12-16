import React, { Component } from 'react';
import Navbar from '../../components/navbar';
import spotimg from '../images/spot_award.png';
import risingimg from '../images/rising_star.png';
import bestteamimg from '../images/best_team.png';
import mvpimg from '../images/customer_mvp.png';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import {getAwardDetails} from '../../services/award-service';
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

interface AwardContextState{
    awardName : any,
    briefDescription : any,
    mainDescription : any,
    awardImage: any,
    loading : boolean,
    awardCarouselData : any,
    awardCarouselDataKeys : any,
    alwaysTrueList : any,
}

interface AwardContextProps{
}

export default class AwardContext extends Component<AwardContextProps, AwardContextState> {

    constructor(props: AwardContextProps) {
        super(props);
        this.state = {
            awardName:"",
            briefDescription:"",
            mainDescription:"",
            awardImage:"",
            loading: false,
            awardCarouselData : {
                spot: {
                    awardName : "SPOT AWARDS",
                    awardHref : "/award/spot",
                    awardImg : spotimg,
                },
                risingStar: {
                    awardName : "RISING STAR AWARDS",
                    awardHref : "/award/risingStar",
                    awardImg : risingimg,
                },
                bestTeam: {
                    awardName : "BEST TEAM AWARDS",
                    awardHref : "/award/bestTeam",
                    awardImg : bestteamimg,
                },
                customerMvp: {
                    awardName : "CUSTOMER MVP AWARDS",
                    awardHref : "/award/customerMvp",
                    awardImg : mvpimg,
                }
            },
            awardCarouselDataKeys : [],
            alwaysTrueList : [1],
        };
    }

    async componentDidMount(){
        this.setState({loading : true });
        const typeOfAward = ((window.location.pathname).split('/')[2]);
        const awardNamesObject = {"spot":"Spot Awards", "risingStar":"Rising Star Awards",
            "bestTeam":"Best Team Awards", "customerMvp":"Customer MVP Awards"};
        const awardImagesObject = {"spot":spotimg, "risingStar":risingimg, "bestTeam":bestteamimg, "customerMvp":mvpimg};
        this.setState({ awardImage : (awardImagesObject as any)[typeOfAward] });
        this.getAwardDetails((awardNamesObject as any)[typeOfAward]);
        this.setState({awardCarouselDataKeys : Object.keys(this.state.awardCarouselData)}, ()=>{
            let listCopy = (this.state.awardCarouselDataKeys).filter((awardKey:any) => awardKey !== typeOfAward);
            this.setState({ awardCarouselDataKeys :  listCopy});
        });
    }

    getAwardDetails = (awardName : string) => {
        getAwardDetails(awardName).then((response:any) => {
            if(response.status === "success"){
                let awardName = response.data.awardName;
                let briefDescription = response.data.awardBriefDescription;
                let mainDescription = response.data.awardMainDescription;
                this.setState({
                    awardName : awardName,
                    briefDescription : briefDescription,
                    mainDescription : mainDescription,
                });
            }
        })
    }
    
    render() {
        return (
        <>
            <Navbar/>
            <Sidebar/>
            <div className='AwardContainer'>
                    <div className='AwardHeader'>{this.state.awardName}</div>
                    <div className="bottomAwardContainer">
                        <div className="AwardCarousel">
                            <AutoplaySlider
                                play={true}
                                cancelOnInteraction={false} // should stop playing on user interaction
                                style={{ height: "100%", width: "100"}}
                                interval={3000}
                            >
                                {
                                    this.state.awardCarouselDataKeys.map((awardKey:any, index:number) => {
                                        return(
                                            <div className="ribbon" key={index}>
                                                <div className="ribbon-stitches-top">OTHER AWARDS AT TEK</div>
                                                <a href={this.state.awardCarouselData[awardKey].awardHref}>
                                                    <div className="ribbon-content">
                                                        <img src={this.state.awardCarouselData[awardKey].awardImg} alt="" style={{maxWidth:"41%", minWidth:"40%"}}/>
                                                    </div>
                                                </a>
                                                <div className="ribbon-stitches-bottom">{this.state.awardCarouselData[awardKey].awardName}</div>
                                            </div>
                                        );
                                        })
                                }
                            </AutoplaySlider>
                        </div>
                        <div className='description'>
                            <div className='descriptionAwardHeader'>ABOUT
                                <span className="descriptionAwardName"> {this.state.awardName}</span></div>
                            <div className='descriptionContent'>
                                {this.state.briefDescription} 
                            </div>
                            <div className='descriptionContent'>
                                {this.state.mainDescription}
                            </div>
                            <div className="voteButton">
                                <Link to="/vote?award=spotaward">Vote</Link>
                            </div>
                        </div>
                        <div className="AwardImageContainer">
                                <img src={this.state.awardImage} alt=""/>
                        </div>
                    </div>
            </div>
        </>
        )
    }
}
