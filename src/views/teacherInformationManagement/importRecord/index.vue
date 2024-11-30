<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable
      @register="registerTable"
      class=""
      :searchInfo="searchInfo"
      @fetch-success="onFetchSuccess"
    >
      <template #toolbar>
        <a-button type="primary" @click="handleAdd">新增记录</a-button>
        <ImpExcel @success="loadDataSuccess" dateFormat="YYYY-MM-DD">
          <a-button class="m-3"> 导入Excel </a-button>
        </ImpExcel>
        <a-button type="primary" @click="handleSubmit">上传记录</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="createActions(record)" />
        </template>
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';

  import {
    BasicTable,
    useTable,
    TableAction,
    BasicColumn,
    EditRecordRow,
    ActionItem,
  } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';

  import { columnMap, columns, mustKeyArray } from './data';
  import { useGo } from '@/hooks/web/usePage';
  import { useMessage } from '@/hooks/web/useMessage';
  import { isNull, isUndefined } from '@/utils/is';
  import type { Recordable } from '@vben/types';
  import { useModal } from '@/components/Modal';
  import { ExcelData, ImpExcel } from '@/components/Excel';
  import {
    AddLearningRecordList,
    AddLearningRecordParams,
  } from '@/api/courseInformationManagement/model/learningRecord';
  import { cloneDeep } from 'lodash-es';
  import { addLearningRecord } from '@/api/courseInformationManagement/courseInformationManagement';
  import AccountModal from '@/views/teacherInformationManagement/importRecord/AccountModal.vue';

  defineOptions({ name: 'AccountManagement' });

  const { createMessage: msg, notification } = useMessage();
  const go = useGo();
  const currentEditKeyRef = ref('');
  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const teacherInfo = ref<any>(null);
  const [
    registerTable,
    { reload, getRawDataSource, setTableData, deleteTableDataRecord, getDataSource },
  ] = useTable({
    title: '导入学习记录列表',
    rowKey: 'id',
    columns,
    showTableSetting: true,
    autoCreateKey: true,
    bordered: true,
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
    },
  });

  function onFetchSuccess({ total }) {
    if (!isUndefined(total)) {
      const { info } = getRawDataSource();
      teacherInfo.value = info;
    }
  }

  function createActions(record: EditRecordRow): ActionItem[] {
    if (!record.editable) {
      return [
        {
          label: '编辑',
          disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.id : false,
          onClick: handleEdit.bind(null, record),
        },
        {
          label: '删除',
          tooltip: '删除此信息',
          popConfirm: {
            title: '是否确认删除',
            placement: 'left',
            confirm: handleDelete.bind(null, record),
          },
        },
      ];
    }
    return [
      {
        label: '保存',
        onClick: handleSave.bind(null, record),
      },
      {
        label: '取消',
        popConfirm: {
          title: '是否取消编辑',
          confirm: handleCancel.bind(null, record),
        },
      },
    ];
  }

  function handleAdd() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleSuccess({ isUpdate, values }) {
    // if (isUpdate) {
    //   // 演示不刷新表格直接更新内部数据。
    //   // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
    //   const result = updateTableDataRecord(values.id, values);
    //   reload();
    // } else {
    //   reload();
    // }
  }

  function handleEdit(record: EditRecordRow) {
    currentEditKeyRef.value = record.id;
    // console.log('record is ', record.id);
    record.onEdit?.(true);
  }

  function handleCancel(record: EditRecordRow) {
    currentEditKeyRef.value = '';
    record.onEdit?.(false, false);
  }

  async function handleSave(record: EditRecordRow) {
    // 校验
    msg.loading({ content: '正在保存...', duration: 0, key: 'saving' });
    const valid = await record.onValid?.();
    if (valid) {
      try {
        const data = cloneDeep(record.editValueRefs);
        // console.log(data);
        const tabdata = getDataSource();
        //TODO 此处将数据提交给服务器保存
        // ...
        // 保存之后提交编辑状态
        const pass = await record.onEdit?.(false, true);
        if (pass) {
          currentEditKeyRef.value = '';
        }
        msg.success({ content: '数据已保存', key: 'saving' });
      } catch (error) {
        msg.error({ content: '保存失败', key: 'saving' });
      }
    } else {
      msg.error({ content: '请填写正确的数据', key: 'saving' });
    }
  }

  function handleDelete(record: Recordable) {
    deleteTableDataRecord(record.id);
  }

  async function handleSubmit() {
    const tableData = getDataSource();
    const params: AddLearningRecordList = [];
    for (const data of tableData) {
      let {
        learningRecordDate,
        studentNumber,
        studentCourseEvaluate,
        courseContent,
        materialsTitle,
        courseId,
        courseTime,
        courseCategoryId,
        teacherId,
        learningRecordCourseClear,
        learningRecordStartTime,
        learningRecordEndTime,
      } = data;
      learningRecordStartTime = learningRecordStartTime.substring(0, 6) + ':00';
      learningRecordEndTime = learningRecordEndTime.substring(0, 6) + ':00';
      const record: AddLearningRecordParams = {
        learningRecordDate,
        studentNumber: String(studentNumber),
        studentCourseEvaluate,
        courseContent,
        materialsTitle,
        courseId: Number(courseId),
        courseTime: Number(courseTime),
        courseCategoryId: Number(courseCategoryId),
        teacherId: Number(teacherId),
        learningRecordCourseClear: Number(learningRecordCourseClear),
        learningRecordStartTime,
        learningRecordEndTime,
      };
      params.push(record);
    }
    const { code, message } = await addLearningRecord(params);
    if (code == 0) {
      msg.success('全部数据上传成功', 1);
      setTimeout(() => {
        setTableData([]);
      }, 1000);
    } else {
      msg.error('导入数据失败', 1);
    }
    // console.log('tableData is ', tableData);
  }

  async function loadDataSuccess(excelDataList: ExcelData[]) {
    const tableData: any[] = [];
    const wrongData: number[] = [];
    const startTime = 'learningRecordStartTime';
    const endTime = 'learningRecordEndTime';
    const rightTimeLength = 5;
    for (const excelData of excelDataList) {
      const {
        header,
        results,
        meta: { sheetName },
      } = excelData;

      let index: number = 0;
      for (const obj of results) {
        index++;
        const temp = {};
        for (const k in obj) {
          const key = columnMap.get(k);
          const value = obj[k];
          if (!isUndefined(key)) {
            temp[key] = value;
          }
        }
        temp.id = index;
        for (const key of mustKeyArray) {
          if (isUndefined(temp[key]) || isNull(temp[key])) {
            wrongData.push(index);
          } else if (key == startTime && temp[key].length < rightTimeLength) {
            wrongData.push(index);
          } else if (
            key == endTime &&
            temp[key].length < rightTimeLength &&
            !wrongData.includes(index)
          ) {
            wrongData.push(index);
          }
        }
        console.log('wrongData is', wrongData);
        tableData.push(temp);
      }
      setTableData(tableData);
      let hint: String = '第';
      for (let index = 0; index < wrongData.length; ++index) {
        hint = hint + String(wrongData[index]);
        if (index !== wrongData.length - 1) {
          hint = hint + '、';
        }
      }
      hint = hint + '条数据有误，请检查！';
      if (wrongData.length > 0) {
        handleNotify(hint);
      }
      // console.log('tableData is', tableData);
    }
  }

  function handleNotify(description) {
    notification.error({
      message: '提示',
      description: description,
      duration: null,
    });
  }
</script>
