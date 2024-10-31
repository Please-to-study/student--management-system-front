<template>
  <PageWrapper
    :title="
      `教师：` + courseRecordInfo?.teacherName + `的` + courseRecordInfo?.courseName + `的上课记录`
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
        title="上课记录详细信息"
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
  const { setTitle } = useTabs();
  // 此处可以得到用户ID
  const courseRecordId = ref(route.params?.id);
  const courseRecordInfo = ref();

  const getCourseRecord = async (id: number) => {
    const result = await getCourseRecordById(id);
    // console.log("getCourseRecord is ", result)
    courseRecordInfo.value = result?.items[0];
    await setTitle(
      '详细资料：' +
        courseRecordInfo.value?.teacherName +
        '的' +
        courseRecordInfo.value?.courseName,
    );
  };

  getCourseRecord(Number(courseRecordId.value));

  // 页面左侧点击返回链接时的操作
  function goBack() {
    go('/teacherInformationManagement/courseRecord');
  }
</script>

<style></style>
