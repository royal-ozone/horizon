import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Redirect, useHistory} from 'react-router-dom';
import {myProfileHandler} from '../store/auth';

import Account from './account/account';
import Address from './address/address';
import Email from './email/changeEmail';
import Orders from './Orders/Orders';
import Notification from './notification/notification';
import Mobile from './mobile/mobile';

import cookie from 'react-cookies'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
    Spinner
} from "react-bootstrap";

import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent
} from "react-pro-sidebar";
import {
    FiArrowLeftCircle,
    FiArrowRightCircle
} from "react-icons/fi"; 
import { MdAccountCircle,MdCircleNotifications,MdFavoriteBorder,MdAddLocationAlt,MdEmail,MdPassword ,MdOutlineMenu,MdFavorite} from "react-icons/md";
import "react-pro-sidebar/dist/css/styles.css";
import './settings.css';
import OrdersDetails from './Orders/OrdersDetails';



const routes = [
    {
        path: "/settings/account",
        exact: true,
        sidebar:()=><div>account!</div>,
        main: ()=><Account/>
    },
    {
        path: "/settings/address",
        exact: true,
        sidebar:()=><div>home!</div>,
        main: ()=> <Address/>
    },
    {
        path: "/settings/notification",
        exact: true,
        sidebar:()=> <div>notification!</div>,
        main: ()=> <Notification/>
    },
    // {
    //     path: "/settings/email",
    //     exact: true,
    //     sidebar:()=> <div>email!</div>,
    //     main: ()=> <Email/>
    // },
    {
        path: "/settings/orders",
        exact: true,
        sidebar:()=><div>Orders</div>,
        main: ()=> <Orders/>
    },
    {
        path: "/settings/orderItems/:id",
        exact: true,
        sidebar:()=><div>Orders details</div>,
        main: ()=> <OrdersDetails/>
    },
    // {
    //     path: "/settings/mobile",
    //     exact: true,
    //     sidebar:()=><div>mobile!</div>,
    //     main: ()=> <Mobile/>
    // },

]
const Settings = props => {
    const history = useHistory();

    let token = cookie.load('access_token');

    const [menuCollapse, setMenuCollapse] = useState(false);
    const {myProfileHandler,profileData} = props;
    const [loading, setLoading] = useState(false);
    
    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
    
    //     useEffect(() => {
            
    //         if(token){
    //           console.log("🚀 ~ file: Settings.jsx ~ line 101 ~ useEffect ~ token", token)
    //           myProfileHandler(); 
    //           setLoading(false);
    //         }
    //         else{
    //             ('/pageInvalidToken')
    //         }
    //     },[])
    //     useEffect(() => {
    //         if(profileData.message){
    //             if(profileData.message.includes('500')||profileData.message.includes('403')){
    //                 history.push('/pageInvalidToken')
    //             }
    //         }
    //     },[history, profileData.message])
    //     useEffect(() => {
    //         setLoading(true)
    //         if(profileData.res){
    //             if(profileData.message.includes("Invalid")){
    //                 ('/pageInvalidToken')
    //                 }
    //         }
        
    //         setLoading(false);
    //     },[history, profileData, profileData.message])

    //  useEffect(()=>{
    // if(!token) {

    //     ('/signIn');
    // }
    //  },[history,token])

    
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
                   <MenuItem icon={<MdAccountCircle />} ><Link to="/settings/account" className="link">Account</Link> </MenuItem>
                   <MenuItem icon={<MdPassword />}> <Link to='/settings/orders' className="link">Orders</Link> </MenuItem>
                   <MenuItem icon={<MdAddLocationAlt />}><Link to='/settings/address'>Address</Link> </MenuItem>
                  
                   <MenuItem icon={<MdCircleNotifications />}><Link to='/settings/notification' className="link">Notification </Link> </MenuItem>
                
                   {/* <MenuItem icon={<MdEmail/>}> <Link to ='/settings/email' className="link" >Change Email </Link> </MenuItem>
                   */}
                  
                   {/* <MenuItem icon={<MdPassword />}> <Link to='/settings/mobile' className="link">Change mobile</Link> </MenuItem> */}
                  

                  
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
                    <Redirect from='/settings' to='/settings/account'/>

                 </Menu>
               </SidebarContent>
               <SidebarFooter>

               </SidebarFooter>


            </ProSidebar>
            
        </div>
        <div className="two">
        {loading ? <Spinner animation="border" /> : null}

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
    profileData: state.sign?state.sign : null,
});

 const mapDispatchToProps = {myProfileHandler}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

