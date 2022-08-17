import ApiService from "./ApiService";


class Cart extends ApiService {
    constructor() {
        super();
        this.path = 'api/v1/cart_item';
        this.cartPath = 'api/v1/cart'
    }

    async addCartItem(data) {
        try {
            let result = await this.post(`${this.path}/add`, data);
            return result
        } catch (error) {
            return error
        }
    }
    async removeCartItem(data) {
        try {
            let result = await this.delete(`${this.path}/remove`, data);
            return result;
        } catch (error) {
            return error
        }
    }
    async getCartItems() {
        try {
            let result = await this.get(`${this.path}/getAll`);
            return result;
        } catch (error) {
            return error
        }
    }
    async updateCartItem(data) {
        try {
            let result = await this.update(`${this.path}/update`, data)
            return result;
        } catch (error) {
            return error
        }
    }
    async updateCart (data){
        try {
            let result = await this.update(`${this.cartPath}/update`, data)
            return result;
        } catch (error) {
            return error
        }
    }

}
const NewCart = new Cart();
export default NewCart