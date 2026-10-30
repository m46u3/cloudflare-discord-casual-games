import { button, row, response } from "../interactions/components";

const TREASURES = [
  { name: "🎉 大当たり！", weight: 10 },
  { name: "💎 レアアイテム！", weight: 20 },
  { name: "🍬 お菓子！", weight: 30 },
  { name: "🪨 石ころ……", weight: 40 }
];

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

function drawTreasure() {
  const total = TREASURES.reduce((sum, item) => sum + item.weight, 0);
  let random = randomInt(total);
  for (const item of TREASURES) {
    if (random < item.weight) return item;
    random -= item.weight;
  }
  return TREASURES[TREASURES.length - 1];
}

export function createTreasure() {
  return response("🎁 宝箱ゲーム！\n\nどの宝箱を開ける？", [
    row(
      button("宝箱 A", "treasure:A", 1),
      button("宝箱 B", "treasure:B", 1),
      button("宝箱 C", "treasure:C", 1)
    )
  ]);
}

export function openTreasure(chest: string) {
  const result = drawTreasure();
  return response(`あなたは宝箱 ${chest} を開けた！\n\n${result.name}`);
}
