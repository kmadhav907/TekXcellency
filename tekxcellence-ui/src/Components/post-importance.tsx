import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
// import './ResponsiveImpCard.css'

export const PostImp = (props: { src: string | undefined; alt: string | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined }) => {
    return (
        <div className="PostBlogImportance">
            <div className="topBlogImportance">
                <img src={props.src} alt={props.alt} />
            </div>
            <div className="middleBlogImportance">
                <h2>{props.title}</h2>
            </div>
         
        </div>
    )
}