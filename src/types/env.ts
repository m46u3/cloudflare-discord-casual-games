export interface Env {
  DB: D1Database;
  DISCORD_PUBLIC_KEY: string;
  DISCORD_BOT_TOKEN: string;
}

export interface DiscordUser {
  id: string;
  username: string;
  global_name?: string;
  bot?: boolean;
}

export interface DiscordInteraction {
  id: string;
  application_id: string;
  type: number;
  guild_id?: string;
  channel_id?: string;
  token: string;
  member?: { user: DiscordUser };
  user?: DiscordUser;
  data?: {
    name?: string;
    custom_id?: string;
    options?: Array<{
      name: string;
      type?: number;
      value?: string | number | boolean;
    }>;
  };
}
