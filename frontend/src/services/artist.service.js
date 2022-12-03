import { createApiClient } from "./api.service";

class ArtistService {
    constructor(baseUrl = "/api/artist") {
        this.api = createApiClient(baseUrl, true, "application/json");
    }
    async getAllArtist() {
        return (await this.api.get("/")).data;
    }
    async createArtist(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAllArtist() {
        return (await this.api.delete("/")).data;
    }
    async updateArtist(id,data) {
        return (await this.api.put(`/${id}`,data)).data;
    }
    async findOneArtist(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async deleteArtist(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    
}
export default new ArtistService();
