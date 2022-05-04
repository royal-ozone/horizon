import axios from 'axios';
import { isJwtExpired } from 'jwt-check-expiration';
import cookie from 'react-cookies';
import { endSession } from '../store/auth';
let api = process.env.REACT_APP_API;

export default class ApiService {
 
    async get(endpoint, params,headers){
     let res = await axios({
            method: 'get',
            url: `${api}/${endpoint}`,
            params:params,
            headers:headers
          })
        
          return res.data
    }

    // async second_get(endpoint, params,token){
    //   let res = await axios({
    //          method: 'get',
    //          url: `${api}/${endpoint}`,
    //          params:params,
    //          headers: {
    //            Authorization: 'Bearer ' + token
    //          }
             
    //        })
         
    //        return res.data
    //  }
    async post(endpoint,data,headers,params=null){
     let res = await axios({
            method: 'post',
            url: `${api}/${endpoint}`,
            data: data,
            params:params,
            headers: headers,
            
          });
          return res.data
    }
    // async basicPost(endpoint,params,data){
    //   let res = await axios({
    //          method: 'post',
    //          url: `${api}/${endpoint}`,
    //          data: data,
    //          params:params,
    //          headers:{Authorization:` Basic ${btoa(`${data?data.email:null}:${data?data.password:null}`)}`}
            
             
    //        });
          
    //        return res.data
    //  }
    async update(endpoint,data,headers,params=null){
        let res = await axios({
            method: 'put',
            url: `${api}/${endpoint}`,
            params:params,
            data: data,
            headers: headers, 
          });
          return res.data
    }

    async delete(endpoint,params,headers){
        let res = await axios({
            method: 'delete',
            url: `${api}/${endpoint}`,
            params:params,
            headers: headers,
           
          });
          return res.data
    }
    session(){
      let session_id = cookie.load('session_id');

      return session_id
    }

    bearer(token){
      return {session_id:cookie.load('session_id') ,Authorization: `Bearer ${token}`}
    }
    basic(data){
      return { Authorization: ` Basic ${btoa(`${data.email}:${data.password}`)}` }
    }

    async token(){
      let accessToken = cookie.load('access_token');
      let refreshToken = cookie.load('refresh_token');
      let session_id = cookie.load('session_id');
      if(!isJwtExpired) return accessToken
      else if(isJwtExpired(refreshToken)){
        endSession()
      }
      else{
        let result = await this.post('auth/refresh',null,this.bearer(refreshToken,session_id));
        cookie.save('access_token',result.access_token);
        cookie.save('refresh_token', result.refresh_token)  

        return result.access_token;
      }
    }

    

}

