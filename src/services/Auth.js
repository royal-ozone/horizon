import ApiService from "./ApiService";
import cookie from 'react-cookies';
 class Auth extends ApiService {
    constructor(){
       super();
       this.path='auth';
       this.path2='api/v1';
       this.token=cookie.load('access_token');
    }
    async register(data){
        try {
            let response = await this.post(`${this.path}/signup`,data);
            return response;
        } catch (error) {
            return error;
        }
    }
    async getProfile(){
        try {
            let response = await this.get(`${this.path}/profile`,null,this.bearer(this.token));
            return response;
        } catch (error) {
            return error;
        }
    }
    async updateProfileInfo(data){
        try {
            let response =await this.update(`${this.path}/update/profile`,data,this.bearer(this.token));
            return response;
        } catch (error) {
            return error;
        }
    }
    async updateEmail(data){
        try {
            let response =await this.update(`${this.path}/user/email`,data,this.bearer(this.token));
            return response;
        } catch (error) {
            return error;
        }
    }
    async updateMobile(data){
        try {
            let response =await this.update(`${this.path}/user/mobile`,data,this.bearer(this.token));
            return response;
        } catch (error) {
            return error;
        }
    }
    async insertAddress(data){
        try {
            let response =await this.post(`${this.path2}/add/address`,data,this.bearer(this.token));
            return response;
        } catch (error) {
            return error;
        }
    }
    async getAddress(){
        try {
            let response =await this.get(`${this.path2}/get/address`,null,this.bearer(this.token));
            return response;
        } catch (error) {
            return error;
        }
    }
    async updateAddress(data){
        try {
            let response =await this.update(`${this.path2}/update/address`,data,this.bearer(this.token));
            console.log("🚀 ~ file: Auth.js ~ line 69 ~ Auth ~ updateAddress ~ response", response)
            return response;
        } catch (error) {
            return error;
        }
    }
    async removeAddress(data){
        try {
            let response =await this.update(`${this.path2}/remove/address`,data,this.bearer(this.token));
            return response;
        } catch (error) {
            return error;
        }
    }
    async updatePicture(data){
        try {
            let response =await this.update(`${this.path2}/profile/picture`,data,this.bearer(this.token));
            return response;
        } catch (error) {
            return error;
        }
    }
    async removePicture(data){
        try {
            let response =await this.delete(`${this.path2}/profile/picture`,data,this.bearer(this.token));
            return response;
        } catch (error) {
            return error;
        }
    }
    async deactivate(){
        try {
            let response =await this.update(`${this.path}/deactivate`,null,this.bearer(this.token));
            return response;
        } catch (error) {
            return error;
        }
    }
    async verification(){
        try {
            let response = await this.post(`${this.path}/user/verification`,null,this.bearer(this.token));
            return response;
        } catch (error) {
            return error;
        }
    }
    async verify(data){
        try {
            let response = await this.post(`${this.path}/user/verify`,data,this.bearer(this.token));
            return response;
        } catch (error) {
            return error;
        }
    }
    async login(data){
        try {
            let response = await this.post(`${this.path}/signin`,null,this.basic(data));
            return response;
        } catch (error) {
            return error; 
        }
    }
    async logout(){
        try {
            let response = await this.post(`${this.path}/signout`,null,this.bearer(this.token));
            return response;
        } catch (error) {
            return error;
        }
    }
}

let AuthService = new Auth();
export default AuthService;
