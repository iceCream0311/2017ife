 function Node(data) {
     this.data = data;
     this.parent = null;
     this.children = [];
 }

 function Tree(data) {
     var node = new Node(data);
     this._root = node;
 }
 var tree = new Tree('CEO');

 /*{data: 'CEO', parent: null, children: []}*/
 tree._root;
 Tree.prototype.traverseDF = function(callback) {

     // this is a recurse and immediately-invoking function
     (function recurse(currentNode) {
         // step 2
         for (var i = 0, length = currentNode.children.length; i < length; i++) {
             // step 3
             recurse(currentNode.children[i]);
         }

         // step 4
         callback(currentNode);

         // step 1
     })(this._root);

 };

 // 数据
 var partent = document.querySelector("#tree");
 var j = 0,
     childs = 0;
 console.log(partent.children)



 // while(partent.childs.length){

 // }
 var tree = new Tree(partent);
 var j = 0,
     z = 0,
     a = 0,
     b = 0,
     c = 0,
     d = 0;
 for (var i = 0; i < partent.children.length; i++) {
     if (partent.children[i].tagName == "DIV") {
         tree._root.children.push(new Node(partent.children[i]));
         tree._root.children[j].parent = tree;
         for (var g = 0; g < partent.children[i].children.length; g++) {
             if (partent.children[i].children[g].tagName == "DIV") {
                 tree._root.children[j].children.push(new Node(partent.children[i].children[g]));
                 tree._root.children[j].children[z].parent = tree._root.children[z];
                 for (var a = 0; a < partent.children[i].children[g].children.length; a++) {
                     if (partent.children[i].children[g].children[a].tagName == "DIV") {
                         tree._root.children[j].children[z].children.push(new Node(partent.children[i].children[g].children[a]));
                         if (tree._root.children[z]) {
                             tree._root.children[j].children[z].children[b].parent = tree._root.children[z].children[b];
                             for (var c = 0; c < partent.children[i].children[g].children[a].children.length; c++) {
                                 if (partent.children[i].children[g].children[a].children[c].tagName == "DIV") {
                                     tree._root.children[j].children[z].children[b].children.push(new Node(partent.children[i].children[g].children[a].children[c]));
                                     if (tree._root.children[z].children[b]) {
                                         tree._root.children[j].children[z].children[b].children[d].parent = tree._root.children[z].children[d];
                                     }
                                     d++
                                 }

                             }
                         }
                         d = 0;
                         b++
                     }
                 }
                 b = 0;
                 z++;
             }
         }
         z = 0;
         j++;
     }
 }


 // console.log(tree)

var timer=null, ss=[],dd=[];


 /*深度遍历*/
 tree.traverseDF(function(node) {
     ss.push(node.data)
 });

/*改变颜色*/
    function changeColor(ss){
      var i=0;
      timer=setInterval(function(){
         if (i<ss.length) {
          ss[i].setAttribute("class","blue")
          if (i>=1) {
            ss[i-1].setAttribute("class","")
          }

        }
        else{
          clearInterval(timer);

           ss[i-1].setAttribute("class","")

        }
        i++;

      },500)
    }
    /*初始化*/
    function restColor(ss){
      clearInterval(timer); /*清除定时器*/
      console.log(ss)
      for (var j = 0; j < ss.length; j++) {
        ss[j].setAttribute("class","")
      }

    }




 /*广度*/
 Tree.prototype.traverseBF = function(callback) {
     var queue = new Queue();
     queue.enqueue(this._root);/*方法在test.js*/
     currentTree = queue.dequeue();
     while (currentTree) {
         for (var i = 0, length = currentTree.children.length; i < length; i++) {
             queue.enqueue(currentTree.children[i]);
         }
         callback(currentTree);
         currentTree = queue.dequeue();
     }
 };
 tree.traverseBF(function(node) {
     dd.push(node.data)
 });
 Tree.prototype.contains = function(callback, traversal) {
     traversal.call(this, callback);
 };
 /*tree is an example of a root node*/
 tree.contains(function(node) {
     if (node.data === 'two') {
         console.log(node); //输出该节点的子元素
     }
 }, tree.traverseBF);

document.getElementById("deep").onclick=function(){
   restColor(ss)
  changeColor(ss)

}
document.getElementById("qian").onclick=function(){
   restColor(dd)
  changeColor(dd)

}

