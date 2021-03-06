//スイッチボタンでONになっているサービスのみを表示するようにするメソッド
function useServiceChange() {
    $('[name="useService"]').each(function () {
        if ($(this).bootstrapSwitch('state')) {
            $('.' + $(this).prop('id').split('useService_')[1] + '-group').css('display', 'block');
        } else {
            $('.' + $(this).prop('id').split('useService_')[1] + '-group').css('display', 'none');
        }
    });
}

//ローカルストレージに値を保存するためのメソッド
function setLocalStorage(key, value) {
    localStorage.setItem(key, value);

    //変更があったことをトリガにeventを発火
    var customEvent = new Event('onChangeSetting');
    customEvent.param = {"key":key,"value":value};
    document.getElementById('setting').dispatchEvent(customEvent);
}

//ジョブを追加するフォームをappendするメソッド
function appendFavoriteJob(id, value) {
    $('#favorite_job_group').append('<div id="' + id + '_group"><div class="form-group"><label for="' + id + '" class="col-md-2 control-label">お気に入りジョブID(Jenkins)</label><div class="col-md-4"><input id="' + id + '" value="' + value + '" class="form-control" onBlur="setLocalStorage(this.id, this.value)" type="text" placeholder="ジョブID" /></div><button type="button" class="btn btn-danger" onclick=removeSettingElement("' + id + '")>Remove</button></div></div>');
}

//Jenkinsのジョブ追加ボタンが押下された際に、ジョブを追加するフォームをappendするメソッド
function addFavoriteJob() {
    localStorage.setItem('favorite_job_count', parseInt(localStorage.getItem('favorite_job_count') == undefined ? 0 : localStorage.getItem('favorite_job_count')) + 1);
    appendFavoriteJob('favorite_jobId' + localStorage.getItem('favorite_job_count'), '');
}

//TOPページに表示するプロジェクト設定をappendするメソッド
function appendWatchProject(id, value) {
    $('#watch_project_group').append('<div id="' + id + '_group"><div class="form-group"><label for="' + id + '" class="col-md-2 control-label">TOPページ表示プロジェクト(Sonar)</label><div class="col-md-4"><input id="' + id + '" value="' + value + '" class="form-control" onBlur="setLocalStorage(this.id, this.value)" type="text" placeholder="[packagename]:[projectname]" /></div><button type="button" class="btn btn-danger" onclick=removeSettingElement("' + id + '")>Remove</button></div></div>');
}

//Jenkinsのジョブ追加ボタンが押下された際に、ジョブを追加するフォームをappendするメソッド
function addWatchProject() {
    localStorage.setItem('watch_project_count', parseInt(localStorage.getItem('watch_project_count') == undefined ? 0 : localStorage.getItem('watch_project_count')) + 1);
    appendWatchProject('watch_projectId' + localStorage.getItem('watch_project_count'), '');
}

//指定されたIDの要素とlocalStorageに格納されている要素を削除するメソッド（本メソッドは設定画面の追加要素に対してのみ有効）
function removeSettingElement(id) {
    localStorage.removeItem(id);
    var job = document.getElementById(id + '_group');
    job.parentNode.removeChild(job);
}

//webviewのsrcを変更するメソッド
function setWebViewSrc(target) {
    if (target == "redmine") {
        //redmineについてはログイン画面に自動遷移するため、設定されたURLの末尾に「/」があれば削除してアクセスする
        var redmineURL = localStorage.getItem('url_redmine');
        if(redmineURL){
          if (redmineURL.endsWith('/')) {
              redmineURL = redmineURL.substr( 0, redmineURL.length - 1);
          }
        }
        document.getElementById('redmine_frame').setAttribute('src', redmineURL + '/login');
    } else {
        document.getElementById(target + '_frame').setAttribute('src', localStorage.getItem('url_' + target));
    }
}

$(function () {
    //Redmineは必ず利用する
    localStorage.setItem('useService_redmine', 'true');

    // 初期表示にlocalstorageから利用するサービス情報をロード
    $('.settingProp').each(function () {
        if ($(this).attr('type') == 'checkbox') {
            $(this).bootstrapSwitch('state', localStorage.getItem($(this).prop('id')) == 'true' ? true : false);
        } else {
            $(this).val(localStorage.getItem($(this).prop('id')));
        }
    });

    //設定プロパティはすべてonblur時にlocalStorageに格納
    $('.settingProp').each(function () {
        if ($(this).attr('type') == 'checkbox') {
            $(this).on('switchChange.bootstrapSwitch', function (event, state) {
                setLocalStorage($(this).prop('id'), state);
                useServiceChange();
            });
        } else {
            $(this).blur(function () {
                setLocalStorage($(this).prop('id'), $(this).val());
            });
        }
    });

    //ツールチップの挙動をjqueryで上書き
    $('.glyphicon-repeat').tooltip();

    //登録されている要素分だけ設定画面の各種設定要素にDOMを追加する
    for (var i=0 ; i<localStorage.length ; i++){
        if (localStorage.key(i).startsWith('favorite_jobId')) {
            appendFavoriteJob(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
        } else if (localStorage.key(i).startsWith('watch_projectId')) {
            appendWatchProject(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
        }
    }

    //利用しないサービスは非表示にする
    useServiceChange();

    //webviewのsrcを変更
    setWebViewSrc('redmine');
    setWebViewSrc('jenkins');
    setWebViewSrc('sonar');
});
