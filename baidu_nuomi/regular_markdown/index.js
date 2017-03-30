/*******************正则********************/
/*代码块[```]或者[``` ]*/
var codeRE = /^\`{3}\s{0,}$/;
/*标题*/
var titleRE1 = /^\#\s/;
var titleRE2 = /^\#{2}\s/;
var titleRE3 = /^\#{3}\s/;
var titleRE4 = /^\#{4}\s/;
var titleRE5 = /^\#{5}\s/;
var titleRE6 = /^\#{6}\s/;
/*有序列表[1. 1)]*/
var olRE = /^\d(\.|\))+\s/;
/*无序列表[* -]*/
var ulRE = /^[\*\+-]\s/
    /*引用*/
    /*var quoteRE = /\`[\w\W\d\D]+\`/*/
var quoteRE = /^[\>]+\s/

/********************正则 end************************/

/********************textarea 输入事件************************/
$("textarea").oninput = function() {
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
                arr = temphtmlArr.slice(i, temphtmlArr.length); //代码段以后的内容
                if (arr.indexOf("```") != -1) {
                    temphtmlArr = arr.slice(arr.indexOf("```"), arr.length) //除了代码段以后的内容
                    i = 0; //初始化循环除了代码段以后的内容
                    arr = arr.slice(0, arr.indexOf("```")); //代码段内容
                    /*代码段内容部分*/
                    contenthml += "<pre><code>";
                    for (let j = 0; j < arr.length; j++) {
                        contenthml += arr[j] + '<br>';
                    }
                    contenthml += "</code></pre>" //结束标签
                } else {
                    contenthml += '<p>' + temphtmlArr[i] + '</p>'
                }
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
                    if (uls == 0) {
                        contenthml += '<ol><li>' + temphtmlArr[i].replace(olRE, "")
                    } else {
                        contenthml += '</li><li>' + temphtmlArr[i].replace(olRE, "")
                    }
                    uls++
                } else { contenthml += '<p>' + temphtmlArr[i] + '</p>' }
                /* function quote(){
                if (quoteRE.test(temphtmlArr[i])) {
                   var  a=temphtmlArr[i].match(quoteRE);
                   for (let i = 0; i < a.length; i++) {
                       contenthml += '<code>' + a[i].replace(/\`/g,"") + '</code>'
                   }

                }
            }
        quote()*/


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
