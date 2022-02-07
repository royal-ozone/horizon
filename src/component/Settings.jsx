import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';

import Account from './account/account';
import Address from './address/address';
import Email from './email/changeEmail';
import Password from './password/changPassword';
import Notification from './notification/notification';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent
} from "react-pro-sidebar";
import {
    FiHome,
    FiLogOut,
    FiArrowLeftCircle,
    FiArrowRightCircle
} from "react-icons/fi";  
import { MdAccountCircle,MdCircleNotifications,MdFavoriteBorder,MdAddLocationAlt,MdEmail,MdPassword ,MdOutlineMenu,MdFavorite} from "react-icons/md";
import "react-pro-sidebar/dist/css/styles.css";
import './settings.css';

const routes = [
    {
        path: "/account",
        exact: true,
        sidebar:()=><div>account!</div>,
        main: ()=><Account/>
    },
    {
        path: "/address",
        exact: true,
        sidebar:()=><div>home!</div>,
        main: ()=> <Address/>
    },
    {
        path: "/notification",
        exact: true,
        sidebar:()=> <div>notification!</div>,
        main: ()=> <Notification/>
    },
    {
        path: "/email",
        exact: true,
        sidebar:()=> <div>email!</div>,
        main: ()=> <Email/>
    },
    {
        path: "/password",
        exact: true,
        sidebar:()=><div>password!</div>,
        main: ()=> <Password/>
    },

]
const Settings = props => {

    const [menuCollapse, setMenuCollapse] = useState(false);

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
      //condition checking to change state from true to false and vice versa
      menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    

    const profileHandle =()=>{
        console.log('profileHandle is word')
    }
    return (
        <Router>
        <div className="container3">
        <div className="one"> 
            

            <ProSidebar collapsed={menuCollapse}>
                <SidebarHeader>
                   <div className="logotext">
                      <p>{menuCollapse ? "HomZ" : " Big HomZ"}</p>
                   </div>

                   <div className="closemenu" onClick={menuIconClick}>
                       {menuCollapse ?<FiArrowRightCircle/>  : <FiArrowLeftCircle/>}
                         {/* {<MdOutlineMenu/>}  */}
                   </div>
                </SidebarHeader>

                <SidebarContent>
                 <Menu iconShape="round">

                   {/* <MenuItem icon={<MdFavorite />}>Favourite</MenuItem> */}
                   <MenuItem icon={<MdAccountCircle />}><Link to="/account" className="link">Account</Link> </MenuItem>
                   <MenuItem icon={<MdAddLocationAlt />}><Link to='/address'>Address</Link> </MenuItem>
                  
                   <MenuItem icon={<MdCircleNotifications />}><Link to='/notification' className="link">Notification </Link> </MenuItem>
                
                   <MenuItem icon={<MdEmail/>}> <Link to ='/email' className="link" >Change Email </Link> </MenuItem>
                  
                  
                   <MenuItem icon={<MdPassword />}> <Link to='/password' className="link">Change Password</Link> </MenuItem>
                  

                  
                <Switch>
                   {routes.map((route, index) => (
                     // You can render a <Route> in as many places
                     // as you want in your app. It will render along
                     // with any other <Route>s that also match the URL.
                     // So, a sidebar or breadcrumbs or anything else
                     // that requires you to render multiple things
                     // in multiple places at the same URL is nothing
                     // more than multiple <Route>s.
                     <Route
                       key={index}
                       path={route.path}
                       exact={route.exact}
                       children={<route.sidebar />}
                     />
                    ))}
                </Switch>

                 </Menu>
               </SidebarContent>
               <SidebarFooter>

               </SidebarFooter>


            </ProSidebar>
            
        </div>
        <div className="two">
              <Switch>
                {routes.map((route, index) => (
                  // Render more <Route>s with the same paths as
                  // above, but different components this time.
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<route.main />}
                 />
                ))}
             </Switch>
        </div>
    <div/>
    
    </div>
    <div className="border">
       
                    
    </div>
        </Router>
   
    );
}


const mapStateToProps = (state) => ({
    profileData: state.profile?state.profile : null,
});

// const mapDispatchToProps = ()

export default connect(mapStateToProps)(Settings);

