import type { DiscordInteraction, Env } from "../types/env";
import { ephemeral } from "./components";
import { createJanken, playJanken, type Hand } from "../games/janken";
import { createDice, playDice } from "../games/dice";
import { getFortune } from "../games/fortune";
import { createTreasure, openTreasure } from "../games/treasure";

export async function routeInteraction(
  interaction: DiscordInteraction,
  _env: Env
) {
  if (interaction.type === 2) {
    const command = interaction.data?.name;
    switch (command) {
      case "janken":
        return createJanken();
      case "dice":
        return createDice();
      case "fortune": {
        const user = interaction.member?.user ?? interaction.user;
        if (!user) return ephemeral("ユーザー情報を取得できませんでした。");
        const fortune = await getFortune(user.id);
        return {
          type: 4,
          data: {
            content: [
              "🔮 今日の運勢",
              "",
              `運勢：${fortune.name}`,
              fortune.message,
              "",
              `ラッキーアイテム：${fortune.item}`
            ].join("\n")
          }
        };
      }
      case "treasure":
        return createTreasure();
      default:
        return ephemeral("そのコマンドは未対応です。");
    }
  }

  if (interaction.type === 3) {
    const customId = interaction.data?.custom_id;
    if (!customId) return ephemeral("操作を識別できませんでした。");

    if (customId.startsWith("janken:")) {
      const hand = customId.split(":")[1] as Hand;
      if (!["rock", "scissors", "paper"].includes(hand)) {
        return ephemeral("無効な手です。");
      }
      return playJanken(hand);
    }

    if (customId === "dice:roll") return playDice();

    if (customId.startsWith("treasure:")) {
      const chest = customId.split(":")[1];
      if (!["A", "B", "C"].includes(chest)) {
        return ephemeral("無効な宝箱です。");
      }
      return openTreasure(chest);
    }
  }

  return ephemeral("未対応の操作です。");
}
