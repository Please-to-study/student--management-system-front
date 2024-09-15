<template>
  <PageWrapper
    :title="`学生: ` + studentInfo?.studentName + '（' + studentInfo?.studentNumber + '）' + `的资料`"
    contentBackground
    @back="goBack"
  >
    <template #extra>
      <a-button type="primary" danger> 禁用账号 </a-button>
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <Description
        size="middle"
        title="用户信息"
        :bordered="false"
        :column="3"
        :data="studentInfo"
        :schema="studentSchema"
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
  import {
    getStudentById,
  } from '@/api/studentInformationManagement/studentInformationManagement';
  import {
    studentSchema,
  } from "@/views/studentInformationManagement/basicInfo/account.data";

  defineOptions({ name: 'AccountDetail' });

  const route = useRoute();
  const go = useGo();
  // TODO
  // --todolist-- 本页代码仅作演示，实际应当通过studentNumber从接口获得用户的相关资料

  const studentInfo = ref();
  const { setTitle } = useTabs();
  // 此处可以得到用户ID
  // debugger;
  const studentId = ref(route.params?.studentId);

  const getStudent = async (id: number) => {
    const result = await getStudentById(id);
    console.log('result  is  ', result);
    studentInfo.value = result?.items[0];
    await setTitle('详细资料：' + studentInfo.value?.studentName);
    console.log('competitionInfo   is ', studentInfo);
  };

  getStudent(Number(studentId.value));

  // 页面左侧点击返回链接时的操作
  function goBack() {
    go('/studentInformationManagement/studentBasicInfo');
  }
</script>

<style></style>
