<template>
  <PageWrapper
    :title="programRateInfo?.studentName + `的编程能力评级`"
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
        title="用户信息"
        :bordered="false"
        :column="3"
        :data="programRateInfo"
        :schema="programRateSchema"
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
  import { programRateSchema } from '@/views/studentInformationManagement/programmingRating/account.data';

  defineOptions({ name: 'ProgramRatingDetail' });

  const route = useRoute();
  const go = useGo();
  // 此处可以得到用户ID
  const programRateId = ref(route.params?.programRateId);
  const { result } = await getSpendingInfoById(unref(programRateId) as string);
  const programRateInfo = result?.items[0];

  const { setTitle } = useTabs();
  setTitle('编程能力评级：' + programRateInfo?.studentName);

  // 页面左侧点击返回链接时的操作
  function goBack() {
    go();
    // go('/studentInformationManagement/studentBasicInfo');
  }
</script>

<style></style>
