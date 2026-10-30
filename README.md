# Cloudflare Workers Discord Casual Games Bot

TypeScript + Cloudflare Workers + D1 の Discord Bot 雛形です。1人用のじゃんけん、サイコロ、今日の運勢、宝箱ゲームを実装しています。

> 注意: この ZIP はゲーム機能の starter project です。複数人対戦のセッション管理は設計資料を含みますが、まだ統合実装されていません。通常メッセージの Gateway 監視も含みません。

## 前提
- Node.js LTS
- npm
- Cloudflare アカウント
- Discord Developer Portal で作成したアプリケーション

## セットアップ
```bash
npm install
npx wrangler d1 create discord-bot-db
```
作成時に表示された database ID を `wrangler.jsonc` に設定してください。

```bash
npx wrangler secret put DISCORD_PUBLIC_KEY
npx wrangler secret put DISCORD_BOT_TOKEN
```

ローカル D1 migration:
```bash
npx wrangler d1 migrations apply discord-bot-db --local
```

開発:
```bash
npm run dev
```

デプロイ:
```bash
npx wrangler deploy
```

本番 D1 migration:
```bash
npx wrangler d1 migrations apply discord-bot-db --remote
```

Workers の URL に `/interactions` を付けた値を Discord Developer Portal の Interactions Endpoint URL に設定します。

## コマンド登録
`APPLICATION_ID`、`GUILD_ID`、`DISCORD_BOT_TOKEN` を環境変数に設定してから:
```bash
npm run register:commands
```
Guild command は開発用です。Global command にする場合は登録スクリプトの endpoint を変更してください。

## 実装内容
- `/janken` - Bot 対戦
- `/dice` - Bot 対戦
- `/fortune` - ユーザー・日本日付単位で固定される運勢
- `/treasure` - 3つの宝箱から選択
- Discord Ed25519 request signature verification
- D1 schema for game sessions and players

## 注意点
- Discord interaction は初回応答を原則3秒以内に返す必要があります。
- この starter はメッセージ監視 Gateway を実装していません。通常メッセージイベントが必要な場合は別途 Gateway クライアントが必要です。
- 複数人プレイ、同時操作の排他制御、期限切れセッション清掃、メッセージ編集などは拡張項目です。
- 宝箱の抽選はサーバー側で行います。クライアントから結果を指定できる設計にはしないでください。
