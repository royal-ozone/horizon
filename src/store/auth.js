
// import ApiService from '../services/ApiService';
import { createSlice } from "@reduxjs/toolkit";
import cookie from 'react-cookies';
// import checkState from '../services/validation';
import AuthService from '../services/Auth';

let sign = createSlice({
    name: 'sign',
    initialState: {
        login:false,user:{},message:'',token:{},verify:{}
    },
    reducers:{
        // addUser(state,action){
        //     console.log("🚀 ~ file: sign.js ~ line 13 ~ addUser ~ state", state)
        //     return  action.payload 
        // },
        loginAction(state,action){
            let data =action.payload;
            let access_token;
            let refresh_token;
            let session_id;
            if (data.login ===true){
                
                access_token = data.user.access_token ?data.user.access_token:null ;
                refresh_token = data.user.refresh_token? data.user.refresh_token : null;
                session_id = data.user.session_id ? data.user.session_id :null;
                if(access_token && refresh_token){
                    cookie.save('refresh_token',refresh_token);
                    cookie.save('access_token',access_token);
                    cookie.save('session_id',session_id);
                }
                
                return {...state,...data}

            }
            else{
                console.log("🚀 ~ file: auth.js ~ line 37 ~ loginAction ~ action.payload", action.payload)
                return {...state,...action.payload} ;
            }
           
            
        },
        deleteMessage(state,action){
            return {...state, message: ''}
        }
        // logOut(state,action){
            
        // console.log("🚀 ~ file: sign.js ~ line 23 ~ logOut ~ state", state)
        //     return action.payload
        // },
        // verification(state,action){
        //     return action.payload
        // },
        // verify(state,action){
        //     return action.payload
        // },
        
    }

})
export const signupHandler = (payload) => async (dispatch,state) => {
    
//     let SignUp = new ApiService();
//    (async()=>{
//        console.log('log in seccessfully')
//        let data = await SignUp.post('auth/signup',null,payload,null)
//        console.log("🚀 ~ file: signup.js ~ line 25 ~ data", data)
       
//        cookie.save('tokenSignUp',data.accessToken);
//        dispatch(addUser(data))
//    })()

try {
    let data =await AuthService.register(payload);
    console.log("🚀 ~ file: auth.js ~ line 74 ~ signupHandler ~ data", data)
    if(data.status === 200){
       dispatch(loginAction({token:{...data}}))
    }else if(data.status ===403){
       dispatch(loginAction({message:data.message}))
    }
} catch (error) {
    dispatch(loginAction({message:error.message}))
}
   
}

export const signInHandler = (payload) => async(dispatch,state) => {
    
//    try {
//     let SignIn =new ApiService();

//     let response = await SignIn.basicPost('auth/signin',null,payload);
   
//    if(response.status===200){

//        dispatch(getUser({ login:true,user:{...response}}))
//    }
//    else if( response.status===403){
//     console.log("🚀 ~ file: sign.js ~ line 85 ~ signInHandler ~ response", response)
//     dispatch(getUser({ message:response.message,message2:response}))

//    }else{
//     console.log("🚀 ~ file: sign.js ~ line 89 ~ signInHandler ~ response", response)
//     dispatch(getUser({ message:response.message,message2:response}))
//    }
//    } catch (error) {
//     dispatch(getUser({ message:error.message}))
 
//    }

try {
    let data = await AuthService.login(payload);
    if(data.status ===200){
    dispatch(loginAction({ login:true,user:{...data}}))
    }else{
        dispatch(loginAction({ message:data.message}))  
    }
} catch (error) {
    dispatch(loginAction({ message:error.message}))
}


}
export const logOutHandler = (payload) =>  async(dispatch,state) => {
    // let LogOut =new ApiService();
    
    
    // (async()=>{
    //     console.log('Log Out Seccessfully')
    //     let bearer = cookie.load('access_token');
    //     let data = await LogOut.post('auth/signout',null,payload,bearer);
    //     console.log("🚀 ~ file: signin.js ~ line 23 ~ data", data)
    //     if(data){

    //         cookie.remove('access_token',{path: '/'})
    //         cookie.remove('refresh_token',{path: '/'})
    //         cookie.remove('profile',{path: '/'})
    //     }
    //     dispatch(logOut({ message:data.message}))
        
    // })()
    try {
        let data =await AuthService.logout();
        console.log("🚀 ~ file: auth.js ~ line 141 ~ logOutHandler ~ data", data)
        if(data.status ===200){
            cookie.remove('access_token',{path: '/'})
            cookie.remove('refresh_token',{path: '/'})
            cookie.remove('session_id',{path: '/'});
            dispatch(loginAction({login:false, message:data.message}))
        }else{
            dispatch(loginAction({ message:data.message}))
        }
    } catch (error) {
        dispatch(loginAction({ message:error.message}))
    }

}
export const endSession = () => async (dispatch, state)=> {
    dispatch(loginAction({login: false, user: {}}))
}
export const verificationHandler  =async (dispatch,state) => {
    // let Verification =new ApiService();
    
    
    // (async()=>{
    //     console.log('Verification Seccessfully')

    //     let bearer = cookie.load('tokenSignUp');
    //     console.log("🚀 ~ file: sign.js ~ line 80 ~ bearer", bearer)
    //     let data = await Verification.post('auth/user/verification',null,null,bearer);
    //     console.log("🚀 ~ file: sign.js ~ line 82 ~ data", data)
    //     dispatch(verification(data))
    // })()
    try {
        let data = await AuthService.verification();
        if(data){
           dispatch(loginAction({verify:{...data}}))
        }

    } catch (error) {
        dispatch(loginAction({ message:error.message}))

    }
}
export const verifyHandler = (payload) => async(dispatch,state) => {
    // let Verification =new ApiService();
    
    
    // (async()=>{
    //     console.log('Verify Seccessfully')
    //     let bearer = cookie.load('tokenSignUp');
    //     let data = await Verification.post('auth/user/verify',null,payload,bearer);
    //     console.log("🚀 ~ file: sign.js ~ line 78 ~ data", data)
    //     dispatch(verify(data))
    // })()
    try {
        let data = await AuthService.verify(payload);
        if(data){
            dispatch(loginAction({verify:{...data}}))
        }
    } catch (error) {
           dispatch(loginAction({ message:error.message}))

    }

}
export const myProfileHandler = () => async (dispatch,state) => {
    try {
        let data =await AuthService.getProfile();
        console.log("🚀 ~ file: auth.js ~ line 212 ~ myProfileHandler ~ data", data)
        if(data.status ===200){
            dispatch(loginAction({login:true,user:{...data}}))
        }else{
            dispatch(loginAction({message:data.message}))
        }
    } catch (error) {
        dispatch(loginAction({message:error.message}))
    }

    // (async()=>{
    //     let data = await  Profile.second_get('auth/profile',null,bearer);
    //     let promise = await Promise.all([data]);
    //     if(promise[0].status===200 ){
            
    //         dispatch(getProfile({profile:data}))

    //     }
    //     if(promise[0].status===403){

    //         dispatch(getProfile( {message :promise[0] }))
    //     }
        
        
    // })()
}
export const updateProfileHandler = (payload) =>async (dispatch,state)=> {
    try {
        let data = await AuthService.updateProfileInfo(payload);
        console.log("🚀 ~ file: auth.js ~ line 241 ~ updateProfileHandler ~ data", data)
        if(data.status ===200){
            dispatch(loginAction({user:{...state().sign.user,...data}}))
        }else{
            dispatch(loginAction({message:data.message}))
        }
    } catch (error) {
        dispatch(loginAction({message:error.message}))
    }
    // try {
        
    //     // (async()=>{
    //         let res = await Profile.update('auth/update/profile',payload,null,bearer)
    //         console.log("🚀 ~ file: account.js ~ line 65 ~ // ~ res", res)
    //         if(res.status === 200){
    
    //             dispatch(updateProfile({updated:true,profile:{...res.data},picture:res.data.picture.profile_picture}))
    //         }
    //         else{
    //             dispatch(updateProfile({message:res.message}))
    
    //         }
            
    //     // })()
    // } catch (error) {
        
    // }
   
}
export const updateEmailHandler = (payload) => async (dispatch,state)=> {
    // (async()=>{
    //     let data =await Profile.update('auth/user/email',payload,null,bearer)
    //     dispatch(updateProfile(data))
        
    // })()
    try {
        let data = await AuthService.updateEmail(payload);
        console.log("🚀 ~ file: auth.js ~ line 278 ~ updateEmailHandler ~ data", data)
        if(data.status ===200){
            dispatch(loginAction({user:{...state().sign.user,email:data.profile.email}}))
        }else{
            dispatch(loginAction({message:data}))
        }
    } catch (error) {
        dispatch(loginAction({message:error.message}));
    }
}
export const updateMobileHandler = (payload) => async (dispatch,state)=> {

    try {
        let data = await AuthService.updateMobile(payload)
        console.log("🚀 ~ file: auth.js ~ line 278 ~ updateEmailHandler ~ data", data)
        if(data.status ===200){
            dispatch(loginAction({user:{...state().sign.user,mobile:data.profile.mobile},message:data.message}))
        }else if(data.status ===403){
            dispatch(loginAction({message:data.message}));     
           }else{
               dispatch(loginAction({message:data}));
           }
    } catch (error) {
        dispatch(loginAction({message:error.message}));
    }
}
export const updatePictureHandler = (payload) =>async (dispatch,state)=>{

    // let picture = await Profile.update('api/v1/profile/picture',payload,null,bearer)
    // console.log("🚀 ~ file: account.js ~ line 91 ~ updatePictureHandler ~ picture", picture)
    // let data = picture?picture.data:null;
    // console.log("🚀 ~ file: account.js ~ line 92 ~ updatePictureHandler ~ data", data.profile_picture)
    // if(data.status ===200){
    //     dispatch(updatePicture({updated:true,picture:data.profile_picture,profile:data.profile}))
    // }else{
    //     dispatch(updatePicture({update_profile:{message:{...data}}}))

    // }
    try {
        let data = await AuthService.updatePicture(payload);
        if(data.status ===200){
            dispatch(loginAction({user:{...state().sign.user,profile_picture:data.profile_picture}}))
        }else{
            dispatch(loginAction({message:data.message}))
        }
    } catch (error) {
        dispatch(loginAction({ message:error.message}))
    }
} 
export const deactivateProfileHandler = () =>async (dispatch,state)=>{

    // let data = await Profile.update('auth/deactivate',null,null,bearer)

    // if(data.data.status ===200){
    //     dispatch(deactivate({active:false,message:data.data.message}))
    // }else{
    //     dispatch(deactivate({active:true,message:data}))

    // }
    try {
        let data = await AuthService.deactivate();
        if(data.status ===403){
            console.log("🚀 ~ file: auth.js ~ line 320 ~ deactivateProfileHandler ~ data", data)
            dispatch(loginAction({message:data.message}))
        }else{
            console.log("🚀 ~ file: auth.js ~ line 320 ~ deactivateProfileHandler ~ data", data)
            dispatch(loginAction({message:data.message}))
        }
    } catch (error) {
        dispatch(loginAction({message:error.message}))
    }
} 


export default sign.reducer 
export const {loginAction,deleteMessage} = sign.actions

