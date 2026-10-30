# 複数人対戦の設計メモ

現行 starter のコードは1人用ゲームを実装しています。複数人対戦は以下の設計で追加します。

## 状態
- `waiting`: 参加者募集
- `playing`: 選択受付中
- `finished`: 結果確定
- `cancelled`: キャンセル

## Custom ID
- `game:join:<session_id>`
- `game:leave:<session_id>`
- `janken:choose:<session_id>:rock|scissors|paper`
- `dice:roll:<session_id>`
- `treasure:choose:<session_id>:A|B|C`

Custom ID には結果を入れず、サーバー側で抽選します。

## 必須検証
1. セッション存在
2. セッションが有効期限内
3. ゲーム状態が操作可能
4. 操作者が参加者である
5. ゲーム種別とボタン操作が一致
6. 同時操作・二重確定を防止

D1 の更新と Discord メッセージ編集を統合し、セッション確定を冪等にする必要があります。競合制御が複雑になった場合は Durable Objects をセッション単位で利用する案も検討します。
