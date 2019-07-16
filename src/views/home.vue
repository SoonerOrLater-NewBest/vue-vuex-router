<template>
  <div class="home">
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/about' }">活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="margin: 20px 0;overflow:hidden;">
          <el-button size="small" @click="toggleSelection()">全不选</el-button>
          <el-button size="small" @click="deleteAll">批量删除</el-button>
          <el-button size="small" @click="add">新增</el-button>
          <div style="float:right">
            <el-select
              size="small"
              v-model="listQuery.status"
              placeholder="全部状态"
              clearable
              style="width: 120px;margin-right:10px;"
              class="filter-item"
              @change="handleFilter"
            >
              <el-option v-for="item in status" :key="item" :label="item" :value="item" />
            </el-select>
            <el-input
              size="small"
              v-model="listQuery.title"
              placeholder="Title"
              style="width: 160px;"
              class="filter-item"
              @keyup.enter.native="handleFilter"
            />
            <el-button size="small" icon="el-icon-search" style="padding: 8px 14px;border-left:0 none;" @click="handleFilter"></el-button>
          </div>
        </div>
        <el-table
          v-loading="listLoading"
          ref="multipleTable"
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="55"></el-table-column>
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Pagination from "@/components/Pagination";
import { getUserInfo } from "@/api/common";
import animate from "animate.css";
import TWEEN from "tween.js";
let item = {
  date: "2016-05-07",
  name: "王小虎",
  address: "上海市普陀区金沙江路 1518 弄"
};

export default {
  name: "home",
  components: {
    Pagination
  },
  data() {
    return {
      total: 0,
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        status: '',
        title: ''
      },
      status: ["正常", "已删除", "VIP"],
      multipleSelection: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
     handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    getList(e = {}) {
      this.listLoading = true;
      // 此处赋值时，传入this.listQuery作筛选
      console.log(this.listQuery);
      this.list = [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ];
      this.total = 60;
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    deleteAll() {
      console.log("删除选中的：", this.multipleSelection);
    },
    add() {
      alert("TODO");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/iconfont/iconfont.css";
</style>
