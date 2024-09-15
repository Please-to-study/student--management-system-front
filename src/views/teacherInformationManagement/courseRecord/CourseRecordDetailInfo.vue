<template>
  <PageWrapper
    :title="`教师：` + courseRecordInfo.teacherName + `的上课记录`"
    contentBackground
    @back="goBack"
  >
    <template #extra>
      <a-button type="primary" danger> 禁用账号 </a-button>
      <!--      <a-button type="primary"> 修改密码 </a-button>-->
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <Description
        size="middle"
        title="用户信息"
        :bordered="false"
        :column="3"
        :data="courseRecordInfo"
        :schema="courseRecordSchema"
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
  import { getCourseRecordById } from '@/api/teacherInformationManagement/teacherInformationManagement';
  import { courseRecordSchema } from '@/views/teacherInformationManagement/courseRecord/account.data';

  defineOptions({ name: 'AccountDetail' });

  const route = useRoute();
  const go = useGo();
  // 此处可以得到用户ID
  const courseRecordId = ref(route.params?.courseRecordId);
  const { result } = await getCourseRecordById(courseRecordId.value as string);
  const courseRecordInfo = result?.items[0];

  const { setTitle } = useTabs();
  // TODO
  // 本页代码仅作演示，实际应当通过userId从接口获得用户的相关资料

  // --todolist-- 设置Tab的标题（不会影响页面标题）
  setTitle('上课记录详情：教师' + courseRecordInfo.teacherName);

  // 页面左侧点击返回链接时的操作
  function goBack() {
    go('/teacherInformationManagement/courseRecord');
  }
</script>

<style></style>
