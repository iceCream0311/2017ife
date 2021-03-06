/*******************正则********************/
/*代码块[```]或者[``` ]*/
var codeRE = /\`{3}\s{0,}$/;
var titleRE1 = /^\s{0,}\#\s/;
/*标题*/
/*var titleRE1 = /^\#\s/;*/
var titleRE2 = /^\s{0,}\#{2}\s/;
var titleRE3 = /^\s{0,}\#{3}\s/;
var titleRE4 = /^\s{0,}\#{4}\s/;
var titleRE5 = /^\s{0,}\#{5}\s/;
var titleRE6 = /^\s{0,}\#{6}\s/;
/*有序列表[1. 1)]*/
var olRE = /^\s{0,}\d(\.|\))+\s/;
/*无序列表[* -]*/
var ulRE = /^\s{0,}[\*\+-]\s/
    /*引用*/
    /*var quoteRE = /\`[\w\W\d\D]+\`/*/
var quoteRE = /^\s{0,}[\>]+\s/

/********************正则 end************************/

/********************textarea 输入事件************************/
$("textarea").oninput = function() {
changehtml();
}
changehtml();
function changehtml(){
      /*以行分割textarea内容*/
    var htmlArr = $("textarea").value.split("\n");
    /*侧边栏序列号*/
    var rowhtml = "";
    for (let i = 0; i < htmlArr.length; i++) {
        rowhtml += '<div>' + i + '</div>';
    }
    $(".row").innerHTML = rowhtml
        /*右边展示内容*/
    var contenthml = ""
    var temphtmlArr = htmlArr,
        ols = 0, //ol表示
        uls = 0, //ul表示
        arr = []; //赋值给另一个中间数组防止改变原数组
    for (let i = 0; i < temphtmlArr.length; i++) {
        if (temphtmlArr[i]) {
            /****************代码段内容*********************/
            if (codeRE.test(temphtmlArr[i])) {
                arr = temphtmlArr.slice(i + 1, temphtmlArr.length); //代码段以后的内容
                if (arr.indexOf("```") != -1) {
                    temphtmlArr = arr.slice(arr.indexOf("```"), arr.length) //除了代码段以后的内容
                    i = 0; //初始化循环除了代码段以后的内容
                    arr = arr.slice(0, arr.indexOf("```")); //代码段内容
                    /*代码段内容部分*/
                    var tempcontenthml = "";
                    for (let j = 0; j < arr.length; j++) {
                        name.replace(/"([^"]*)"/g, "'$1'")
                        let arrtemp = arr[j].replace(/\</, "&lt") //使用中间变量获取转换标签后的文字
                        arrtemp = arrtemp.replace(/\>/, "&gt")
                        if (arrtemp.indexOf("//") != -1) {
                            arrtemp = arrtemp.replace(/\/\//, '<span class="code-quote">//') //遇见两个斜杠的时候
                            arrtemp += '</span>'
                        }
                        tempcontenthml += arrtemp.replace(/\//, "&frasl;") + '</br>';
                    }
                    contenthml += "<pre><code>" + tempcontenthml + "</code></pre>"; //结束标签
                } else { contenthml += '<p>' + temphtmlArr[i] + '</p>' }
            } else {
                /****************标题内容*********************/
                if (titleRE1.test(temphtmlArr[i])) { contenthml += '<h1>' + temphtmlArr[i].replace(titleRE1, "") + '</h1>' } else if (titleRE2.test(temphtmlArr[i])) { contenthml += '<h2>' + temphtmlArr[i].replace(titleRE2, "") + '</h2>' } else if (titleRE3.test(temphtmlArr[i])) {
                    contenthml += '<h3>' + temphtmlArr[i].replace(titleRE3, "") + '</h3>'
                } else if (titleRE4.test(temphtmlArr[i])) {
                    contenthml += '<h4>' + temphtmlArr[i].replace(titleRE4, "") + '</h4>'
                } else if (titleRE5.test(temphtmlArr[i])) {
                    contenthml += '<h5>' + temphtmlArr[i].replace(titleRE5, "") + '</h5>'
                } else if (titleRE6.test(temphtmlArr[i])) {
                    contenthml += '<h6>' + temphtmlArr[i].replace(titleRE6, "") + '</h6>'
                } else if (quoteRE.test(temphtmlArr[i])) {
                    /*****************块引用******************/
                    contenthml += '<blockquote>' + temphtmlArr[i].replace(quoteRE, "") + '</blockquote>'
                } else if (olRE.test(temphtmlArr[i])) {
                    /********************有序列表****************/
                    if (ols == 0) {
                        contenthml += '<ol><li>' + temphtmlArr[i].replace(olRE, "")
                    } else {
                        contenthml += '</li><li>' + temphtmlArr[i].replace(olRE, "")
                    }
                    ols++
                } else if (ulRE.test(temphtmlArr[i])) {
                    /********************无序列表****************/
                    if (uls == 0) {
                        contenthml += '<ul><li>' + temphtmlArr[i].replace(olRE, "")
                    } else {
                        contenthml += '</li><li>' + temphtmlArr[i].replace(olRE, "")
                    }
                    uls++
                } else { contenthml += '<p>' + temphtmlArr[i] + '</p>' }


            }
        }
    }
    $(".content").innerHTML = contenthml;
}


/*获取dom*/
function $(dom) {
    return document.querySelector(dom)
}
/*去左空格*/
function ltrim(s) {
    return s.replace(/^\s*/, "").replace(/^[" "|"　"]*/, "");
}
/*去右空格*/
function rtrim(s) {
    return s.replace(/\s*$/, "").replace(/[" "|"　"]*$/, "");
}
/*去掉左边和右边的空格*/
function mytrim(str) {
    if (!str) {
        return "";
    }
    return rtrim(ltrim(str));
}
