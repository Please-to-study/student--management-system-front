<template>
  <PageWrapper
    :title="`学习记录:` + learningRecordInfo?.studentName + `的学习记录信息`"
    contentBackground
    @back="goBack"
  >
    <template #extra>
      <!--      <a-button type="primary" danger> 禁用账号 </a-button>-->
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
        :data="learningRecordInfo"
        :schema="learningRecordSchema"
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
  import { getLearningRecordById } from '@/api/courseInformationManagement/courseInformationManagement';
  import { learningRecordSchema } from '@/views/courseInformationManagement/learningRecord/account.data';

  defineOptions({ name: 'AccountDetail' });

  const route = useRoute();
  const go = useGo();
  const learningRecordInfo = ref();
  const { setTitle } = useTabs();
  // 此处可以得到用户ID
  const learningRecordId = ref(route.params?.id);

  const getLearningRecord = async (id: number) => {
    const result = await getLearningRecordById(id);
    learningRecordInfo.value = result;
    await setTitle('详情：' + learningRecordInfo.value?.studentName + '的学习记录信息');
  };

  getLearningRecord(Number(learningRecordId.value));

  // 页面左侧点击返回链接时的操作
  function goBack() {
    go('/courseInformationManagement/learningRecord');
  }
</script>

<style></style>
