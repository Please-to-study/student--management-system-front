<template>
  <PageWrapper
    :title="`赛事：` + competitionInfo?.competitionName + `详细信息`"
    contentBackground
    @back="goBack"
  >
    <template #extra> </template>
    <div class="pt-4 m-4 desc-wrap">
      <Description
        size="middle"
        title="赛事信息"
        :bordered="false"
        :column="3"
        :data="competitionInfo"
        :schema="competitionSchema"
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
  import { getCompetitionById } from '@/api/competitionManagement/competitionManagement';
  import { competitionSchema } from '@/views/competitionManagement/competitionInfo/account.data';

  defineOptions({ name: 'CompetitionDetail' });

  const route = useRoute();
  const go = useGo();
  const competitionInfo = ref();
  const { setTitle } = useTabs();
  // 此处可以得到用户ID
  // debugger;
  const competitionId = ref(route.params?.competitionId);

  const getCompetition = async (id: number) => {
    const result = await getCompetitionById(id);
    console.log('result  is  ', result);
    competitionInfo.value = result?.items[0];
    await setTitle('详情：' + competitionInfo.value?.competitionName + ' 赛事');
    console.log('competitionInfo   is ', competitionInfo);
  };

  getCompetition(Number(competitionId.value));

  // 页面左侧点击返回链接时的操作
  function goBack() {
    go('/competitionManagement/competitionInfo');
  }
</script>

<style></style>
