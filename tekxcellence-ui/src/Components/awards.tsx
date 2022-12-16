// import './ResponsiveAwards.css'
import { AwardPost } from '../components/award-post'

import image1 from '../components/images/img6.png'
import image2 from '../components/images/img43.jpg'
import image3 from '../components/images/img22.jpg'
import image4 from '../components/images/10.jpg'
import image5 from '../components/images/img34.png'
import image6 from '../components/images/img45.jpg'
import image7 from '../components/images/img7.png'
import image8 from '../components/images/img40.png'

export const Awards = () => {
    return (
        <section className="bRewardsLanding" id="awards">
            <div className="rewardsLanding">
                <div className="infosLanding">
                    <h2>Our Awards</h2>
                    <p>Below are the list of awards with which a member of TGS family is awarded.</p>
                </div>
                
                <div className="award-postsLanding">
                    <AwardPost title='SPOT Awards'
                    src={image1} alt={undefined}                  
                    />

                    <AwardPost title='Best Project of the Quarter'
                    src={image2} alt={undefined}
                    />

                    <AwardPost title='Zen Master'
                    src={image3}
                    alt={undefined}/>

                    <AwardPost title='Work Anniversary Awards'
                    src={image4}
                    alt={undefined}/>

                    <AwardPost title='Customer MVP'
                    src={image5}
                    alt={undefined}/>

                    <AwardPost title='Best Innovation of the Quarter'
                    src={image6}
                    alt={undefined}/>

                    <AwardPost title='Rising Star Award'
                    src={image7}
                    alt={undefined}/>


                    <AwardPost title='Light House'
                    src={image8}
                    alt={undefined}/>

                </div>
            </div>
        </section>
    )
}