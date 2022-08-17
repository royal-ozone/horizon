import ApiService from "./ApiService";

class Discount extends ApiService {
    constructor() {
        super();
        this.path = 'api/v1/checkCode'
    }

    async checkCode(data){
        try {
            let result = await this.post(this.path, data)
            return result
        } catch (error) {
            return error.message
        }
    }
}

// const NewDiscount = new Discount()

export default new Discount()