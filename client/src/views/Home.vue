<template>
  <div class="home">
    <header>
      <h3>我的一天</h3>
      <span class="time">{{$moment().format('LL')}}</span>
    </header>
    <leftContainer :done="done" :major="major" :task="task" :avatar="avatar" :name="username"></leftContainer>
    <div class="rightContainer">
      <el-table
        height="99%"
        ref="multipleTable"
        :data="currentlyList"
        tooltip-effect="dark"
        style="width: 100%"
        @select-all="selectAll"
        @select="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="日期" width="130" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ $moment(scope.row.date).format('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="container" label="To-Do List" align="center" color="blue" show-overflow-tooltip></el-table-column>
        <el-table-column
          align="center"
          label="筛选"
          width="100"
          :filters="[{ text: '重要', value: true }, { text: '普通', value: false }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <i
              :class="scope.row.major === true ? 'el-icon-star-on' : 'el-icon-star-off'"
              @click.prevent="taggleMajor(scope.row)"
            ></i>
            <i class="el-icon-delete" @click="dele(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="input">
        <div class="i2">
          <el-input class="cin" placeholder="请输入内容" v-model="input" clearable></el-input>
          <el-button type="success" @click="add" class="btn">立即创建</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      title="请输入任意邮箱进行操作"
      :visible.sync="centerDialogVisible"
      width="30%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
      center
    >
      <el-input placeholder="请输入内容" v-model="username">
        <template slot="append">.com</template>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false" class="cancel">取 消</el-button>
        <el-button type="primary" class="login" @click="login">确 定</el-button>
      </span>
    </el-dialog>
    <router-view></router-view>
  </div>
</template>

<script>
import leftContainer from "../components/leftContainer";
export default {
  data() {
    return {
      input: "",
      avatar: "",
      username: "309128090@qq",
      centerDialogVisible: false,
      todoList: [],
      multipleSelection: []
    };
  },
  name: "home",
  components: {
    leftContainer
  },
  computed: {
    currentPage() {
      return this.$route.path;
    },
    currentlyList() {
      switch (this.currentPage) {
        case "/major":
          return this.majorList;
          break;
        case "/task":
          return this.taskList;
          break;
        case "/done":
          return this.doneList;
          break;
      }
    },
    majorList() {
      return this.todoList.filter(item => {
        return item.major === true;
      });
    },
    doneList() {
      return this.todoList.filter(item => {
        return item.done === true;
      });
    },
    taskList() {
      return this.todoList.filter(item => {
        return item.done === false;
      });
    },
    major() {
      return this.majorList.length;
    },
    task() {
      return this.taskList.length;
    },
    done() {
      return this.doneList.length;
    }
  },
  methods: {
    add() {
      this.$http
        .post("/api/list/add", {
          container: this.input,
          uid: localStorage.todoId
        })
        .then(res => {
          console.log(res);
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.getList();
        });
    },
    login() {
      localStorage.removeItem("todoId");
      localStorage.removeItem("todoName");
      localStorage.removeItem("avatar");
      let username = this.username.replace(/\s/g, "");
      if (username == "") {
        this.$message({
          message: "不能空",
          type: "error"
        });
        return;
      }
      this.username = username + ".com";
      this.$http.post("/api/user/login", { email:this.username}).then(res => {
        localStorage.setItem("todoId", res.data._id);
        localStorage.setItem("todoName", this.username);
        localStorage.setItem("avatar", res.data.avatar);
        this.avatar = res.data.avatar;
        this.centerDialogVisible = false;
        this.$message({
          message: "登录成功",
          type: "success"
        });
        this.getList();
      });
    },
    getList() {
      if (localStorage.todoId && localStorage.todoName) {
        let id = localStorage.todoId;
        this.username = localStorage.todoName;
        this.avatar= localStorage.avatar
        this.$http.get("/api/list/" + id).then(res => {
          this.todoList = res.data;
        });
      } else {
        this.centerDialogVisible = true;
      }
    },
    handleSelectionChange(selection, row) {
      this.multipleSelection = row;
      this.currentlyList.forEach(item => {
        if (item._id === row._id) {
          item.done = !item.done;
          this.$http
            .post("/api/list/edit/" + row._id, { done: String(item.done) })
            .then(res => {
              this.$message({
                message: "修改成功",
                type: "success"
              });
            });
        }
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    filterTag(value, row) {
      return row.major === value;
    },
    taggleMajor(row) {
      this.todoList.forEach(item => {
        if (item._id === row._id) {
          item.major = !item.major;
          this.$http
            .post("/api/list/edit/" + row._id, { major: String(item.major) })
            .then(res => {
              this.$message({
                message: "修改成功",
                type: "success"
              });
            });
        }
      });
    },
    selectAll(selection) {
      if (selection.length !== 0) {
        selection.forEach(sitem => {
          this.todoList.forEach(titem => {
            if (sitem._id == titem._id) {
              titem.done = true;
              this.$http
                .post("/api/list/edit/" + titem._id, { done: String(true) })
                .then(res => {});
            }
          });
        });
        this.$message({
          message: "修改成功",
          type: "success"
        });
      }
      if (selection.length == 0 && this.currentlyList.length !== 0) {
        this.currentlyList.forEach(citem => {
          this.todoList.forEach(titem => {
            if (citem._id == titem._id) {
              titem.done = false;
              this.$http
                .post("/api/list/edit/" + titem._id, { done: String(false) })
                .then(res => {});
            }
          });
        });
        this.$message({
          message: "修改成功",
          type: "success"
        });
      }
    },
    dele(row) {
      this.todoList.forEach((item, index) => {
        if (item._id === row._id) {
          this.todoList.splice(index, 1);
          this.$http.get("/api/list/delete/" + row._id).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
        }
      });
    }
  },
  created() {
    this.getList();
  },
  updated() {
    this.toggleSelection(
      this.currentlyList.filter(item => {
        return item.done === true;
      })
    );
  }
};
</script>


<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
}
.cin {
  height: 100%;
  width: 100%;
  min-width: 335px;
}
.input {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99999999999999999;
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #6f83d4;
}
.btn {
  height: 40px;
  margin-left: 10px;
}

.i2 {
  flex-direction: row;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
}
.rightContainer {
  z-index: 1;
  width: 100%;
  box-sizing: border-box;
  height: 100vh;
  background-color: #6f83d4;
  padding-top: 105px;
  padding-left: 1%;
  min-width: 475px;
  padding-right: 1%;
  overflow: auto;
}
.login {
  cursor: pointer !important;
}
.cancel {
  color: #f0f9eb;
}
header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100px;
  background-color: rgba(0, 183, 255, 0.418);
  text-align: left;
  line-height: 30px;
  padding-left: 30%;
  font-weight: bold;
  overflow: hidden;
  z-index: 99;
  min-width: 475px;
}
.el-icon-star-on,
.el-icon-delete,
.el-icon-star-off {
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  margin-right: 8px;
}
.el-icon-star-on:hover,
.el-icon-delete:hover,
.el-icon-star-off:hover {
  color: red;
}
.el-icon-star-on {
  font-size: 20px;
}
h3 {
  font-size: 22px;
  line-height: 60px;
  color: aliceblue;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
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