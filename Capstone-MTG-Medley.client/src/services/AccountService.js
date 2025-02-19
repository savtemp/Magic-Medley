import { AppState } from "../AppState";
import { Account } from "../models/Account";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class AccountService {
  async getAccount() {
    try {
      const res = await api.get("/account");
      AppState.account = res.data;
    } catch (err) {
      logger.error("HAVE YOU STARTED YOUR SERVER YET???", err);
    }
  }

  async sendMessage(message) {
    const res = await api.post("/guild", message);
    AppState.message.unshift(res.data);
  }

  async edit(accountData) {
    const res = await api.put("/account", accountData);
    AppState.account = new Account(res.data);
    logger.log(AppState.account);
  }
}

export const accountService = new AccountService();
