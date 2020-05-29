```
<template>
  <div>
    <div class="saga-brand-box mt90 por">
      <div class="breadcrumb-content">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>所有品牌</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$route.query.BrandCname}}：</el-breadcrumb-item>
        </el-breadcrumb>
        <template v-for="i in system">
          <span v-for="classItem in i.DefClass" :key="classItem.Code + classItem.AliasName" v-show="classItem.show"
                class="select">{{classItem.AliasName}}
            <i class="el-icon-close" @click="deleteCurrent(classItem)"></i>
          </span>
        </template>
        <span class="total poa">共<b>{{total}}</b>件相关产品</span>
      </div>

      <div class="device-sys" v-for="systemItem in system" :key="systemItem.Code + systemItem.AliasName">
        <div class="left">{{systemItem.AliasName}}:</div>
        <div class="main">
          <ul>
            <li v-for="(group,index) in systemItem.DefClass"
                style="cursor: pointer"
                :key="group.Code + group.AliasName"
                v-show="index < systemItem.limitSys"
                @click="currentSys(group)"
                :title="group.AliasName"
                :class="group.show ? 'light':''">
              {{group.AliasName}}
            </li>
          </ul>
        </div>
        <div class="right" @click="allData(systemItem,systemItem.DefClass.length)"
             :class="systemItem.more? 'dark' :'light'">
          <p style="cursor: pointer;">{{systemItem.more?'更多':'收起'}}
            <span :class="systemItem.more?'el-icon-caret-bottom':'el-icon-caret-top'"></span>
          </p>
        </div>
      </div>

    </div>
    <div class="saga-brand-box mt20">
      <detailTable :table="table" @deleteProdType="deleteProdType"/>
    </div>
  </div>

</template>

<script>
  import detailTable from "../../public/detailTable";
  import {mapGetters} from "vuex"
  import {classQueryByBrand, prodTypeDelete, prodTypeQuery} from "@/api/product"

  export default {
    components: {detailTable},
    created() {
      this.getDate()
      this.getProductList()
    },
    mounted() {
    },

    data() {
      return {
        // limitSys: 14,
        system: [],
        total: 0,
        table: [],
        defClassList: [],
      }
    },
    computed: {
      ...mapGetters('layout', ['dictionary']),
    },
    methods: {
      getDate() {
        let param = {
          GroupId: this.dictionary.groupId,
          Type: this.dictionary.dictionaryType,
          ProjectId: this.dictionary.projectId,
          BrandID: this.$route.query.BrandID,
          Orders: 'name asc, createTime desc'
        }
        classQueryByBrand(param, res => {
          this.system = res.Content ? res.Content.map(j => {
            j.more = true
            j.limitSys = 14
            j.DefClass.forEach((k, index) => {
              k.show = false
            })
            return j
          }) : []
        })
      },
      getProductList() {
        let params = {
          GroupId: this.dictionary.groupId,
          Type: this.dictionary.dictionaryType,
          ProjectId: this.dictionary.projectId,
          Filters: `BrandID='${this.$route.query.BrandID}'`
        }
        prodTypeQuery(params, res => {
          this.total = res.Total
          this.table = res.Content.map(i => ({...i, Brand: this.$route.query}))
        })
      },
      deleteProdType(val) {
        let {Brand, ...params} = val
        prodTypeDelete([params], res => {
          this.$message.success('删除成功')
          this.getProductList()
          this.getDate()
        })
      },
      allData(systemItem, length) {
        systemItem.more = systemItem.more ? false : true
        systemItem.limitSys = systemItem.more ? 14 : length
      },
      currentSys(group) {
        this.defClassList = []
        this.system.forEach(item => {
          if (item.DefClass) {
            this.defClassList = this.defClassList.concat(item.DefClass)
          }
        })
        this.defClassList.forEach(item => {
          item.show = item.Code == group.Code ? true : false
        })
        let params = {
          GroupId: this.dictionary.groupId,
          Type: this.dictionary.dictionaryType,
          ProjectId: this.dictionary.projectId,
          Filters: `prodCode='${group.Code}';BrandID='${this.$route.query.BrandID}'`
        }
        prodTypeQuery(params, res => {
          this.total = res.Total
          this.table = res.Content.map(i => ({...i, Brand: this.$route.query}))
        })
      },
      deleteCurrent(group) {
        group.show = false
        this.getProductList()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .mt90 {
    margin-top: 90px;
  }

  .mt20 {
    margin-top: 20px;
  }

  .por {
    position: relative;
  }

  .poa {
    position: absolute;
  }

  .saga-brand-box {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);

    .breadcrumb-content {
      display: flex;
      border-bottom: 1px solid #EFF0F1;
      padding-bottom: 20px;

      .total {
        text-align: right;
        color: #8D9399;
        right: 0;
        margin-right: 30px;

        b {
          color: #1F2429;
        }
      }

      .select {
        margin-left: 20px;
        display: inline-block;
        background: #EFF0F1;
        padding: 0 10px;
        line-height: 22px;
        cursor: pointer;
        margin-top: -3px;
      }
    }

    .device-sys {
      display: flex;
      margin-top: 10px;
      border-bottom: 1px solid #EFF0F1;
      padding-bottom: 10px;

      .left {
        padding-top: 6px;
        color: #8D9399;
        width: 120px;
      }

      .right {
        width: 100px;
        text-align: center;
        padding-top: 6px;

      }

      .main {
        color: #1F2429;
        width: 1020px;

        ul {
          li {
            display: inline-block;
            line-height: 25px;
            max-width: 97px;
            min-width: 80px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            margin-right: 40px;
          }
        }
      }
    }

    /deep/ .el-breadcrumb__item:first-child .el-breadcrumb__inner:first-child {
      color: #8D9399
    }

    .dark {
      color: #8D9399
    }

    .light {
      color: #3A8DDE;
    }
  }

</style>

```
