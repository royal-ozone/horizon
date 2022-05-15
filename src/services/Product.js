import ApiService from "./ApiService";
import cookie from 'react-cookies';

class Product extends ApiService {
    constructor(){
        super();
        this.path='api/v1';
    }
    async getParentCategory(){
        try {
            let response = await this.get(`${this.path}/getAll/PG`,null,null);
            return response;
        } catch (error) {
            return error.message;
        }
    }
    async getChildCategory(){
        try {
            let response = await this.get(`${this.path}/getAll/CG`,null,null);
            return response;
        } catch (error) {
            return error.message;
        }
    }
    async getGrandChildCategory(){
        try {
            let response = await this.get(`${this.path}/getAll/GCG`,null,null);
            return response;
        } catch (error) {
            return error.message
        }
    }
    async getProduct(){
        try {
            let response =await this.get(`${this.path}/products`,null,null);
            return response;
        } catch (error) {
            return error.message;
        }
    }
    async getProductByCategory(G,C,P){
        console.log("🚀 ~ file: Product.js ~ line 42 ~ Product ~ getProductByCategory ~ G,C,P", G,C,P)
        try {
            let params ={G:G,C:C,P:P}
            let response =await this.get(`${this.path}/productsByCategories`,params,null);
            console.log("🚀 ~ file: Product.js ~ line 45 ~ Product ~ getProductByCategory ~ params", params)
            console.log("🚀 ~ file: Product.js ~ line 45 ~ Product ~ getProductByCategory ~ response", response)
            return response;
        } catch (error) {
            return error.message;
        }
    }
}
let ProductService = new Product();
export default ProductService;