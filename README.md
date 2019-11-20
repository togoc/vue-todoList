# ![](images/favicon.png)
# vue-todoList
 
## demo
<div align="center">
<img width="350" src="./images/mini.png" alt="缩小">
<img width="250" src="./images/logout.png" alt="注销">
<img src="./images/index.png" alt="首页">
</div>

### server.js: node + express + mongoose + gravatar

### clint: vue + element-ui + axios + momentjs

### 数据修改重载
  ``` js
  updated() {
    this.toggleSelection(
      this.currentlyList.filter(item => {
        return item.done === true;
      })
    );
  }
  ```