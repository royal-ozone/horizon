import ApiService from "./ApiService";


class Order extends ApiService {
    constructor() {
        super();
        this.path = "api/v1/addOrder"
    }

    async placeOrder(data){
        try {
            let result = await this.post(this.path, data)
            return result
        } catch (error) {
            return error.message
        }
    }
}

export default new Order()