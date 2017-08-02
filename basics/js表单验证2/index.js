
/*提示信息*/
var judgeArr = [{
        error1: "名称不能为空",
        error2: "必填长度为4~16个字符",
        success: "名称可用",
        judge: function(dom, domp) {
            if (GetLength2(dom.value) == 0) {
                domp.className = "error";
                domp.innerHTML = this.error1;
                dom.className = "error"
            } else if (GetLength2(dom.value) <= 16 && GetLength2(dom.value) >= 4) {
                domp.className = "success";
                domp.innerHTML = this.success;
                dom.className = "success"
            } else {
                domp.className = "error";
                domp.innerHTML = this.error2;
                dom.className = "error";
            }
        }
    }, {
        error1: "密码不能为空",
        error2: "必填密码最小长度为6个数组与字母组合",
        success: "密码正确",
        judge: function(dom, domp) {
          /*密码正则*/
          var pwdRex=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
            if (!dom.value) {
                domp.className = "error";
                domp.innerHTML = this.error1;
                dom.className = "error"
            } else if (pwdRex.test(dom.value)) {
                domp.className = "success";
                domp.innerHTML = this.success;
                dom.className = "success"
            } else {
                domp.className = "error";
                domp.innerHTML = this.error2;
                dom.className = "error";
            }
        }
    }, {
        error1: "密码确认不能为空",
        error2: "必填再次输入相同的密码",
        success: "密码输入一致",
        judge: function(dom, domp) {
            if (!dom.value) {
                domp.className = "error";
                domp.innerHTML = this.error1;
                dom.className = "error"
            } else if (dom.value==$("#pwd").value) {
                domp.className = "success";
                domp.innerHTML = this.success;
                dom.className = "success"
            } else {
                domp.className = "error";
                domp.innerHTML = this.error2;
                dom.className = "error";
            }
        }
    }, {
        error1: "邮箱不能为空",
        error2: "邮箱格式不正确",
        success: "格式正确",
        judge: function(dom, domp) {
          /*密码正则*/
          var pwdRex=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
            if (!dom.value) {
                domp.className = "error";
                domp.innerHTML = this.error1;
                dom.className = "error"
            } else if (pwdRex.test(dom.value)) {
                domp.className = "success";
                domp.innerHTML = this.success;
                dom.className = "success"
            } else {
                domp.className = "error";
                domp.innerHTML = this.error2;
                dom.className = "error";
            }
        }
    }, {
        error1: "手机号不能为空",
        error2: "手机号格式不正确",
        success: "手机号正确",
        judge: function(dom, domp) {
          /*密码正则*/
          var pwdRex=/^[0-9]{11}$/;
            if (!dom.value) {
                domp.className = "error";
                domp.innerHTML = this.error1;
                dom.className = "error"
            } else if (pwdRex.test(dom.value)) {
                domp.className = "success";
                domp.innerHTML = this.success;
                dom.className = "success"
            } else {
                domp.className = "error";
                domp.innerHTML = this.error2;
                dom.className = "error";
            }
        }
    }]


var inpts = $("li input");
/*得到焦点*/
for (var i = 0; i < inpts.length; i++) {
    inpts[i].index = i;
    inpts[i].onfocus = function() {
        var domP = this.nextElementSibling || this.nextSibling;
        domP.className = "";
        domP.style.display = "block";
          domp.innerHTML=judgeArr[this.index].error2;
    }
    inpts[i].onblur = function() {
        var domP = this.nextElementSibling || this.nextSibling;
        judgeArr[this.index].judge(this, domP)
    }
}

/*获取长度*/
function GetLength2(str) {
    return str.replace(/[^\x00-\xff]/g, "aa").length;
};
/*选择器*/
function $(dom) {
    if (dom.indexOf("#") == 0) {
        return document.querySelector(dom)
    } else {
        return document.querySelectorAll(dom)
    }

}
