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
          trigger="click"
        >
          <span>请登录</span>
          <el-dropdown-menu class="menu" slot="dropdown">
            <el-dropdown-item>
              <button @click="logout" class="logout">注销登录</button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-col>
      <el-menu background-color="#fff" :default-active="path" class="el-menu-vertical-demo">
        <router-link to="/major">
          <el-menu-item index="/major">
            <i class="el-icon-star-off">
              &nbsp;
              重要
            </i>
            <el-badge :value="major" v-if="major>0" class="item">
              <el-button size="small"></el-button>
            </el-badge>
          </el-menu-item>
        </router-link>
        <router-link to="/task">
          <el-menu-item index="/task">
            <i class="el-icon-tickets">
              &nbsp;
              任务
            </i>
            <el-badge :value="task" v-if="task>0" class="item">
              <el-button size="small"></el-button>
            </el-badge>
          </el-menu-item>
        </router-link>
        <router-link to="/done">
          <el-menu-item index="/done">
            <i class="el-icon-circle-check">
              &nbsp;
              已完成
            </i>
            <el-badge :value="done" v-if="done>0" class="item">
              <el-button size="small"></el-button>
            </el-badge>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
  </div>
</template>



<script>
export default {
  props: {
    done: Number,
    task: Number,
    major: Number
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      localStorage.removeItem("todoId");
      location.reload()
    }
  },
  computed: {
    path() {
      return this.$route.path;
    }
  }
};
</script>


<style scoped>
.el-popper[x-placement^=bottom]{
  margin-top: 0px;
  background-color: #347562;
  padding: 0;
}
.el-dropdown-menu {
  border: 0;
}
.logout{
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 0;
  outline: 0;
  color: aliceblue;
  background-color: #347562;
}
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
li a {
  color: black;
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
.el-badge {
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
  z-index: 100;
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
