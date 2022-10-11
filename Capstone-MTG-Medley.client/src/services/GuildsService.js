import { AppState } from "../AppState";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService";

class GuildsService {
  async createGuild(newGuild) {
    const res = await api.post("/api/guilds", newGuild);
    AppState.guilds = res.data;
    logger.log(res.data, AppState.guilds);
  }

  async getGuilds() {
    const res = await api.get("/api/guilds");
    AppState.guilds = res.data;
  }
  async getGuildById(guildId) {
    const res = await api.get(`api/guilds/${guildId}`);
    AppState.activeGuild = res.data;
  }

  async getGuildProfile(profileId) {
    logger.log("here?");
    const res = await api.get(`api/profiles/${profileId}/members`);
    logger.log("Guild Profile", res.data);
    // const guild = await this.getGuildById(res.data[0].guildId)
    // logger.log(AppState.activeGuild)
  }
}

export const guildsService = new GuildsService();
