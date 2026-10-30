import { button, row, response } from "../interactions/components";

export type Hand = "rock" | "scissors" | "paper";
const HANDS: Hand[] = ["rock", "scissors", "paper"];
const LABELS: Record<Hand, string> = {
  rock: "✊ グー",
  scissors: "✌️ チョキ",
  paper: "✋ パー"
};

function randomIndex(max: number): number {
  const limit = Math.floor(0x100000000 / max) * max;
  const values = new Uint32Array(1);
  let value: number;
  do {
    crypto.getRandomValues(values);
    value = values[0];
  } while (value >= limit);
  return value % max;
}

export function createJanken() {
  return response("じゃんけん！好きな手を選んでね。", [
    row(
      button(LABELS.rock, "janken:rock", 1),
      button(LABELS.scissors, "janken:scissors", 1),
      button(LABELS.paper, "janken:paper", 1)
    )
  ]);
}

export function playJanken(player: Hand) {
  const bot = HANDS[randomIndex(HANDS.length)];
  let result: string;

  if (player === bot) result = "引き分け！";
  else if (
    (player === "rock" && bot === "scissors") ||
    (player === "scissors" && bot === "paper") ||
    (player === "paper" && bot === "rock")
  ) result = "あなたの勝ち！🎉";
  else result = "Bot の勝ち！";

  return response(
    [`あなた：${LABELS[player]}`, `Bot：${LABELS[bot]}`, "", result].join("\n")
  );
}
