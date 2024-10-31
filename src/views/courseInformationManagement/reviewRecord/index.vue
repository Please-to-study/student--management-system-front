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
      <template #toolbar>
        <a-button type="primary" @click="handleIdentity">审核通过</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              // {
              //   icon: 'clarity:info-standard-line',
              //   tooltip: '查看记录详情',
              //   onClick: handleView.bind(null, record),
              // },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑记录信息',
                onClick: handleEdit.bind(null, record),
              },
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
  import { isNull, isUndefined } from '@/utils/is';
  import {
    deleteLearningRecord,
    getReviewRecordList,
    identityReviewRecord,
  } from '@/api/courseInformationManagement/courseInformationManagement';
  import { useUserStore } from '@/store/modules/user';
  import { IdentityReviewRecordList } from '@/api/courseInformationManagement/model/reviewRecord';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'AccountManagement' });

  const go = useGo();
  const { createMessage: msg } = useMessage();
  const userStore = useUserStore();
  const debounceOptionsFn = useDebounceFn(onSearch, 300);
  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const studentId = ref<string>('');
  const [registerTable, { reload, updateTableDataRecord, deleteTableDataRecord, getSelectRows }] =
    useTable({
      title: '待审核记录列表',
      api: getReviewRecordList,
      rowKey: 'learningRecordId',
      searchInfo: {
        studentId: -1,
        learningRecordDate: '',
        courseName: '',
        teacherName: '',
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
      rowSelection: {
        type: 'checkbox',
      },
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
        const teacherNameFlag = isUndefined(info.teacherName) || info.teacherName?.length === 0;
        if (teacherNameFlag) {
          info.teacherName = '';
        }
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

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  async function handleIdentity() {
    const selectReviewRecord = getSelectRows();
    const { userId } = userStore.getUserInfo;
    const reviewRecordArray = selectReviewRecord.map((record) => {
      return {
        learningRecordId: record.learningRecordId,
        administratorId: userId,
        reviewRecordContent: record.reviewRecordContent || '',
      };
    });
    const deleteRecordArray = reviewRecordArray.map((record) => record.learningRecordId);

    const { code, message } = await identityReviewRecord(
      reviewRecordArray as IdentityReviewRecordList,
    );
    if (code == 0) {
      msg.success('记录已审核', 1);
      setTimeout(() => {
        deleteTableDataRecord(deleteRecordArray);
      }, 1000);
    } else {
      msg.error('记录审核失败', 1);
    }
  }

  function handleDelete(record: Recordable) {
    deleteLearningRecord(record.learningRecordId);
    reload();
    console.log(record);
  }

  function handleSuccess({ isUpdate, values }) {
    if (isUpdate) {
      // 演示不刷新表格直接更新内部数据。
      // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
      updateTableDataRecord(values.id, values.rowInfo);
    } else {
      reload();
    }
  }

  function handleView(record: Recordable) {
    go('/courseInformationManagement/reviewRecordDetail/' + record.learningRecordId);
  }
</script>
