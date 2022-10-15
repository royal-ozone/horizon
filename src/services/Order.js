import ApiService from "./ApiService";


class Order extends ApiService {
    constructor() {
        super();
        this.path = "api/v1"
    }

    async placeOrder(data){
        try {
            let result = await this.post(`${this.path}/addOrder`, data)
            return result
        } catch (error) {
            return error.message
        }
    }
    async getOrders(data) {
        try {
            let result = await this.get(`${this.path}/orders`, data)
            return result
        } catch (error) {
            return error.message
        }
    }
    async orderLogs (id) {
        try {
            let result = await this.get(`${this.path}/order/logs/${id}`)
            return result
        } catch (error) {
            return error.message
        }
    }
}

export default new Order()