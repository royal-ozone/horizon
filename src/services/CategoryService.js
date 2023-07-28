import ApiService from "./ApiService";

export default class CategoryService extends ApiService{
    constructor(){
        super();
        this.path = "category";
    }

    async getAllCategoires(limit = 10, offset= 0){
       
        try { 
            let res = await this.get(`${this.path}/list`, {offset: offset, limit:limit}); 
            return res;
        } catch (error) {
            throw new Error(error.message); 
        }
    }

    async getCategoryById(id){
        try { 
            let res = await this.get(`${this.path}/ids/${id}/`);  
            return res;
        } catch (error) {
            throw new Error(error.message); 
        }
    }
    async getCategoryAttribute(){
        try { 
            let res = await this.get(`${this.path}/attribute/list`);  
            return res;
        } catch (error) {
            throw new Error(error.message); 
        }
    }
    async deleteCategory(id){
        try { 
            let res = await this.delete(`${this.path}/${id}`); 
            return res.data;
        } catch (error) {
            throw new Error(error.message); 
        }
    }
    async deleteCategoryAttribute(id){
        try { 
            let res = await this.delete(`${this.path}/attribute/${id}`); 
            return res.data;
        } catch (error) {
            throw new Error(error.message); 
        }
    }
    async updateCategory(data){
        try { 
            let res = await this.update(`${this.path}`, data); 
            return res.data;
        } catch (error) {
            throw new Error(error.message); 
        }
    }
    async updateCategoryAttribute(data){
        try { 
            let res = await this.update(`${this.path}`, data); 
            return res.data;
        } catch (error) {
            throw new Error(error.message); 
        }
    }
    async addCategory(data){
        try { 
            let res = await this.post(`${this.path}`, data); 
            return res.data;
        } catch (error) {
            throw new Error(error.message); 
        }
    }
    async addCategoryAttribute(data){
        try { 
            let res = await this.post(`${this.path}`, data); 
            return res.data;
        } catch (error) {
            throw new Error(error.message); 
        }
    }
}