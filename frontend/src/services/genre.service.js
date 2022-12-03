import { createApiClient } from "./api.service";

class GenreService {
    constructor(baseUrl = "/api/genre") {
        this.api = createApiClient(baseUrl, true, "application/json");
    }
    async getAllGenre() {
        return (await this.api.get("/")).data;
    }
    async createGenre(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAllGenre() {
        return (await this.api.delete("/")).data;
    }
    async updateGenre(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async findOneGenre(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async deleteGenre(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    
}
export default new GenreService();
