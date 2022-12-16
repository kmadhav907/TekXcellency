import React from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
class Sidebar extends React.Component {
    handleLogout = ()=> {
        localStorage.removeItem('userObject');
        localStorage.removeItem("email");
    }
    render():React.ReactNode {
        return<div className="sidebarNav">
            <Link className="sidebarItem" to="/admin-dashboard">
                Admin <AdminPanelSettingsIcon style={{fontSize:"16px", margin:"0 5px"}}/>
            </Link>
            <div className="sidebarItem">
                Leaderboard <LeaderboardIcon style={{fontSize:"16px", margin:"0 5px"}}/>
            </div>
            <Link className="sidebarItem" to="/award/spot">
                Awards <EmojiEventsIcon style={{fontSize:"16px", margin:"0 5px"}}/>
            </Link>
            <Link className='sidebarItem' to="/vote?award=spotaward">
                Vote <HowToVoteIcon style={{fontSize:"16px", margin:"0 5px"}}/>
            </Link>
            <Link className='sidebarItem' to="/managerApproval">
                Manager Approval <SettingsAccessibilityIcon style={{fontSize:"16px", margin:"0 5px"}}/>
            </Link>
            <Link className="sidebarItem" to={'/profile'}>
                Profile <SettingsAccessibilityIcon style={{fontSize:"16px", margin:"0 5px"}}/>
            </Link>
            <Link to="/login" className="sidebarItem" onClick={this.handleLogout} style={{fontSize:"16px", margin:"200px 5px"}}> 
                Logout <ExitToAppIcon style={{fontSize:"16px", margin:"0 5px"}}/>
            </Link>
        </div>
      
}
}

export default Sidebar;