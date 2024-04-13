

# チュートリアル

本課題では、node.js で sass をコンパイルしながら課題を進めて行くので課題を進める前に、手順の確認のために本チュートリアルを行っていただきます。

## 1. npm install

Sass はそのままではブラウザで読み込むことができないので、CSS にコンパイルする必要があります。
そのための手順としてまずは、npm で sass をコンパイルするためのパッケージをインストールします。

npm は node.js のパッケージ管理ツールで、node.js と一緒にインストールされます。
node がコンピュータにインストールされていれば、npm もインストールされているはずです。

ターミナルで以下のコマンドを実行してください。
この時に、0100-html-css のディレクトリ（package.json) のあるディレクトリで実行する必要があるのでカレントディレクトリを確認して実行してください。

```bash
npm install
```

npm install が完了したら、エラーが出ていないことを確認して次の手順に進んでください。


## 2. Sass のコンパイル

次に以下のコマンドで Sass を css にコンパイルします。

```bash
npm run compile
```

これは package.json で設定したコマンドで以下のコマンドのエイリアス(ショートカット）になっています。

下記のように package.json を開いて確認してみましょう。
package.json は npm の設定ファイルで、プロジェクトの設定や依存関係を管理するためのファイルです。
scripts にコマンドを登録しておくことで、npm run でコマンドを実行することができます。

```json
"scripts": {
  "compile": "sass stylesheets/sass/index.sass stylesheets/style.css -w",
  "build": "sass stylesheets/sass/index.sass stylesheets/style.css",
  "start": "open ../public/0100-html-css/index.html"
}
```

compile の内容をみると `sass stylesheets/sass/index.sass stylesheets/style.css -w` となっています。

これは stylesheets/sass/index.sass を stylesheets/style.css にコンパイルするという意味で、最後についている -w は sass コマンドのオプションで、ファイルの変更を監視して自動でコンパイルするオプションです。
このオプションのおかげで、sass ファイルを変更するたびにコンパイルする必要がなくなります。

コマンドを実行したら下記の様に出力をされることを確認します。

```bash
 % npm run compile

> 0100-html-css@1.0.0 compile
> sass stylesheets/sass/index.sass stylesheets/style.css -w

[2024-04-13 03:20] Compiled stylesheets/sass/index.sass to stylesheets/style.css.
Sass is watching for changes. Press Ctrl-C to stop.
```

出力を確認すると前述の通り「stylesheets/sass/index.sass を stylesheets/style.css にコンパイルしました」とあります。

```bash
[2024-04-13 03:20] Compiled stylesheets/sass/index.sass to stylesheets/style.css.
```

実際に該当のパスのファイルを見てみると stylesheets/style.css にファイルが生成されていることも確認できます。

上記が確認出来たら、次のステップに進んでください。

## 3. CSS の変更

Sass のコンパイルが完了したので、index.html を開いて現状のページを確認しましょう。

 index.html をブラウザで開いてください。
コマンドでファイルを開く場合は、下記のコマンドを実行してください。

```bash
open index.html
```

ファイルを開くと現状のページは、真っ黒のページが表示されると思います。

これは、`stylesheets/sass/blocks/body.sass` に記述されているスタイルが反映されているためです。

```sass
.body
  background: #2e2e2e
```

チュートリアルとして、この背景色を変更してみましょう。

```sass
.body
  background: #0066ff
```

上記のカラーコードは、青色のカラーコードなので、画面を再読み込みして背景色が青色になっていれば成功です。

この時に、先ほどの `npm run compile` したターミナルでsass コマンドを実行し続けていることに注意しておいてください。
sass コマンドが実行されていれば node.js が sass ファイルの変更を検知して自動で css にコンパイルされているはずです。

ターミナルを確認するとファイルの更新の度に下記の様な出力がされるはずです。

```bash
[2024-04-13 03:20] Compiled stylesheets/sass/index.sass to stylesheets/style.css.
```

ここまでで、Sass のコンパイルのやり方を確認できたので、 あとは、課題の指定にそって、HTML, SASS を修正して進めていきましょう。

