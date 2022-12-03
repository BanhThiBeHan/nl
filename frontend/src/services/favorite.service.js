import { createApiClient } from "./api.service";

class FavoriteService {
    constructor(baseUrl = "/api/favorite") {
        this.api = createApiClient(baseUrl, true, "application/json");
    }
    async getFavoriteUser(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async createFavorite(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteFavorite(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async deleteAllFavorite() {
        return (await this.api.delete("/")).data;
    }
}
export default new FavoriteService();
