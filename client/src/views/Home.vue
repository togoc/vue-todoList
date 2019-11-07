<template>
  <div class="home">
    <header>
      <h3>我的一天</h3>
      <span class="time">{{time}}</span>
    </header>
    <leftContainer></leftContainer>
    <div class="rightContainer">
      <el-table
        height="99%"
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="date" label="日期" width="100%" align="center"></el-table-column>
        <el-table-column prop="address" label="To-Do List" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column
          align="center"
          label="筛选"
          width="100"
          :filters="[{ text: '重要', value: '重要' }, { text: '普通', value: '普通' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <i
              :class="scope.row.tag === '重要' ? 'el-icon-star-on' : 'el-icon-star-off'"
              @click="show(scope.row)"
            ></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="input">
        <div i2>
          <el-input class="cin" placeholder="请输入内容" v-model="input" clearable></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import leftContainer from "../components/leftContainer";
export default {
  data() {
    return {
      time: new Date(),
      input: "",
      tableData3: [
        {
          tag: "重要",
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          tag: "公司",
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          tag: "重要",
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          tag: "公司",
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          tag: "重要",
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          tag: "家",
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          tag: "重要",
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          tag: "重要",
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },
  name: "home",
  components: {
    leftContainer
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    filterTag(value, row) {
      console.log(value, row);
      return row.tag === value;
    },
    show(row) {
      console.log(row);
    }
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
}

.i2 {
  width: 100%;
  height: 100%;
}
.rightContainer {
  padding-bottom: 60px;
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
  z-index: 999;
  min-width: 475px;
}
.el-icon-star-on,
.el-icon-star-off {
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
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