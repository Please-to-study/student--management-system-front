<template>
  <PageWrapper title="导入学生学习记录">
    <ImpExcel @success="loadDataSuccess" dateFormat="YYYY-MM-DD">
      <a-button class="m-3"> 导入Excel </a-button>
    </ImpExcel>
    <BasicTable
      v-for="(table, index) in tableListRef"
      :key="index"
      :title="table.title"
      :columns="table.columns"
      :dataSource="table.dataSource"
    />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  import { ImpExcel, ExcelData } from '@/components/Excel';
  import { BasicTable, BasicColumn } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { addLearningRecord } from '@/api/courseInformationManagement/courseInformationManagement';
  import { AddLearningRecordParams } from '@/api/courseInformationManagement/model/learningRecord';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  const tableListRef = ref<
    {
      title: string;
      columns?: any[];
      dataSource?: any[];
    }[]
  >([]);

  async function loadDataSuccess(excelDataList: ExcelData[]) {
    tableListRef.value = [];
    console.log(excelDataList);
    for (const excelData of excelDataList) {
      const {
        header,
        results,
        meta: { sheetName },
      } = excelData;
      const columns: BasicColumn[] = [];
      for (const title of header) {
        columns.push({ title, dataIndex: title });
      }
      let importFlag: boolean = true;
      for (const res of results) {
        const queryParams: AddLearningRecordParams = {
          studentId: res.studentId,
          courseId: res.courseId,
          teacherId: res.teacherId,
          courseRecordId: res.courseRecordId,
          studentCourseEvaluate: res.studentCourseEvaluate,
          materialsId: res.materialsId,
          courseCategoryId: res.courseCategoryId,
          learningRecordNotes: res.learningRecordNotes,
        };
        // const data = await addLearningRecord(queryParams);
        // console.log('addLearningRecord', data);
        // if (data.code != 0) {
        //   importFlag = false;
        // }
      }
      if (importFlag) {
        tableListRef.value.push({ title: sheetName, dataSource: results, columns });
        createMessage.success('导入数据成功');
      } else {
        createMessage.error('导入数据失败');
      }
    }
  }
</script>
