import ApiService from "./ApiService";

class Store extends ApiService {
    constructor() {
        super();
        this.path = 'api/v1/store';
    }
    async getStore(id) {
        console.log("🚀 ~ file: Store.js ~ line 9 ~ Store ~ getStore ~ id", id)
        try {
            let result = await this.get(`${this.path}/id/${id}`)
           
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new Store()