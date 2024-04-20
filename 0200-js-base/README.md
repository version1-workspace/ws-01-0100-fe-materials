## js-practice

JavaScript練習用のリポジトリ です。

## 課題で身に着けること

- JavaScriptの基本構文
  - 四則演算
  - if文
  - for文、while文
  - 配列
  - オブジェクト
  - 関数
  - 高階関数、コールバック関数
  - クラスとインスタンス
- データとアルゴリズム
  - 再帰処理
  - スタックとキュー
  - ( ソートアルゴリズム )
  - ( 検索アルゴリズム )

## 課題の進め方

### 1. 課題に必要な概念を学ぶ

一度に全部読む必要はないので、問題を解きながら適宜参照してください。

JS が初めての方は下記リンクを参照してください。
[JavaScript Primer](https://jsprimer.net/)

- 0001_syntax jsの文法を学ぶ基本問題
   - 001_base.js
   - 002_condition.js
   - 003_loop.js
   - 004_string.js
     - [Stringリファレンス](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String)
   - 005_array.js
     - [配列](https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/Arrays)
     - [Arrayリファレンス](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array)
   - 006_object.js
     - [JavaScript オブジェクトの基本](https://developer.mozilla.org/ja/docs/Learn/JavaScript/Objects/Basics)
     -  [Objectリファレンス](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object)
   - 007_high-order-function.js
    - [コールバック関数](https://developer.mozilla.org/ja/docs/Glossary/Callback_function)
    - [JavaScript 高階関数を説明するよ](https://qiita.com/may88seiji/items/8f7e42353b6904af5e9a)

- 0002_class js練習問題
   - 001_class.js
       - [クラスの使用](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Using_classes)
       - [クラス](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes)
   - 002_inheritance.js
       - [拡張と継承](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Using_classes#%E6%8B%A1%E5%BC%B5%E3%81%A8%E7%B6%99%E6%89%BF)
   - 003_data.js
       - [スタックとキューを極める！ 〜 考え方と使い所を特集 〜](https://qiita.com/drken/items/6a95b57d2e374a3d3292)

- 0003_practice js練習問題
   - 001_easy.js
   - 002_medium.js
   - 003_combound.js
   - 004_recursion.js
     - [再帰関数を学ぶと、どんな世界が広がるか - Qiita](https://qiita.com/drken/items/23a4f604fa3f505dd5ad)

### 2. デバッグの方法を学ぶ

こちらは必須の内容なので必ず目を通してから課題を進めてください。
課題中にエラーが発生した場合も適宜こちらのドキュメントを参照して進めましょう。

1. JavaScript でのデバッグ技術入門(https://version1-workspace.gitbook.io/javascript-5)
2. [JavaScript in 10 minutes] コードを速く書くために Console タブを活用しよう (https://www.youtube.com/watch?v=JqLmrQzBjZU)

### 3. 各設問のコメントにしたがって、回答

1. 出力する・表示するといったものはconsole.logを使ってコンソールに結果を出力するようにしてください。また、返却する・返すといった指定のあるものはreturnで値を返すようお願いします。
2. テストコードが通らない場合はエラーを参照して、問題を解決してください。
3. テストコードは `__test__` フォルダ配下にあります。

### 4. テストコードを実行

各問題にはテストコードが用意されています。(testディレクトリ配下) 各問題を解いたらテストコードを実行して期待の挙動になていることを確認しましょう。

```bash
$ npm run test # テストを実行
```
![テスト実行-全て](./assets/run-test-all.png)

全てのテストを実行すると時間がかかるので下記のようにテストファイルを指定して実行することもできます。

```bash
$ npm run test [テストファイルへのパス] # テストを実行
```

![テスト実行-ファイル](./assets/run-test-file.png)


### 5. よくある質問・エラー

[FAQ](./docs/faq.md) を参照してください。
