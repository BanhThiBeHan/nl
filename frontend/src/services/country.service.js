import { createApiClient } from "./api.service";

class CountryService {
    constructor(baseUrl = "/api/country") {
        this.api = createApiClient(baseUrl, true, "application/json");
    }
    async getAllCountry() {
        return (await this.api.get("/")).data;
    }
    async createCountry(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAllCountry() {
        return (await this.api.delete("/")).data;
    }
    async updateCountry(id,data) {
        return (await this.api.put(`/${id}`,data)).data;
    }
    
    async findOneCountry(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async deleteCountry(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    
}
export default new CountryService();
