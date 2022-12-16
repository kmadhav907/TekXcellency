import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import DashboardPage from '../pages/dashboard/dashboard';
import HomePage from '../pages/home/rewards-recognition';
import LoginPage from '../pages/login/login';
import RegisterPage from '../pages/register/register';
import AwardContext from '../pages/award-context/award-context';
import UserProfilePage from '../pages/user-profile/user-profile';
import VotePage from '../pages/vote-page/vote-page';
import ManagerApproval from '../pages/manager-approval/manager-approval';
import { Awards } from '../components/awards';
import { About } from '../components/about';
import { Contact } from '../components/contact';
import AdminDashboardPage from '../pages/admin-dashboard/admin-dashboard';
import ChoicePageForAdmin from '../pages/choice/choice-page';
import ConfirmTokenToResetPassword from '../pages/confirm-token-to-reset-password/confirm-token-to-reset-password';



class Routing extends React.Component<{}, {}> {

    render():React.ReactNode {
        return <BrowserRouter>
        <Routes>
        <Route index path="" element={<HomePage/>}/>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="register" element={<RegisterPage/>}/>
            <Route path="dashboard" element={<DashboardPage/>}/>
            <Route path="vote" element={<VotePage/>}/>
            <Route path="award/:award" element={<AwardContext/>}/>
            <Route path="profile" element={<UserProfilePage/>}/>
            <Route path="managerApproval" element={<ManagerApproval/>}/>
            <Route path="reward" element={<Awards/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="share" element={<Contact/>}/>
            <Route path="admin-dashboard" element={<AdminDashboardPage/>}/>
            <Route path="admin-dashboard/:choice" element={<ChoicePageForAdmin/>}/>
            <Route path="confirmation/:token" element={<ConfirmTokenToResetPassword/>}/>
        </Routes>
        </BrowserRouter>
    }
}
export default Routing;