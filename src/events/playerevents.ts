import { MapPlayer, Players, Trigger } from "../handles/index";
import { Event } from "./event";

function playerEvent<T>(
  register: (trg: Trigger, p: MapPlayer) => void,
  extractor: () => T,
): Event<T> {
  return new Event<T>((emit) => {
    const trg = new Trigger();
    trg.addAction(() => emit(extractor()));
    for (let i = 0; i < bj_MAX_PLAYERS; i++) {
      const p = Players[i];
      register(trg, p);
    }
    return () => trg.destroy();
  });
}

export const eventPlayerChat = playerEvent(
  (trg, p) => trg.registerPlayerChatEvent(p, "", false),
  () => ({
    player: MapPlayer.eventTriggering,
    message: GetEventPlayerChatString(),
  }),
);

export const eventPlayerLeaves = playerEvent(
  (trg, p) => trg.registerPlayerEvent(p, EVENT_PLAYER_LEAVE),
  () => ({ player: MapPlayer.eventTriggering }),
);
