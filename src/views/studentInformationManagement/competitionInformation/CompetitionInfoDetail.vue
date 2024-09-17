<template>
  <PageWrapper
    :title="
      `详情：` +
      competitionInfo?.studentName +
      `（` +
      competitionInfo?.studentNumber +
      `）` +
      `的参赛信息`
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
        title="参赛信息"
        :bordered="false"
        :column="3"
        :data="competitionInfo"
        :schema="competitionInfoSchema"
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
  import { getCompetitionInfoById } from '@/api/studentInformationManagement/studentInformationManagement';
  import { competitionInfoSchema } from '@/views/studentInformationManagement/competitionInformation/account.data';

  defineOptions({ name: 'AccountDetail' });

  const route = useRoute();
  const competitionInfo = ref();
  const { setTitle } = useTabs();
  const go = useGo();

  // 此处可以得到用户ID
  const competitionInfoId = ref(route.params?.id);

  const getCompetitionInfo = async (id: number) => {
    const result = await getCompetitionInfoById(id);
    competitionInfo.value = result[0];
    await setTitle(competitionInfo.value?.studentName + '的参赛信息');
  };

  getCompetitionInfo(Number(competitionInfoId.value));

  // 页面左侧点击返回链接时的操作
  function goBack() {
    go('/studentInformationManagement/competitionInformation');
  }
</script>

<style></style>
