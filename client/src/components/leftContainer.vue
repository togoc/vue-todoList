<template>
  <div class="leftContainer">
    <div class="title">
      <h3>todo-list</h3>
      <div class="user">
        <img src="../assets/logo.png" alt />
        <el-dropdown
          class="dropdown"
          split-button
          type="primary"
          placement="bottom"
          trigger="click"
        >
          <span>togoc</span>
          <el-dropdown-menu class="menu" slot="dropdown">
            <el-dropdown-item>注销登录</el-dropdown-item>
            <el-dropdown-item>用户注册</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-col>
      <el-menu background-color="#fff" default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <i class="el-icon-star-off">&nbsp;重要</i>
          <el-badge :value="major" v-if="major>0" class="item">
            <el-button size="small"></el-button>
          </el-badge>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-tickets">&nbsp;任务</i>
          <el-badge :value="task" v-if="task>0" class="item">
            <el-button size="small"></el-button>
          </el-badge>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-circle-check">&nbsp;已完成</i>
          <el-badge :value="done" v-if="done>0" class="item">
            <el-button size="small"></el-button>
          </el-badge>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>





<script>
export default {
  data() {
    return {
      major: 1,
      task: 1,
      done: 0
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>


<style scoped>
.menu {
  width: 120px;
}
.el-dropdown-menu__item {
  text-align: center;
}
.el-button-group,
.el-dropdown {
  margin: 0;
  padding: 0;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.user {
  font-size: 14px;
  font-weight: normal;
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  overflow: hidden;
  justify-content: space-evenly;
  background-color: rgb(52, 117, 98);
}
.user img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
.el-button {
  border: 0;
  padding: 0;
  background-color: rgb(52, 117, 98);
  width: 100%;
  outline: 0;
}
.el-badge{
    position: absolute;
}
.el-menu-item {
  width: 165px;
  padding: 0;
  padding-left: 15px !important;
  padding-right: 55px;
  margin-top: 5px !important;
  text-align: center;
}
.title {
  height: 100px;
  text-align: center;
  line-height: 60px;
}
.leftContainer {
  overflow: hidden;
  z-index: 9999999;
  box-sizing: border-box;
  width: 180px;
  font-weight: bold;
  height: 100vh;
  min-width: 110px;
}
li {
  margin: 0;
  padding: 0;
}
@media screen and (max-width: 520px) {
  .leftContainer {
    display: none;
  }
  header {
    padding-left: 10%;
  }
}
</style>
