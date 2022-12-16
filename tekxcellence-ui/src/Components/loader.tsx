import React from 'react'

class Loader extends React.Component <{}, {}> {
    render(): React.ReactNode {
        return <div className="loaderContainer">
   
   <span className="loader"></span>
        </div>
    }
}
export default Loader;