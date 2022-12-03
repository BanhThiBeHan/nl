import { createApiClient } from "./api.service";

class MusicService {
    constructor(baseUrl = "/api/music") {
        this.api = createApiClient(baseUrl, true, "application/json");
    }
    async getAllMusic() {
        return (await this.api.get("/")).data;
    }
    async createMusic(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAllMusic() {
        return (await this.api.delete("/", data)).data;
    }
    async updateMusic(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async findOneMusic(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async deleteMusic(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async getMusicTypePage(type, id, page) {
        return (await this.api.get(`/${type}/${id}/${page}`)).data;
    }
    async getMusicPage(page) {
        return (await this.api.get(`/${page}`)).data;
    }
    
}
export default new MusicService();
