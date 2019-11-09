# ![](images/favicon.png)
# vue-todoList
 
* ![注销](images/logout.png)
* ![缩小](images/mini.png)
* ![首页](images/index.png)

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