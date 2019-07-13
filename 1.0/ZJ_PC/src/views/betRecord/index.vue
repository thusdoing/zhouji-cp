<template>
    <div class="record-wrap">
        <Tabs value="name1" style="width:100%;">
            <TabPane label="历史开奖" name="name1">
                <Table v-if="$route.params.gameType=='11'||$route.params.gameType=='22'||$route.params.gameType=='33'||$route.params.gameType=='88'" :columns="historyListcolumnsNew" :data="historyList"></Table>
                <Table v-if="$route.params.gameType=='44'||$route.params.gameType=='55'" :columns="historyListcolumns" :data="historyList"></Table>
                <Table v-if="$route.params.gameType=='66'" :columns="historyListcolumnslhc" :data="historyList"></Table>
                <div class="more-record">
                    <router-link :to="'/more/'+$route.params.gameNo">更多开奖记录...</router-link>
                </div>
            </TabPane>
        </Tabs>

        <Tabs value="name1" style="width:100%;">
            <TabPane label="我的投注" name="name1">
                <Table :columns="betRecodescolumns" :data="betRecodesList"></Table>
                <div class="more-record">
                    <router-link to="/transaction">更多投注记录...</router-link>
                </div>
            </TabPane>
            <TabPane label="我的追号" name="name2">
                <Table :columns="Superadditioncolumns" :data="SuperadditionBetList"></Table>
                <div class="more-record">
                    <router-link to="/seekOrder">更多投注记录...</router-link>
                </div>
            </TabPane>
        </Tabs>

        <Tabs value="name1" style="width:100%;">
            <TabPane label="中奖信息" name="name1">
                <Table :columns="GameWinnerscolumns" :data="GameWinnersList"></Table>
            </TabPane>
            <!-- <TabPane label="昨日奖金榜" name="name2">
        <Table :columns="columns1" :data="historyList"></Table>
      </TabPane> -->
        </Tabs>
    </div>
</template>

<script>
import index from "./index.js";
export default {
  ...index
};
</script>

<style scoped lang="less">
.record-wrap {
  height: 100%;
}

.record-wrap/deep/.ivu-tabs-nav .ivu-tabs-tab-active {
  color: #db383f;
}

.record-wrap/deep/.ivu-tabs-ink-bar {
  background-color: #db383f;
}

.record-wrap/deep/.ivu-tabs-bar {
  margin-bottom: 0;
}

.record-wrap/deep/.ivu-table td,
.ivu-table th {
  height: 30px;
}

.record-wrap/deep/.ivu-table-cell {
  padding-left: 0;
  padding-right: 0;
  text-align: center;
}
.record-wrap/deep/.ivu-table-cell span {
  line-height: 16px;
}
.record-wrap/deep/.ivu-table th {
  height: 35px;
  white-space: nowrap;
  overflow: hidden;
  background-color: #f8f8f9;
  text-align: center;
}

div.more-record a {
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-bottom: 1px dashed #e9eaec;
  font-size: 12px;
  color: #db383f;
  text-decoration: none;
  &:hover {
    background: #ebf7ff;
  }
}

.record-wrap/deep/.ivu-tabs-nav .ivu-tabs-tab:hover {
  color: #db383f;
}
</style>
