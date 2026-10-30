const token = process.env.DISCORD_BOT_TOKEN;
const applicationId = process.env.APPLICATION_ID;
const guildId = process.env.GUILD_ID;

if (!token || !applicationId || !guildId) {
  throw new Error("DISCORD_BOT_TOKEN, APPLICATION_ID, GUILD_ID are required.");
}

const commands = [
  {
    name: "janken",
    description: "じゃんけんをします",
    options: [{
      name: "mode",
      description: "プレイ形式",
      type: 3,
      required: false,
      choices: [
        { name: "Botと対戦", value: "solo" },
        { name: "メンバーと対戦", value: "multi" }
      ]
    }]
  },
  {
    name: "dice",
    description: "サイコロを振ります",
    options: [{
      name: "mode",
      description: "プレイ形式",
      type: 3,
      required: false,
      choices: [
        { name: "Botと対戦", value: "solo" },
        { name: "メンバーと対戦", value: "multi" }
      ]
    }]
  },
  { name: "fortune", description: "今日の運勢を占います" },
  {
    name: "treasure",
    description: "宝箱を開けます",
    options: [{
      name: "mode",
      description: "プレイ形式",
      type: 3,
      required: false,
      choices: [
        { name: "1人で遊ぶ", value: "solo" },
        { name: "みんなで遊ぶ", value: "multi" }
      ]
    }]
  }
];

const response = await fetch(
  `https://discord.com/api/v10/applications/${applicationId}/guilds/${guildId}/commands`,
  {
    method: "PUT",
    headers: {
      "Authorization": `Bot ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commands)
  }
);

if (!response.ok) {
  throw new Error(`Command registration failed: ${response.status} ${await response.text()}`);
}

console.log("Guild commands registered.");
