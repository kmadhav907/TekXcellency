// import "./ResponsiveFront.css";
import ImageName from "../components/images/img4.jpg"

export const Front = () => {
  return (
    <section className="HeroSec">
      <div className="contentWrapper-front">
        <div className="frontLeftContent">
          <h2>Vote for your colleague</h2>
        </div>

        <div className="frontRightContent">
    
            <img src={ImageName}  alt={undefined} /> 

        </div>
      </div>
    </section>
  );
};
