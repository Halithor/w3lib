import { Timer } from "../handles/timer";

let elapsedTime = 0.0;

const gameTimer = new Timer().startPeriodic(30, () => {
  elapsedTime += 30;
});

export function getElapsedTime() {
  return elapsedTime + gameTimer.elapsed;
}
