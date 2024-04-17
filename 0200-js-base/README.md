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
  - クラスとインスタンス
- データとアルゴリズム
  - 再帰処理
  - スタックとキュー
  - ( ソートアルゴリズム )
  - ( 検索アルゴリズム )

## 課題の進め方

### 1. 課題に必要な概念を学ぶ

一度に全部読む必要はないので、問題を解きながら適宜参照してください。

- [プログラムの計算量を求める方法](https://qiita.com/cotrpepe/items/1f4c38cc9d3e3a5f5e9c#%E8%A3%9C%E8%B6%B3%E6%99%82%E9%96%93%E8%A8%88%E7%AE%97%E9%87%8F%E3%81%A8%E7%A9%BA%E9%96%93%E8%A8%88%E7%AE%97%E9%87%8F%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

- 0001_syntax jsの文法を学ぶ基本問題
   - 001_base.js
     - [式と演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Expressions_and_Operators)
     - [JavaScriptでの基本演算 — 数値と演算子](https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/Math)
   - 002_condition.js
     - [制御フローとエラー処理](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
   - 003_loop.js
      - [ループとイテレータ](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Loops_and_iteration)
   - 004_string.js
     - [テキストを扱う — JavaScript での文字列](https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/Strings)
     - [Stringリファレンス](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String)
   - 005_array.js
     - [配列](https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/Arrays)
     - [Arrayリファレンス](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array)
   - 006_object.js
     - [JavaScript オブジェクトの基本](https://developer.mozilla.org/ja/docs/Learn/JavaScript/Objects/Basics)
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
- 0004_algorithm アルゴリズム問題をjsを使ってとく問題
   - 001_search.js 検索アルゴリズムの実装
     - [リニアサーチ（線形探索法） ~『楽しく学ぶ　アルゴリズムとプログラミングの図鑑』より](https://book.mynavi.jp/manatee/detail/id=64253)
     - [アルゴリズムを勉強するなら二分探索から始めよう！ 『なっとく！アルゴリズム』より](https://codezine.jp/article/detail/9900?p=2)
   - 002_sort.js ソートアルゴリズムの実装
   　- [ソートを極める！ 〜 なぜソートを学ぶのか 〜](https://qiita.com/drken/items/44c60118ab3703f7727f#10-7-%E3%83%9C%E3%82%B4%E3%82%BD%E3%83%BC%E3%83%88)


- [JavaScript ドキュメント](https://developer.mozilla.org/ja/docs/Web/JavaScript)

### 3. 各設問のコメントにしたがって、回答

出力する・表示するといったものはconsole.logを使ってコンソールに結果を出力するようにしてください。
また、返却する・返すといった指定のあるものはreturnで値を返すようお願いします。

※ JavaScriptの組み込みのAPIを使わずに実装してみましょう

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


#### Q1. エラーが発生しました。原因がわからないのですがどうすれば良いでしょうか？

A. エラーが発生した場合は、まず落ち着いてエラーメッセージを読みましょう。

- 「何のエラーメッセージが発生しているか？」
- 「どの箇所でエラーメッセージが発生しているか？」

をエラーメッセージから読み取り、エラーの原因を特定しましょう。
テストコードでエラーが発生している場合は、期待値と実際の値を確認して自分の実装に誤りがないか確認しましょう。

また、多くの場合自分の考えているコードと実際の挙動が異なる場合にエラーが起こりうるので、  `console.log` や `debugger` を使い実際の値を一つ一つ確認してエラーを特定しましょう。
