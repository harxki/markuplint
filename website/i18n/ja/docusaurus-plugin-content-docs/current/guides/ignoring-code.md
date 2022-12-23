# 除外設定

## ファイルの除外

設定の[`excludeFiles`](/configuration/properties#excludefiles)プロパティを使用します。

## ルールの無効化

### セレクタによる無効化

設定の[`nodeRules`](/configuration/properties#noderules)もしくは[`childNodeRules`](/configuration/properties#childnoderules)プロパティを使います。
[部分的な適用](./applying-rules/#applying-to-some)を参考にしてください。

```json
{
  "rules": {
    "any-rule": true
  },
  "nodeRules": [
    {
      "selector": ".ignore",
      "rules": {
        "any-rule": false
      }
    }
  ]
}
```

### ルールを上書きして無効化 {#overriding-to-disable-rules}

設定の[`overrides`](/configuration/properties#overrides)プロパティを使います。

```json
{
  "rules": {
    "any-rule": true
  },
  "overrides": {
    "./path/to/**/*": {
      "rules": {
        "any-rule": false
      }
    }
  }
}
```