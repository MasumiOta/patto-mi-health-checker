# プロジェクト設定

## 基本設定
```yaml
プロジェクト名: ぱっと見ヘルスケア
開始日: 2025-11-01
技術スタック:
  frontend: React 18 + TypeScript 5 + MUI v6 + MUI X Charts
  backend: なし（完全クライアントサイド）
  database: なし（localStorage使用）
  authentication: なし（MVP段階）
```

## 開発環境
```yaml
ポート設定:
  # 複数プロジェクト並行開発のため、一般的でないポートを使用
  frontend: 3247
  backend: なし
  database: なし

環境変数:
  設定ファイル: .env.local（ルートディレクトリ）
  必須項目:
    - なし（完全クライアントサイドのため）
```

## テスト認証情報
```yaml
開発用アカウント:
  # MVP段階では認証なし

外部サービス:
  なし: 完全クライアントサイドで動作
```

## コーディング規約

### 命名規則
```yaml
ファイル名:
  - コンポーネント: PascalCase.tsx (例: Dashboard.tsx, HealthDataCard.tsx)
  - ユーティリティ: camelCase.ts (例: healthStandards.ts, dataValidation.ts)
  - 定数: UPPER_SNAKE_CASE.ts (例: HEALTH_STANDARDS.ts)

変数・関数:
  - 変数: camelCase (例: healthData, latestRecord)
  - 関数: camelCase (例: evaluateBMI, saveHealthData)
  - 定数: UPPER_SNAKE_CASE (例: MAX_WEIGHT, MIN_HEART_RATE)
  - 型/インターフェース: PascalCase (例: HealthRecord, HealthMetric)
```

### コード品質
```yaml
必須ルール:
  - TypeScript: strictモード有効
  - 未使用の変数/import禁止
  - console.log本番環境禁止
  - エラーハンドリング必須
  - localStorage操作は必ずtry-catchで囲む

フォーマット:
  - インデント: スペース2つ
  - セミコロン: あり
  - クォート: シングル
```

### コミットメッセージ
```yaml
形式: [type]: [description]

type:
  - feat: 新機能
  - fix: バグ修正
  - docs: ドキュメント
  - style: フォーマット
  - refactor: リファクタリング
  - test: テスト
  - chore: その他

例: "feat: ダッシュボードの健康指標カード実装"
```

## プロジェクト固有ルール

### データ保存規則
```yaml
localStorage:
  - キー名: 'health-records', 'user-settings', 'disclaimer-accepted'
  - データ形式: JSON
  - 保存前にバリデーション必須
  - 読み込み時はtry-catchでエラーハンドリング

データ構造:
  - HealthRecord[]: 健康データの配列（timestamp順にソート）
  - UserSettings: ユーザー設定（身長、年齢、性別など）
```

### 健康指標の判定
```yaml
基準値データ:
  - src/constants/healthStandards.ts に集約
  - 日本の医学的基準に基づく
  - 定期的に公的機関のガイドラインを確認して更新

色分けルール:
  - 正常: green (#4caf50)
  - 注意: yellow (#ff9800)
  - 警告: red (#f44336)
```

### グラフ表示
```yaml
ライブラリ: MUI X Charts
必須設定:
  - isAnimationActive: false（PDF生成時の互換性）
  - レスポンシブ対応
  - 色分け表示（piecewise colorMap使用）
```

## 🆕 最新技術情報（知識カットオフ対応）
```yaml
MUI X Charts:
  - バージョン: v7以降
  - MUI v6完全互換
  - piecewise colorMap機能あり

React 18:
  - Strict Mode対応
  - useEffect依存配列の厳密なチェック

TypeScript 5:
  - strictモード有効
  - noUncheckedIndexedAccess推奨
```

## ⚠️ プロジェクト固有の注意事項
```yaml
制約事項:
  - localStorage容量制限（5〜10MB）に注意
  - ブラウザキャッシュクリアでデータ消失の可能性
  - 必ずエクスポート機能でバックアップを促す

法的注意:
  - 医療機器ではないことを明確に表示
  - 免責事項の必須表示（初回起動時、設定画面）
  - 異常値の場合は医療機関受診を促すメッセージ表示

セキュリティ:
  - データは外部に送信しない
  - ブラウザ内で完結
```

## 📝 作業ログ（最新5件）
```yaml
- 2025-11-01: 要件定義書作成完了
- 2025-11-01: 技術スタック決定（React 18 + TypeScript 5 + MUI v6）
- 2025-11-01: ページリスト確定（3ページ構成）
- 2025-11-01: SCOPE_PROGRESS作成完了
- 2025-11-01: CLAUDE.md作成完了
```

## ディレクトリ構成
```
ぱっと見リスク測定/
├── docs/
│   └── requirements.md          # 要件定義書
├── src/
│   ├── components/              # Reactコンポーネント
│   │   ├── Dashboard/           # ダッシュボード関連
│   │   ├── History/             # 履歴・詳細分析関連
│   │   ├── Settings/            # 設定・データ管理関連
│   │   └── common/              # 共通コンポーネント
│   ├── constants/               # 定数定義
│   │   └── healthStandards.ts   # 健康指標の基準値
│   ├── types/                   # TypeScript型定義
│   │   └── index.ts             # 型定義ファイル
│   ├── utils/                   # ユーティリティ関数
│   │   ├── localStorage.ts      # localStorage操作
│   │   ├── validation.ts        # バリデーション
│   │   └── healthEvaluation.ts  # 健康指標の判定
│   ├── stores/                  # Zustand状態管理
│   │   └── healthStore.ts       # 健康データストア
│   ├── App.tsx                  # ルートコンポーネント
│   └── main.tsx                 # エントリーポイント
├── public/                      # 静的ファイル
├── SCOPE_PROGRESS.md            # 進捗管理
├── CLAUDE.md                    # このファイル
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 開発フロー
```yaml
1. 機能開発:
   - SCOPE_PROGRESS.mdで着手マーク
   - コンポーネント実装
   - 型定義追加
   - バリデーション実装
   - テスト確認

2. コミット:
   - git add .
   - git commit -m "[type]: [description]"

3. 完了:
   - SCOPE_PROGRESS.mdで完了マーク
   - 作業ログ更新
```

## Phase 2以降の拡張予定
```yaml
顔画像解析機能:
  - 技術候補: MediaPipe, TensorFlow.js, face-api.js
  - 測定項目: 顔色、目の大きさ、瞳の大きさ、口角の上がり方
  - 実装時期: MVP完成後に技術調査開始

ユーザー認証:
  - 認証サービス: Supabase Auth
  - データベース: PostgreSQL (Neon)
  - 実装時期: Phase 3
```

---

**作成日**: 2025-11-01
**最終更新日**: 2025-11-01
**バージョン**: 1.0.0
