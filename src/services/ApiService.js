import axios from 'axios';

let api = process.env.REACT_APP_API;

export default class ApiService {
 
    async get(endpoint, params){
     let res = await axios({
            method: 'get',
            url: `${api}/${endpoint}`,
            params:params
          })
        
          return res.data
    }
    async post(endpoint,params,data){
     let res = await axios({
            method: 'post',
            url: `${api}/${endpoint}`,
            data: data,
            params:params
            
          });
          return res.data
    }
    async update(endpoint,data,params=null){
        let res = await axios({
            method: 'put',
            url: `${api}/${endpoint}`,
            params:params,
            data: data
           
          });
          return res.data
    }

    async delete(endpoint,params ){
        let res = await axios({
            method: 'delete',
            url: `${api}/${endpoint}`,
            params:params
           
          });
          return res.data
    }

}

