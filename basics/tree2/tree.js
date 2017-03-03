 var dom = document.querySelector("#tree")
 var ss = [],
     timer = null,
     isFirst = false;
 /* 深度*/
 function traverseDF(doms) {
     for (var i = 0, length = doms.children.length; i < length; i++) {
         if (doms.children[i].tagName == "DIV") {
             traverseDF(doms.children[i]);
             ss.push(doms.children[i])
         }

         if (isFirst == false) {
             setTimeout(function() {
                 ss.push(doms)
             }, 0)
             isFirst = true;
         }
     }
 }

 /*广度*/
 var z = 0

 function traverseBF(node) {;
     if (node) {
         ss.push(node);
         if (z > 0) {
             traverseBF(node.nextElementSibling);
         }
         node = ss[z++];
         if (node.firstElementChild) {

             if (node.firstElementChild.tagName == "SPAN") {
                 traverseBF(node.firstElementChild.nextElementSibling);
             } else {
                 traverseBF(node.firstElementChild);
             }
         }
     }
 }

 function changeColor(arr) {
     var i = 0;
     timer = setInterval(function() {
         if (i <= arr.length) {
             if (i < arr.length) {
                 arr[i].setAttribute("class", "blue")
             }
             if (i > 0) {
                 arr[i - 1].setAttribute("class", "")
             }
         } else {
             clearInterval(timer)
         }
         i++;
     }, 500)
 }

 function resetColor() {
     if (ss.length) {
         isFirst = false;
         clearInterval(timer);
         for (var i = 0; i < ss.length; i++) {
             ss[i].setAttribute("class", "")
         }
         ss = [];
         z = 0;
     } else {
         document.querySelectorAll("div").forEach(function(item) {
             item.setAttribute("class", "")
         })
     }

 }

 function searchText(arr, str) {
     var flag = 0;
     if (str == "") {
         alert("请输入搜索内容")
         return false;
     }
     var i = 0;
     timer = setInterval(function() {
         if (i < arr.length) {
             arr[i].setAttribute("class", "blue");
             if (arr[i].children) {
                 for (var j = 0; j < arr[i].children.length; j++) {
                     if (arr[i].children[j].tagName = "SPAN") {

                         if (arr[i].children[j].innerHTML == str) {
                             arr[i].setAttribute("class", "red");
                             flag++;
                             // clearInterval(timer)
                         }
                     }
                 }
             }
             if (i > 0) {
                 if (!(arr[i - 1].getAttribute("class") == "red")) {
                     arr[i - 1].setAttribute("class", "")
                 }

             }
         } else {
             if (!(arr[i - 1].getAttribute("class") == "red")) {
                 arr[arr.length - 1].setAttribute("class", "")
             }
             if (!flag) {
                 alert("没有找到您想要的内容")
             } else {
                 alert("找到了" + flag + "条")
             }

             clearInterval(timer)
         }
         i++;
     }, 500)

 }
 /*深度遍历*/
 document.getElementById("deep").onclick = function() {
         resetColor()
         traverseDF(dom)
         changeColor(ss)

     }
     /*广度遍历*/
 document.getElementById("qian").onclick = function() {
         resetColor()
         traverseBF(dom)
         changeColor(ss)

     }
     /*内容搜索*/
 document.getElementById("searchbtn").onclick = function() {
     var inpt = document.getElementById("search").value;
     resetColor(ss)
     traverseDF(dom)
     searchText(ss, inpt)

 }

 var chekDom = "";
 /* 选中元素*/
 function clickDom() {
     document.querySelectorAll("div").forEach(function(item) {
         item.onclick = function(e) {
             resetColor()
                 // 阻止冒泡
             window.event ? window.event.cancelBubble = true : e.stopPropagation();
             this.setAttribute("class", "yellow");
             chekDom = this;
         }
     })
 }
 clickDom();
 window.ondblclick = function(e) {
     window.event ? window.event.cancelBubble = true : e.stopPropagation();
     resetColor()
 }
 document.getElementById("addDom").onclick = function() {
     var content = document.getElementById("addDomText").value;

     if (content == "") {
         alert("请输入想要添加的内容")
     } else if (chekDom == "") {
         alert("请选择要添加的位置")
     } else {
         var chils = document.createElement("div");
         var spans = document.createElement("span");
         spans.innerHTML = content;
         chils.appendChild(spans)
         chekDom.appendChild(chils)
         clickDom();
     }
 }
 document.getElementById("reDom").onclick = function() {
     if (chekDom == "") {
         alert("请选择要删除的元素")
     } else {
         chekDom.remove();
     }

 }
