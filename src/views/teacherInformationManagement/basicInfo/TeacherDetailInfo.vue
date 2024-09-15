<template>
  <PageWrapper
    :title="`教师` + teacherInfo.teacherName + `的资料`"
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
        :data="teacherInfo"
        :schema="teacherInfoSchema"
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
  import { getTeacherInfoById } from '@/api/teacherInformationManagement/teacherInformationManagement';
  import { teacherInfoSchema } from '@/views/teacherInformationManagement/basicInfo/account.data';

  defineOptions({ name: 'AccountDetail' });

  const route = useRoute();
  const go = useGo();
  // 此处可以得到用户ID
  const teacherId = ref(route.params?.teacherId);
  const { result } = await getTeacherInfoById(teacherId.value as string);
  const teacherInfo = result?.items[0];

  const { setTitle } = useTabs();
  // TODO
  // 本页代码仅作演示，实际应当通过userId从接口获得用户的相关资料

  // --todolist-- 设置Tab的标题（不会影响页面标题）
  setTitle('详情：教师' + teacherInfo.teacherName);

  // 页面左侧点击返回链接时的操作
  function goBack() {
    go('/teacherInformationManagement/basicInfo');
  }
</script>

<style></style>
