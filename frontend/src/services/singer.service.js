import { createApiClient } from "./api.service";

class SingerService {
    constructor(baseUrl = "/api/singer") {
        this.api = createApiClient(baseUrl, true, "application/json");
    }
    async getAllSinger() {
        return (await this.api.get("/")).data;
    }
    async createSinger(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAllSinger() {
        return (await this.api.delete("/")).data;
    }
    async updateSinger(id,data) {
        return (await this.api.put(`/${id}`,data)).data;
    }
    async findOneSinger(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async deleteSinger(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    
}
export default new SingerService();
