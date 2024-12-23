
# React 入門課題

前課題のJavaScriptで実装した TODO と同様のアプリをReactで実装してください。

demo: https://version1-workspace.github.io/ws-01-0100-fe-materials/0400-react-todo/

## 課題で身に着けること

- Propsとは？
- Stateとは？
- children, fragment
- Hoos API を使った状態管理
- コンポーネントを作る時に考えること
- CSS Module, CSS in JS(Emotion.js)

## 課題の進め方

### 0. 課題用リポジトリの作成

フォークでなく個人のアカウントにリポジトリ を作成してください。

### 1. create-next-app を使用して React プロジェクトを作成

React のプロジェクトを作成していきますが、今回は Next.js のアプリとしてプロジェクトを作成します。

(参考: https://react.dev/learn/start-a-new-react-project#nextjs-pages-router)

下記、コマンドを実行して Next.js のプロジェクトを作成してください。

```bash
npx create-next-app@latest
```

コマンドを実行すると下記のような質問が表示されるので、以下のような回答してください。

```bash
% npx create-next-app@latest
✔ What is your project named? … 0400-react-rodo
✔ Would you like to use TypeScript? … No 
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … No
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias (@/*)? … No
✔ What import alias would you like configured? … @/*
```


### 2. Next.js を動かしてみる

```
cd 0400-react-todo
npm run dev
```

ブラウザが起動してページが表示されれば完了です。


### 3. Reactの公式チュートリアルを行う

React を理解するために公式のチュートリアルを行って React への基本的な理解を深めてください。
[React チュートリアル](https://ja.react.dev/learn/tutorial-tic-tac-toe)


チュートリアルを行った上で、「[React を学ぶ](https://ja.react.dev/learn/describing-the-ui)」の項目や「[React の流儀](https://ja.react.dev/learn/thinking-in-react)」の項目を読むとより深く理解できるかと思います。

[リファレンス](https://ja.react.dev/reference/react)
 - [useState](https://ja.react.dev/reference/react/useState)
 - [useEffect](https://ja.react.dev/reference/react/useEffect)
 - [Reactのルール](https://ja.react.dev/reference/rules)

### 4. Todo アプリを実装


前課題で作成した Todo アプリを 先ほど作成した Next.js プロジェクト上で作成してください。
実装の際にはいくつか留意事項があるので、必ずそちらを理解した上で実装を始めてください。

### 5. サイトとして公開

前提としてデプロイは main ブランチに対して行われるので、main ブランチで作業するようお願いします。

1. next.config.js を編集。

ファイルの中身が下記のようになるよう編集してください。

```js
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  output: 'export',
  assetPrefix: isProd ? '[公開する Github Page の URL]' : undefined,
}
```

2. ビルド

```bash
npm run build
```

3. out ディレクトリをコミット

out ディレクトリが作成されるので、そのディレクトリをコミットしてください。

```bash
git add .
git commit -m "Add out folder"
```

4. Github Actions を使って ファイルを Gihub Pages にデプロイ

このリポジトリにある。static.yml を作業しているリポジトリの .github/workflows に配置してコミット・プッシュしてください。

5. Github Action ページでデプロイが成功していることを確認


## 留意事項

### CSS Module / CSS in JS(Styled Components) を使ってスタイルする

React でスタイルを当てる方法はいくつかありますが、この課題では CSS Module または CSS in JS(Styled Components) を使ってスタイリングしてください。

また、 CSS Module を使う場合は sass、 CSS in JS を使う場合は Styled Components を使用してください。

#### CSS Module

- https://nextjs.org/docs/app/building-your-application/styling/css-modules

#### CSS in JS

- https://nextjs.org/docs/app/building-your-application/styling/css-in-js
- https://nextjs.org/docs/app/building-your-application/styling/css-in-js#styled-components


### "use client" を page.js で宣言して実装を行う

Next.js 上では、`use client` を使ってクライアントサイドのみで実行されるコードを書くことができます。
この課題では、React の学習が目的なので、トップページの page.js で `use client` を宣言して実装を行ってください。

FYI: https://nextjs.org/docs/app/building-your-application/rendering/client-components#using-client-components-in-nextjs

### Next.js jについては最低限だけ学ぶ

Next.js への理解は最低限で問題ありません。
この課題では React の理解を深めることが目的なので、Next.js に関するドキュメントを深く読み込む必要はありません。

Next.js プロジェクトの基本的構造だけ理解できていれば大丈夫です。
FYI: https://nextjs.org/docs/getting-started/project-structure

それ以外で不明点があればぜひ質問してください。

### Prettier と ESLint を使ってシンタックスチェック、コードを整形する

ESLint はデフォルトでNext.js プロジェクトに組み込まれているので特に設定不要ですが、Prettier は設定が必要です。

下記コマンドで Prettier をインストールして使用してください。

```bash
npm install --save-dev --save-exact prettier
```

FYI: https://prettier.io/docs/en/install


