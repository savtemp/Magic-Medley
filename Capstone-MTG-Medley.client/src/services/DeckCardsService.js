import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class DeckCardsService {
  async createDeckCard(deckCard) {
    const res = await api.post("api/deckCards", deckCard);
    logger.log(res.data);
    AppState.deckCards.push(res.data);
  }

  async getDeckCards(deckId) {
    const res = await api.get("api/decks/" + deckId + "/deckCards");
    AppState.deckCards = res.data;
    logger.log("Deck Cards", res.data);
  }

  async removeCard(cardId) {
    const res = await api.delete("api/deckCards/" + cardId);
    AppState.deckCards = AppState.deckCards.filter((c) => c.id != cardId);
    return res;
  }
}
export const deckCardsService = new DeckCardsService();
