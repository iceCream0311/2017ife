/*****************************渲染数据******************/
var nodes = [{
    name: "父节点1",
    children: [{ name: "子节点1" }, { name: "子节点2" }]
}, {
    name: "父节点2",
    children: [{ name: "子节点3" }, { name: "子节点4", children: [{ name: "子节点5" }] }]
}];

/*******************模板样式**********************/
/*<div>
      <input type="checkbox" name="file" id="file1">
      <label for="file1">dog</label>
      <div>
          <input type="checkbox" name="file" id="file2">
          <label for="file2">dog</label>
          <div><span>smallDog</span></div>
      </div>
      <div><span>cat</span></div>
      <div><span>duk</span></div>
     </div>
*/
var dom = document.querySelector("#side_bar");
var divstmp = null;
var num = 0;
/*******************有子元素的对象**********************/
function hasChild(data) {
    num++
    var div = document.createElement("div");
    var label = document.createElement("label");
    label.innerHTML = data;
    var input = document.createElement("input");
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', "label" + num);
    label.setAttribute('for', "label" + num);
    div.appendChild(input)
    div.appendChild(label)
    return div;
}
/*******************没有子元素的对象**********************/
function noChild(data) {
    num++
    var div = document.createElement("div");
    var span = document.createElement("span");
    span.innerHTML = data;
    div.appendChild(span)
    return div;
}
/*******************渲染函数**********************/
function render(data, dom) {
    for (var i = 0; i < data.length; i++) {
        var divs = document.createElement("div");
        (function datarender(data, doms) {
            if (data.children) {
                divs.appendChild(hasChild(data.name));
                var tempdom = divs.getElementsByTagName("div")
                datarender(data.children, tempdom[tempdom.length - 1])
                console.log(divs)
            } else {
                for (var j = 0; j < data.length; j++) {
                    if (data[j].children) {
                        doms.appendChild(hasChild(data[j].name));
                        var tempdom = doms.getElementsByTagName("div")
                        datarender(data[j].children, tempdom[tempdom.length - 1])
                    }else{
                      doms.appendChild(noChild(data[j].name));
                    }
                }

            }

        })(data[i], dom)
        dom.appendChild(divs)
    }
    return dom
}


/*function render(data, dom) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].children) {
            divs.appendChild(hasChild(data[i]));

            // divstmp = divs.getElementsByTagName("div")[0]

            render(data[i].children, divs)

        } else {
            divs.appendChild(noChild(data[i]));
        }
    }

    console.log(tempnum)
    return divs
}*/
a = render(nodes, dom)
console.log(a)
