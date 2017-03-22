# 任务4

# # 转化数据
这次数据量很大，高达5MB左右，如果使用在线转换器的话很慢，而且容易导致浏览器奔溃。所以选择NODE进行本地转换效率会高很多。这次我选用node-csvtojson插件进行转换。github地址：https://github.com/Keyang/node-csvtojson 。
$ npm i -g csvtojson 或者npm install
然后转换
$ csvtojson source.csv > converted.json
> 注意请在服务器端打开，因为数据是由本地请求来的
