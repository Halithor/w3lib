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

const previousGolds: number[] = [];
/** Fires whenever a player's resource value changes, both on gain and expenditure. */
export const eventPlayerResourceGold = playerEvent(
  (trg, p) => {
    previousGolds[p.id] = 0;
    trg.registerPlayerStateEvent(p, PLAYER_STATE_RESOURCE_GOLD, NOT_EQUAL, 0.0);
    trg.registerPlayerStateEvent(p, PLAYER_STATE_RESOURCE_GOLD, EQUAL, 0.0);
  },
  () => {
    const p = MapPlayer.eventTriggering;
    const income = p.gold - previousGolds[p.id];
    previousGolds[p.id] = p.gold;
    return {
      player: p,
      goldIncome: income,
    };
  },
);

const previousLumbers: number[] = [];
/** Fires whenever a player's resource value changes, both on gain and expenditure. */
export const eventPlayerResourceLumber = playerEvent(
  (trg, p) => {
    previousLumbers[p.id] = 0;
    trg.registerPlayerStateEvent(
      p,
      PLAYER_STATE_RESOURCE_LUMBER,
      NOT_EQUAL,
      0.0,
    );
    trg.registerPlayerStateEvent(p, PLAYER_STATE_RESOURCE_LUMBER, EQUAL, 0.0);
  },
  () => {
    const p = MapPlayer.eventTriggering;
    const income = p.lumber - previousLumbers[p.id];
    previousLumbers[p.id] = p.lumber;
    return {
      player: p,
      lumberIncome: income,
    };
  },
);

const previousFoodUsed: number[] = [];
/** Fires whenever a player's resource value changes, both on gain and expenditure. */
export const eventPlayerResourceFoodUsed = playerEvent(
  (trg, p) => {
    previousFoodUsed[p.id] = 0;
    trg.registerPlayerStateEvent(
      p,
      PLAYER_STATE_RESOURCE_FOOD_USED,
      NOT_EQUAL,
      0.0,
    );
    trg.registerPlayerStateEvent(
      p,
      PLAYER_STATE_RESOURCE_FOOD_USED,
      EQUAL,
      0.0,
    );
  },
  () => {
    const p = MapPlayer.eventTriggering;
    const income = p.foodUsed - previousFoodUsed[p.id];
    previousFoodUsed[p.id] = p.foodUsed;
    return {
      player: p,
      foodUsedChange: income,
    };
  },
);

const previousFoodCap: number[] = [];
/** Fires whenever a player's resource value changes, both on gain and expenditure. */
export const eventPlayerResourceFoodCap = playerEvent(
  (trg, p) => {
    previousFoodCap[p.id] = 0;
    trg.registerPlayerStateEvent(
      p,
      PLAYER_STATE_RESOURCE_FOOD_CAP,
      NOT_EQUAL,
      0.0,
    );
    trg.registerPlayerStateEvent(p, PLAYER_STATE_RESOURCE_FOOD_CAP, EQUAL, 0.0);
  },
  () => {
    const p = MapPlayer.eventTriggering;
    const income = p.foodCap - previousFoodCap[p.id];
    previousFoodCap[p.id] = p.foodCap;
    return {
      player: p,
      foodCapChange: income,
    };
  },
);
