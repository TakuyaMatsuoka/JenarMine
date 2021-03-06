JenarMine
===========
JenarMineはRedmine/Jenkins/Sonar 3つのアプリケーションを利用しているあなたに向けたユーティリティアプリケーションです。それぞれのURLで独立して管理されていたものを統合する役割を担います。

## Description

Redmine/Jenkins/Sonarを利用していて、不便に感じたことはございませんか？  
・URLが異なるため管理が煩雑になる  
・ブラウザで開いているその他のタブと混同してしまい操作性が悪い  
・利用したい機能にたどり着くまでの操作が多すぎ面倒くさい  
JenarMineを使えば、そんな悩みを一気に解決します！  

## Requirement

Window 7以降もしくはMac OS X以降

## Usage

利用するのは非常に簡単です。  

1. アプリケーションを起動したら利用するサービスの選択と、そのサービスのURLを登録しましょう。（Redmineについてはアカウント情報も登録することで自動ログインが可能になります。）  
2. あとは利用したいタブをクリックして開くだけです。（設定情報は自動的に保存されるので2回目以降起動時に1.の作業は不要です。）

### Usage For Sonar

* Sonar解析対象プロジェクトを設定画面の「Add watch project」ボタンより追加します。  
（プロジェクト追加方法は、「Add watch project」ボタン横の「？」アイコンをクリックしてください。）  
* 追加したプロジェクトのissue数がカテゴリ毎にグラフ化されます。  
表示対象のカテゴリは、「BROCKER」、「CRITICAL」、「MAJOR」です。  
* プロジェクトは設定画面より複数追加可能です。  
プロジェクトごとにissue数のグラフが表示されます。  

### Usage For Jenkins

* ジョブ実行ユーザのユーザIDと、APIKeyを設定します。  
(APIKeyは、以下のURLで表示される画面内の、「APIトークン」項目に表示される値を入力してください)  
[JenkinsURL]/user/[ユーザ名]/configure  

* 表示対象ジョブを設定画面の「Add favorite job」ボタンより追加します。  

* 追加したジョブのステータス情報がパネルに表示されます。  
実行時パラメータが不要なジョブであれば、ジョブの実行も可能です。  

## Tips

* 各画面にフォーカスが当たっている状態で「Ctrl + Backspace」で前画面に戻る、「Ctrl + F5」でリロードができます。

## Install

1. 以下のURLより環境に合わせたバージョンのアプリケーションをダウンロードしてください。  
2. 任意の場所に解凍してご利用ください。

## Licence

Released under the MIT license
http://opensource.org/licenses/mit-license.php

## Author

Copyright (c) 2016 epotech
