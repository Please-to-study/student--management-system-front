<template>
  <PageWrapper
    :title="`教师资料：` + teacherInfo?.teacherName"
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
        title="教师信息"
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
  const { setTitle } = useTabs();
  // 此处可以得到用户ID
  const teacherId = ref(route.params?.id);
  const teacherInfo = ref();

  const getTeacher = async (id: number) => {
    const result = await getTeacherInfoById(id);
    teacherInfo.value = result;
    await setTitle('详细资料：' + teacherInfo.value?.teacherName);
  };

  getTeacher(Number(teacherId.value));
  // 页面左侧点击返回链接时的操作
  function goBack() {
    go('/teacherInformationManagement/basicInfo');
  }
</script>

<style></style>
