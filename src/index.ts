import type { Env, DiscordInteraction } from "./types/env";
import { verifyDiscordRequest } from "./interactions/verify";
import { routeInteraction } from "./interactions/router";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== "/interactions") {
      return new Response("Not Found", { status: 404 });
    }
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const valid = await verifyDiscordRequest(
      request,
      env.DISCORD_PUBLIC_KEY
    );
    if (!valid) {
      return new Response("Invalid signature", { status: 401 });
    }

    const interaction = await request.json() as DiscordInteraction;

    // Discord PING for endpoint verification
    if (interaction.type === 1) {
      return Response.json({ type: 1 });
    }

    const result = await routeInteraction(interaction, env);
    return Response.json(result);
  }
};
