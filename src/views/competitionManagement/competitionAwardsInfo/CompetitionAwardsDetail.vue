<template>
  <PageWrapper
    :title="`赛事：` + competitionAwardsInfo?.competitionName + `的详细信息`"
    contentBackground
    @back="goBack"
  >
    <template #extra> </template>
    <div class="pt-4 m-4 desc-wrap">
      <Description
        size="middle"
        title="用户信息"
        :bordered="false"
        :column="3"
        :data="competitionAwardsInfo"
        :schema="competitionAwardsSchema"
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
  import { getCompetitionAwardsById } from '@/api/competitionManagement/competitionManagement';
  import { QueryCompetitionAwardsDetailParams } from '@/api/competitionManagement/model/competitionAwards';
  import { competitionAwardsSchema } from '@/views/competitionManagement/competitionAwardsInfo/account.data';

  defineOptions({ name: 'AccountDetail' });

  const route = useRoute();
  const competitionAwardsInfo = ref();
  const go = useGo();
  const { setTitle } = useTabs();
  // 此处可以得到用户ID
  const queryId = ref(route.params?.id);
  const queryArray = queryId.value.split('_');
  const params: QueryCompetitionAwardsDetailParams = {
    competitionInfoId: Number(queryArray[0]),
    competitionId: Number(queryArray[1]),
    studentId: Number(queryArray[2]),
  };

  const getCompetitionAwards = async (params: QueryCompetitionAwardsDetailParams) => {
    const result = await getCompetitionAwardsById(params);
    // console.log('result  is  ', result);
    competitionAwardsInfo.value = result?.items[0];
    // 设置Tab的标题（不会影响页面标题）
    await setTitle('详情：' + competitionAwardsInfo.value?.competitionName + ' 赛事');
    // console.log('competitionInfo   is ', competitionInfo);
  };

  getCompetitionAwards(params);

  // 页面左侧点击返回链接时的操作
  function goBack() {
    go('/competitionManagement/competitionAwardsInfo');
  }
</script>

<style></style>
