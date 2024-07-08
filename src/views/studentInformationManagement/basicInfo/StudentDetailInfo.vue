<template>
  <PageWrapper
    :title="`用户` + userId + `的资料`"

    contentBackground
    @back="goBack"
  >
    <template #extra>
      <a-button type="primary" danger> 禁用账号 </a-button>
<!--      <a-button type="primary"> 修改密码 </a-button>-->
    </template>
<!--    <template #footer>-->
<!--      <a-tabs default-active-key="detail" v-model:activeKey="currentKey">-->
<!--        <a-tab-pane key="detail" tab="用户资料" />-->
<!--      </a-tabs>-->
<!--    </template>-->
    <div class="pt-4 m-4 desc-wrap">
      <Description
        size="middle"
        title="用户信息"
        :bordered="false"
        :column="3"
        :data="personData"
        :schema="personSchema"
      />
      <Divider />
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '@/components/Page';
  import { DescItem, Description } from "@/components/Description";
  import { useGo } from '@/hooks/web/usePage';
  import { useTabs } from '@/hooks/web/useTabs';
  import { Divider, Tabs } from "ant-design-vue";

  const personData = {
    b1: '付小小',
    b2: '18100000000',
    b3: '菜鸟仓储',
    b4: '浙江省杭州市西湖区万塘路18号',
    b5: '无',
  };

  const personSchema: DescItem[] = [
    {
      field: 'b1',
      label: '用户姓名',
    },
    {
      field: 'b2',
      label: '联系电话',
    },
    {
      field: 'b3',
      label: '常用快递',
    },
    {
      field: 'b4',
      label: '取货地址',
    },
    {
      field: 'b5',
      label: '备注',
    },
  ];

  defineOptions({ name: 'AccountDetail' });

  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;

  const route = useRoute();
  const go = useGo();
  // 此处可以得到用户ID
  const userId = ref(route.params?.id);
  const currentKey = ref('detail');
  const { setTitle } = useTabs();
  // TODO
  // 本页代码仅作演示，实际应当通过userId从接口获得用户的相关资料

  // 设置Tab的标题（不会影响页面标题）
  setTitle('详情：用户' + userId.value);

  // 页面左侧点击返回链接时的操作
  function goBack() {
    go();
    // go('/studentInformationManagement/studentBasicInfo');
  }
</script>

<style></style>
