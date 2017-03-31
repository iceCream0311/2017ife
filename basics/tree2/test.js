 //Simple Linked Queue
 var QNode = function(newObj) {
     this.obj = null;
     this.next = null;
     this.Init = function(newObj) {
         this.obj = newObj;
     }
     this.Init(newObj);
 }

 var Queue = function() {
     this.front = null;
     this.rear = null;
     this.size = 0;

     this.MakeEmpty = function() {
         if (this.size == 0)
             return null;
         while (this.front != this.rear) {
             var curQNode = this.front;
             curQNode = null;
             this.size -= 1;
             this.front = this.front.next;
         }
         this.size -= 1;
         this.front = null;
         this.rear = null;
     }

     this.enqueue = function(newObj) {
         this.size += 1;
         var newQNode = new QNode(newObj);
         if (this.rear == null) {
             this.front = newQNode;
             this.rear = newQNode;
         } else {
             this.rear.next = newQNode;
             this.rear = this.rear.next;
         }
     }

     this.dequeue = function() {
         if (this.size <= 0)
             return null;
         else if (this.size == 1) {
             this.size -= 1;
             var deQNode = this.rear;
             this.front = null;
             this.rear = null;
             return deQNode.obj;
         } else {
             this.size -= 1;
             var curQNode = this.front;
             this.front = this.front.next;
             return curQNode.obj;
         }
     }
 }
