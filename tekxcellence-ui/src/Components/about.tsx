import ServPic from '../components/images/img11.jpg'


export const About = () => {
    return (
        <section className="servicesAbout" id="about">
            <div className="servicesWrapperAbout">
                <div className="leftServicesAbout">
                    <img src={ServPic} alt='txt' />

                </div>

                <div className="rigthServicesAbout">
                    <h2>About US</h2>

                    <p>TEKxcellency is a system where people are acknowledged for their performance in intrinsic or extrinsic ways.</p>

                    <p>Recognition & Reward is present in a work environment where there is appropriate acknowledgement and appreciation of employees’ efforts in a fair and timely manner.</p>

                   <p>R&R programs essentially allow everyone in the organization the opportunity to recognize other employees’ efforts in a timely manner and on a regular basis. These systems reward teamwork and shine a spotlight on your top performers and those who go the extra mile.</p>

                    {/* <button>Know More</button> */}
           
        

                </div>
            </div>
        </section>
    )
}