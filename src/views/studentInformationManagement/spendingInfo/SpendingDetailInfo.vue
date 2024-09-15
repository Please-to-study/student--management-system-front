<template>
  <PageWrapper :title="spendingInfo?.studentName + `的缴费信息`" contentBackground @back="goBack">
    <template #extra>
      <!--      <a-button type="primary" danger> 禁用账号 </a-button>-->
      <!--      <a-button type="primary"> 修改密码 </a-button>-->
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <Description
        size="middle"
        title="用户信息"
        :bordered="false"
        :column="3"
        :data="spendingInfo"
        :schema="spendingSchema"
      />
      <Divider />
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '@/components/Page';
  import { Description } from '@/components/Description';
  import { useGo } from '@/hooks/web/usePage';
  import { useTabs } from '@/hooks/web/useTabs';
  import { Divider } from 'ant-design-vue';
  import { getSpendingInfoById } from '@/api/studentInformationManagement/studentInformationManagement';
  import { spendingSchema } from '@/views/studentInformationManagement/spendingInfo/account.data';

  defineOptions({ name: 'SpendingDetail' });

  const route = useRoute();
  const go = useGo();
  // 此处可以得到用户ID
  const payId = ref(route.params?.payId);
  const { result } = await getSpendingInfoById(unref(payId) as string);
  const spendingInfo = result?.items[0];

  const { setTitle } = useTabs();
  setTitle('缴费详情：' + spendingInfo?.studentName);

  // 页面左侧点击返回链接时的操作
  function goBack() {
    go();
    // go('/studentInformationManagement/studentBasicInfo');
  }
</script>

<style></style>
