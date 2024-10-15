# HTML/CSS(BEM, Sass) 課題

デモ: https://version1-real-todo.netlify.app/

HTML, CSS(SASS), BEMとレスポンシブコーディングを勉強するためのリポジトリです。
上記デモサイトのトップページを検証ツールなど使いながらなるべく同じサイトができるようにコーディングをして下さい。

## 課題で身に着けること

- 変更に強いCSS設計（BEM)
- CSSのモジュール化
- レスポンシブデザイン
- sass記法
- sassの変数定義、mixinの使い方
- セマンティックな命名

## 課題の進め方

### 1. ドキュメント/記事を読んで必要な知識を理解する

#### BEMについて

参照:
- [脱ビギナーのためのCSS入門](https://speakerdeck.com/jjoo/tuo-biginafalsetamefalsecssru-men)
- [BEM](https://getbem.com/)

公式ドキュメント:

https://getbem.com/

#### フレックスボックス

- [もう迷わない！CSS Flexboxの使い方を徹底解説](https://webdesign-trends.net/entry/8148)

#### レスポンシブデザインについて

- [レスポンシブデザインとは
実装のメリット・デメリット、作り方について解説](https://gmotech.jp/semlabo/seo/blog/responsive_design/)
- [レスポンシブデザインに必要不可欠なブレイクポイントとメディアクエリとは？](https://www.studio-umi.jp/blog/185/610)

#### Sassについて

- [sass公式](https://sass-lang.com/)
- [SASS](https://www.webdesignleaves.com/pr/css/css_basic_08.html)
- [Dart Sass](https://sass-lang.com/dart-sass)

#### npmについて

- [便利なパッケージ管理ツール！npmとは【初心者向け】](https://techacademy.jp/magazine/16105)
- [【初心者向け】NPMとpackage.jsonを概念的に理解する](https://qiita.com/righteous/items/e5448cb2e7e11ab7d477)
- [そろそろ適当に npm install するのを卒業する](https://zenn.dev/ikuraikura/articles/71b917ab11ae690e3cd7)
- [NPM](https://docs.npmjs.com/about-npm)

### 1. ファイルの中身を確認して課題を開始

```
npm install
npm run compile // sassの変更を検知してコンパイルするnodeサーバを起動
```

※ node のバージョンは 20 以上であることを推奨しています。

nodeサーバが起動している間は、sassの変更が自動で反映されるようになっています。

いきなり全てをやろうとすると処理が難しくなるので、自分で理解できる範囲まで作業を分割してコーディングを進めてください。
作業を分割してどうしても実装できない、長時間詰まってしまう部分は後回しにしてできるところからやるようにしてください。

### 5. github pagesにてサイトを公開

作業が終わったら変更をコミット& push してリモートリポジトリ に変更を反映させます。
masterへの変更が終わったら下記手順でサイトをgithub ページ上に公開してください。

https://docs.github.com/ja/pages/getting-started-with-github-pages/creating-a-github-pages-site

## 注意点

### VSCodeのプラグインについて

この課題ではVSCodeのプラグインでのSassのコンパイルは必要ありません。
Live Sass Compilerなどを入れている方はプラグインの機能をOFFにして課題に取り組むようお願いします。

### Google Fontについて

無料で使えるフォントファイルライブラリのGoogleFontもデフォルトで読み込む様な設定をしています。
フォント指定する場合は、 stylesheets/sass/shared/_global.sass の %font を extend 指定してください。

### 画像について

実装の際に使用する画像は assets/ フォルダに全て格納されています。
HTML 内で適当なパスを指定して課題を進めて下さい。


