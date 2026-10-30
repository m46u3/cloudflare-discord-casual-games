import { button, row, response } from "../interactions/components";

function randomInt(max: number): number {
  const limit = Math.floor(0x100000000 / max) * max;
  const values = new Uint32Array(1);
  let value: number;
  do {
    crypto.getRandomValues(values);
    value = values[0];
  } while (value >= limit);
  return value % max;
}

export function createDice() {
  return response("サイコロを振ってみよう！", [
    row(button("🎲 振る", "dice:roll", 1))
  ]);
}

export function playDice() {
  const player = randomInt(6) + 1;
  const bot = randomInt(6) + 1;
  const result = player > bot
    ? "あなたの勝ち！🎉"
    : player < bot
      ? "Bot の勝ち！"
      : "引き分け！";

  return response(
    [`あなた：🎲 ${player}`, `Bot：🎲 ${bot}`, "", result].join("\n")
  );
}
