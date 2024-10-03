<template>
  <PageWrapper
    :title="
      `编程能力评级信息：` +
      programRateInfo?.studentName +
      `（` +
      programRateInfo?.studentNumber +
      `）`
    "
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
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '@/components/Page';
  import { Description } from '@/components/Description';
  import { useGo } from '@/hooks/web/usePage';
  import { useTabs } from '@/hooks/web/useTabs';
  import { Divider } from 'ant-design-vue';
  import { getProgramRateById } from '@/api/studentInformationManagement/studentInformationManagement';
  import { programRateSchema } from '@/views/studentInformationManagement/programmingRating/account.data';

  defineOptions({ name: 'ProgramRatingDetail' });

  const route = useRoute();
  const programRateInfo = ref();
  const { setTitle } = useTabs();
  const go = useGo();

  // 此处可以得到用户ID
  const programRateId = ref(route.params?.id);

  const getProgramRateInfo = async (id: number) => {
    const result = await getProgramRateById(id);
    programRateInfo.value = result[0];
    await setTitle(programRateInfo.value?.studentName + '的编程能力评级信息');
  };

  getProgramRateInfo(Number(programRateId.value));

  // 页面左侧点击返回链接时的操作
  function goBack() {
    go('/studentInformationManagement/programmingRating');
  }
</script>

<style></style>
