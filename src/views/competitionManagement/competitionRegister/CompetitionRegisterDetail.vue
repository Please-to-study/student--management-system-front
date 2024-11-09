<template>
  <PageWrapper
    :title="
      `赛事预报名信息：` +
      competitionRegisterInfo?.studentName +
      ` ` +
      competitionRegisterInfo?.competitionName
    "
    contentBackground
    @back="goBack"
  >
    <template #extra> </template>
    <div class="pt-4 m-4 desc-wrap">
      <Description
        size="middle"
        title="预报名信息"
        :bordered="false"
        :column="3"
        :data="competitionRegisterInfo"
        :schema="competitionRegisterSchema"
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
  import { getCompetitionRegisterById } from '@/api/competitionManagement/competitionManagement';
  import { competitionRegisterSchema } from '@/views/competitionManagement/competitionRegister/account.data';

  defineOptions({ name: 'CompetitionDetail' });

  const route = useRoute();
  const go = useGo();
  const competitionRegisterInfo = ref();
  const { setTitle } = useTabs();
  // 此处可以得到用户ID
  // debugger;
  const competitionRegisterId = ref(route.params?.id);

  const getCompetitionRegister = async (id: number) => {
    const result = await getCompetitionRegisterById(id);
    console.log('result  is  ', result);
    competitionRegisterInfo.value = result?.items[0];
    await setTitle('详情：' + competitionRegisterInfo.value?.competitionName + ' 赛事');
    console.log('competitionInfo   is ', competitionRegisterInfo);
  };

  getCompetitionRegister(Number(competitionRegisterId.value));

  // 页面左侧点击返回链接时的操作
  function goBack() {
    go('/competitionManagement/competitionRegister');
  }
</script>

<style></style>
