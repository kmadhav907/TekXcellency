import React from 'react';

const VoteScreenDescription = () => {
  return (
    <><div className='award'>
    <div className='awardHeader'>CRITERIA-</div>
    <div className='awardContent'>
      <strong>The criteria for rating a employee for SPOT awards are as follows-</strong>
      <div className='awardDesc'> 
        <ul>
      {/* <ul className='awardDesc'> */}
        <li>Technical Skills-This criteria rates the employee on the basis of technical knowledge.</li>
        <li>Communication-Communication impacts employee productivity, innovation and more.</li>
        <li>Team Work-Teamwork happens when people work together toward a common goal.</li>
        <li>Punctuality- Punctuality simply means showing up when you say you will.</li>
        <li>Quality of  Work- It refers to work that meets client and company expectations.</li>
        <li>Manager's Preference- Managers can add their preference for a particular employee if they want</li>
      </ul>
       </div> 
    </div>
    
  </div>
  </>
  )
}

export default VoteScreenDescription