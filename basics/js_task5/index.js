/*添加元素方法*/
function add(addDom) {
    document.getElementById(addDom).onclick = function() {
        var inputs = document.getElementById("inputText").value;
        var texts = document.querySelector(".texts");
        var spans = document.createElement("span")
        var flag = texts.childNodes.length;

        var textinput = mytrim(inputs);
        if (textinput >= 10 && textinput <= 100) {
            if (flag >= 60) {
                alert("最多添加60个元素")
                return;
            }
            spans.setAttribute('data-beforeData', textinput);
            spans.style.height = textinput + "px";
            spans.title = textinput;
            if (addDom == "rinput") {
                texts.appendChild(spans)
                spanRemove();
            } else if (addDom == "linput") {
                var first = texts.firstChild;
                texts.insertBefore(spans, first)
                spanRemove();
            }
        } else {
            alert("请按要求输入10-100的数")
            document.getElementById("inputText").value = "";
        }
    };
}
/*删除元素方法*/
function remove(removeDom) {
    document.getElementById(removeDom).onclick = function() {
        var texts = document.querySelector(".texts");
        var childList = texts.childNodes;
        if (!childList.length) {
            alert("无可删除元素")
            return;
        }
        if (removeDom == "lout") {
            var childs = childList[0];
            var childsText = childs.title;
            alert("已删除子元素" + childsText);
            texts.removeChild(childs);


        } else if (removeDom == "rout") {
            var chils = childList[childList.length - 1];
            var chilsText = chils.title;
            alert("已删除子元素" + chilsText);
            texts.removeChild(chils);

        }
    }



}
/*点击元素删除自己*/
function spanRemove() {
    var texts = document.querySelector(".texts");
    var childList1 = texts.getElementsByTagName("span")
    for (var i = 0; i < childList1.length; i++) {
        childList1[i].onclick = function() {
            var chilsText = this.title;
            alert("已删除子元素" + chilsText);
            this.remove();
        }
    }
}

/*调用点添加和删除方法*/
add("linput");
add("rinput");
remove("lout");
remove("rout");

/*随机生成20个元素*/
document.querySelector("#radoms").onclick=function(){
    var texts = document.querySelector(".texts");
for (var i = 0; i < 20; i++) {
     document.getElementById("inputText").value= parseInt(10 + (90 - 10) * (Math.random()));
    document.getElementById("rinput").click()
    if (texts.childNodes.length>=60) {
        document.getElementById("inputText").value="";
        break;
    }

}
document.getElementById("inputText").value="";
}

function QuickShort() {
    var texts = document.querySelector(".texts");
    var childList1 = texts.getElementsByTagName("span");
    var arr = [];
    for (var i = 0; i < childList1.length; i++) {
        var height = childList1[i].style.height;
        height=parseFloat(height.slice(0,length-2))
        arr.push(height)
    }
    function quckshort(arr) {
        if (arr.length <= 1) {
            return arr;
        } else {
            var temp = Math.ceil(arr.length / 2)
            var centerNumber = arr.splice(temp - 1, 1)[0]
            console.log(centerNumber)
            var left = [];
            var right = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] < centerNumber) {
                    left.push(arr[i])
                } else {
                    right.push(arr[i])
                }
            }
        }
        return quckshort(left).concat(centerNumber, quckshort(right))
    }
     texts.innerHTML=""
   render(quckshort(arr))
}

function render(arr){
    var texts = document.querySelector(".texts");
    for (var i = 0; i < arr.length; i++) {
         var spans = document.createElement("span");
         spans.setAttribute('data-beforeData', arr[i]);
            spans.style.height =  arr[i] + "px";
            spans.title =  arr[i];
         texts.appendChild(spans)
          spanRemove();
    }
}
// var arrheight=[55,21,21,50,33,77,55]
// render(arrheight)

/*去左空格*/
function ltrim(s) {
    //s.replace( /^\s*/, "")
    //如果是去掉半角和全角空格就把 \s 替换成   [" "|"　"] 就变成
    //s.replace( /^[" "|" "]*/, "");
    return s.replace(/^\s*/, "").replace(/^[" "|"　"]*/, "");
}
/*去右空格*/
function rtrim(s) {
    return s.replace(/\s*$/, "").replace(/[" "|"　"]*$/, "");
}
/**
 * 去空格函数
 */
function mytrim(str) {
    if (!str) {
        return "";
    }
    return rtrim(ltrim(str));
}
