<template>
  <PageWrapper
    :title="`缴费信息：` + payInfo?.studentName + '（' + payInfo?.studentNumber + '）'"
    contentBackground
    @back="goBack"
  >
    <template #extra>
      <!--      <a-button type="primary" danger> 禁用账号 </a-button>-->
      <!--      <a-button type="primary"> 修改密码 </a-button>-->
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <Description
        size="middle"
        title="缴费信息"
        :bordered="false"
        :column="3"
        :data="payInfo"
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
  import { getPayInfoById } from '@/api/studentInformationManagement/studentInformationManagement';
  import { spendingSchema } from '@/views/studentInformationManagement/payInfo/account.data';

  defineOptions({ name: 'SpendingDetail' });

  const route = useRoute();
  const go = useGo();
  // 此处可以得到用户ID
  const payId = ref(route.params?.id);
  const payInfo = ref();
  const { setTitle } = useTabs();

  const getPayInfo = async (id: number) => {
    const result = await getPayInfoById(id);
    payInfo.value = result;
    await setTitle('缴费信息：' + payInfo.value?.studentName);
  };

  getPayInfo(Number(payId.value));

  // 页面左侧点击返回链接时的操作
  function goBack() {
    go('/studentInformationManagement/payInfo');
  }
</script>

<style></style>
