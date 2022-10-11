import { AppState } from "../AppState";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService";

class MembersService {
  async getGuildMembers(guildId) {
    const res = await api.get(`/api/guilds/${guildId}/members`);
    AppState.members = res.data;
    logger.log(res.data);
  }

  async joinGuild(newMember) {
    logger.log(newMember);
    const res = await api.post("/api/members", newMember);
    AppState.members.push(res.data);
    AppState.activeGuild.members++;
  }

  async removeFromGuild(removedMemberId) {
    const res = await api.delete(`/api/members/${removedMemberId}`);
    AppState.members = AppState.members.filter((m) => m.id != removedMemberId);
    AppState.activeGuild.members--;
  }
}

export const membersService = new MembersService();
