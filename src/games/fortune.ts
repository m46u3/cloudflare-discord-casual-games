const FORTUNES = [
  { name: "大吉", message: "今日は最高の1日になりそう！", item: "星のアクセサリー" },
  { name: "中吉", message: "良いことがありそうな予感。", item: "お気に入りの飲み物" },
  { name: "小吉", message: "小さな幸せを見つけられる日。", item: "ハンカチ" },
  { name: "吉", message: "落ち着いて過ごすと良い日。", item: "青いもの" },
  { name: "末吉", message: "焦らず進めば大丈夫。", item: "温かい飲み物" },
  { name: "凶", message: "今日は無理せずゆっくり。", item: "お気に入りの音楽" },
  { name: "大凶", message: "今日は休息を大切にしよう。", item: "ふかふかの枕" }
] as const;

export async function getFortune(userId: string) {
  const date = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());

  const input = new TextEncoder().encode(`${userId}:${date}`);
  const hash = await crypto.subtle.digest("SHA-256", input);
  const bytes = new Uint8Array(hash);
  return FORTUNES[bytes[0] % FORTUNES.length];
}
