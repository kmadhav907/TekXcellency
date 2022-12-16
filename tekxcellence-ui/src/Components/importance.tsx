// import "./ResponsiveImportance.css";
import { PostImp } from "../components/post-importance";

import img1 from "../components/images/img18.png";
import img2 from "../components/images/img28.jpg";
import img3 from "../components/images/img33.jpg";

export const Importance = () => {
  return (
    <section className="blogImportance">
      <div className="blogWrapperImportance">
        <div className="topInfoImportance">
          <h2>Importance Of TEKxcellency</h2>
          <p>
            Reward and Recognition is important program for both the organization and it's employee.
          </p>
        </div>

        <div className="postsWrapperImportance">
            <div className="postBtnImportance">
            {/* <button className="leftImportance">←</button> */}
            </div>
            
          <PostImp
            src={img1}
            alt="alimento1"
            title="Employee Happiness"
          />

          <PostImp
            src={img2}
            alt="alimento2"
            title="Positive Work Culture"
          />

          <PostImp
            src={img3}
            alt="alimento3"
            title="Sense of purpose"
          
          />
           <div className="postBtnImportance">
            {/* <button className="rigthImportance">→</button> */}
            </div>  
        </div>
      </div>
    </section>
  );
};
