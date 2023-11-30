/** @noSelfInFile */

import { addScriptHook, W3TS_HOOK } from "../hooks/index";
import { Players, Unit } from "../handles/index";
import { unitId } from "../common";
import { vec2 } from "../math/index";

export enum GameStatus {
  OFFLINE = "offline",
  ONLINE = "online",
  REPLAY = "replay",
}

let status = GameStatus.ONLINE;

export function getGameStatus(): GameStatus {
  return status;
}

function beforeMain() {
  // Find a player
  const p = Players.find((p) => p.isIngame());
  if (p == null) return;

  // Force the player to select a unit
  const u = new Unit(p, unitId("hfoo"), vec2(0, 0));
  p.selectUnitSingle(u);
  const selected = u.isSelected(p);
  u.destroy();

  if (selected) {
    if (ReloadGameCachesFromDisk()) {
      status = GameStatus.OFFLINE;
    } else {
      status = GameStatus.REPLAY;
    }
  } else {
    status = GameStatus.ONLINE;
  }
}

addScriptHook(W3TS_HOOK.MAIN_BEFORE, beforeMain);
