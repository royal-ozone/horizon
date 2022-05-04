// import ProfileService from '../services/Profile';
// import { createSlice } from "@reduxjs/toolkit";
// import cookie from 'react-cookies';


// let Account = createSlice({
//     name: 'account',
//     initialState:{user:{},message:''},
//     reducers:{
//         getProfile(state,action){
//             let data =action.payload;
//             if(data.profile){

//                 cookie.save('profile',data.profile);
//                 return action.payload
//             }else{
//                 console.log("🚀 ~ file: account.js ~ line 19 ~ getProfile ~ action.payload", action.payload)
//                 return {res:action.payload};
//             }

//         },
//         updateProfile(state,action){           
//            // cookie.save('profile',action.payload.profile)
//             console.log("🚀 ~ file: account.js ~ line 28 ~ updateProfile ~ action.payload", action.payload)
//             return  action.payload.profile;
//         },
//         updateEmail(state,action){
//             return action.payload
//         },
//         updatePicture(state,action){
//         console.log("🚀 ~ file: account.js ~ line 33 ~ updatePicture ~ action", action.payload)
//         return action.payload
            
//         },
//         deactivate(state,action){
//             console.log("🚀 ~ file: account.js ~ line 40 ~ deactivate ~ action.payload", action.payload)
//             return action.payload
//         }
//     }
// })

// export const myProfileHandler =(payload) => async (dispatch,state) => {
//     try {
//         let data =await ProfileService.getProfile();
//         if(data.status ===200){
            
//         }
//     } catch (error) {
        
//     }

//     // (async()=>{
//     //     let data = await  Profile.second_get('auth/profile',null,bearer);
//     //     let promise = await Promise.all([data]);
//     //     if(promise[0].status===200 ){
            
//     //         dispatch(getProfile({profile:data}))

//     //     }
//     //     if(promise[0].status===403){

//     //         dispatch(getProfile( {message :promise[0] }))
//     //     }
        
        
//     // })()
// }
// export const updateProfileHandler = (payload) =>async (dispatch,state)=> {
//     try {
        
//         // (async()=>{
//             let res = await Profile.update('auth/update/profile',payload,null,bearer)
//             console.log("🚀 ~ file: account.js ~ line 65 ~ // ~ res", res)
//             if(res.status === 200){
    
//                 dispatch(updateProfile({updated:true,profile:{...res.data},picture:res.data.picture.profile_picture}))
//             }
//             else{
//                 dispatch(updateProfile({message:res.message}))
    
//             }
            
//         // })()
//     } catch (error) {
        
//     }
   
// }
// export const updateEmailHandler = (payload) => (dispatch,state)=> {
//     (async()=>{
//         let data =await Profile.update('auth/user/email',payload,null,bearer)
//         dispatch(updateProfile(data))
        
//     })()
// }

// export const updatePictureHandler = (payload) =>async (dispatch,state)=>{

//     let picture = await Profile.update('api/v1/profile/picture',payload,null,bearer)
//     console.log("🚀 ~ file: account.js ~ line 91 ~ updatePictureHandler ~ picture", picture)
//     let data = picture?picture.data:null;
//     console.log("🚀 ~ file: account.js ~ line 92 ~ updatePictureHandler ~ data", data.profile_picture)
//     if(data.status ===200){
//         dispatch(updatePicture({updated:true,picture:data.profile_picture,profile:data.profile}))
//     }else{
//         dispatch(updatePicture({update_profile:{message:{...data}}}))

//     }
// } 

// export const deactivateProfileHandler = () =>async (dispatch,state)=>{

//     let data = await Profile.update('auth/deactivate',null,null,bearer)

//     if(data.data.status ===200){
//         dispatch(deactivate({active:false,message:data.data.message}))
//     }else{
//         dispatch(deactivate({active:true,message:data}))

//     }
// } 

// export default Account.reducer
// export const {getProfile,updateProfile,updateEmail,updatePicture,deactivate} = Account.actions