
# 0500-ts-base

TypeScript 練習用のリポジトリ です。

## 課題で身に着けること

- TypeScriptの基本構文

## 課題の進め方

#### 0. 課題を始める前にリポジトリ をフォーク

- [GitHubフォークのやり方](https://version-1workspace.gitbook.io/github/how-to-fork)

#### 1. フォークしてリポジトリ をクローンして課題をスタート

Gitが初めての方は下記を参照ください。

- [プログラミングを学ぶ前に始めるGit入門](https://version-1workspace.gitbook.io/git/)

#### 2. 課題に必要な概念を学ぶ

- [サバイバルTypeScript](https://typescriptbook.jp/)
- [TypeScript](https://www.typescriptlang.org/docs/)

#### 3. 各設問のコメントにしたがって、回答

js の課題と同様に practices ディレクトリ配下に設問があります。
practices/003_babanuki.ts に関しては、下記コマンドでも実行可能なので、コマンドを使いながら動作確認することができます。

```bash
npm run start:babanuki
```

#### 4. テストコードを実行

各問題にはテストコードが用意されています。(testディレクトリ配下) 各問題を解いたらテストコードを実行して期待の挙動になていることを確認しましょう。

```bash
$ npm install  # npmモジュールをインストール
$ npm run test # テストを実行
```

全てのテストを実行すると時間がかかるので下記のようにテストファイルを指定して実行することもできます。

```bash
$ npm run test [テストファイルへのパス] # テストを実行
```

