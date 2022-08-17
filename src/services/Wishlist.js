import ApiService from "./ApiService";

class Wishlist extends ApiService {
    constructor() {
        super();
        this.path = 'api/v1/wishlist'

    }

    async getItems() {
        try {
            let result = await this.get(`${this.path}/get` )
            return result
        } catch (error) {
            return error.message
        }
    }
    async addItem (data) {
        try {
            let result = await this.post(`${this.path}/add`, data)
            return result
        } catch (error) {
            return error.message
        }
    }
    async deleteItem(item) {
        try {
            let result = await this.delete(`${this.path}/delete`, item)
            return result
        } catch (error) {
            return error.message
        }
    }
}

const NewWishlist = new Wishlist()

export default NewWishlist