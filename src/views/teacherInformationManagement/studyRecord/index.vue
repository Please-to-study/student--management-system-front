<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" class="" :searchInfo="searchInfo">
      <template #form-custom>
        <ApiSelect
          :api="getSameStudent"
          showSearch
          allowClear
          placeholder="请选择学生"
          v-model:value="studentId"
          :filterOption="false"
          labelField="studentLabel"
          valueField="studentId"
          :params="searchParams"
          @search="debounceOptionsFn"
        />
      </template>
      <!--      <template #toolbar>-->
      <!--        <a-button @click="handleExport"> 导出记录 </a-button>-->
      <!--      </template>-->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看记录详情',
                onClick: handleView.bind(null, record),
              },
              // {
              //   icon: 'clarity:note-edit-line',
              //   tooltip: '编辑记录信息',
              //   onClick: handleEdit.bind(null, record),
              // },
              // {
              //   icon: 'ant-design:delete-outlined',
              //   color: 'error',
              //   tooltip: '删除此记录',
              //   popConfirm: {
              //     title: '是否确认删除',
              //     placement: 'left',
              //     confirm: handleDelete.bind(null, record),
              //   },
              // },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref, unref } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';

  import { useModal } from '@/components/Modal';
  import AccountModal from './AccountModal.vue';

  import { columns, searchFormSchema } from './account.data';
  import { useGo } from '@/hooks/web/usePage';
  import { getSameStudent } from '@/api/studentInformationManagement/studentInformationManagement';
  import { ApiSelect } from '@/components/Form';
  import type { Recordable } from '@vben/types';
  import { useDebounceFn } from '@vueuse/core';
  import { useUserStore } from '@/store/modules/user';
  import { isNull, isUndefined } from '@/utils/is';
  import { getLearningRecordListWithTeacher } from '@/api/courseInformationManagement/courseInformationManagement';

  defineOptions({ name: 'AccountManagement' });

  const go = useGo();
  const userStore = useUserStore();
  const debounceOptionsFn = useDebounceFn(onSearch, 300);
  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const studentId = ref<string>('');
  const { userId } = userStore.getUserInfo;
  const [registerTable, { reload, updateTableDataRecord }] = useTable({
    title: '学习记录列表',
    api: getLearningRecordListWithTeacher,
    rowKey: 'learningRecordId',
    searchInfo: {
      studentId: -1,
      learningRecordDate: '',
      courseName: '',
      teacherId: userId,
    },
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      resetFunc: customResetFunc,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    handleSearchInfoFn(info) {
      const studentIdFlag = isNull(studentId.value);
      if (studentIdFlag) {
        info.studentId = -1;
      } else {
        info.studentId = studentId.value;
      }
      const learningRecordDateFlag =
        isUndefined(info.learningRecordDate) || info.learningRecordDate?.length === 0;
      if (learningRecordDateFlag) {
        info.learningRecordDate = '';
      }
      const courseNameFlag = isUndefined(info.courseName) || info.courseName?.length === 0;
      if (courseNameFlag) {
        info.courseName = '';
      }
      info.teacherId = userId;
      return info;
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
    },
  });

  async function customResetFunc() {
    studentId.value = '';
  }

  const keyword = ref<string>('');
  const searchParams = computed<Recordable<string>>(() => {
    return { studentName: unref(keyword) };
  });

  function onSearch(value: string) {
    keyword.value = value;
  }

  function handleSuccess({ isUpdate, values }) {
    if (isUpdate) {
      // 演示不刷新表格直接更新内部数据。
      // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
      const result = updateTableDataRecord(values.learningRecordId, values);
      console.log(result);
    } else {
      reload();
    }
  }

  function handleView(record: Recordable) {
    go('/courseInformationManagement/learningRecordDetail/' + record.learningRecordId);
  }
</script>
