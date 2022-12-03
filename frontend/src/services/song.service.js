import { createApiClient } from "./api.service";

class SongService {
    constructor(baseUrl = "/api/song") {
		this.api = createApiClient(baseUrl, true, "multipart/form-data");
	}
    async uploadSong(song) {
        return (await this.api.post("/uploadSong", song)).data;
    }
}
export default new SongService();