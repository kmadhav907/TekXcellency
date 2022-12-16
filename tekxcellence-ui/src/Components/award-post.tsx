import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
// import './ResponsiveCardAward.css'

export const AwardPost = (props: { src: string | undefined; alt: string | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined }) => {
    return (
       <div className="postWrapperLanding">
           <div className="leftInfoLanding">
               <img src={props.src} alt={props.alt}/>
           </div>
            <div className="rigthInfoLanding">
                <h2>{props.title}</h2>
           </div> 
       </div>
    )
}
