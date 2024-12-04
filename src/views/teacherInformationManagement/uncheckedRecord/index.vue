<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" class="" :searchInfo="searchInfo">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            v-if="record.status == IDENTITY_REFUSE_STATUS"
            :actions="createActions(record)"
          />
        </template>
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref, unref } from 'vue';

  import { BasicTable, useTable, TableAction, EditRecordRow, ActionItem } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';

  import { useModal } from '@/components/Modal';
  import AccountModal from './AccountModal.vue';

  import { columns, IDENTITY_REFUSE_STATUS, searchFormSchema } from './account.data';
  import { useGo } from '@/hooks/web/usePage';
  import type { Recordable } from '@vben/types';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from '@/hooks/web/useMessage';
  import {
    deleteRefuseRecord,
    getUncheckedRecordList,
    submitRefuseRecord,
  } from '@/api/teacherInformationManagement/teacherInformationManagement';
  import { UpdateRefuseRecordParams } from '@/api/teacherInformationManagement/model/uncheckedRecord';

  defineOptions({ name: 'AccountManagement' });

  const go = useGo();
  const userStore = useUserStore();
  const { createMessage: msg } = useMessage();
  const currentEditKeyRef = ref('');
  const [registerModal] = useModal();
  const { userId } = userStore.getUserInfo;
  const searchInfo = reactive<Recordable>({});
  const [registerTable, { reload, updateTableDataRecord, deleteTableDataRecord }] = useTable({
    title: '未审核记录列表',
    api: getUncheckedRecordList,
    rowKey: 'learningRecordId',
    searchInfo: {
      teacherId: userId,
    },
    columns,
    showTableSetting: true,
    bordered: true,
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
    },
  });

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

  function handleEdit(record: EditRecordRow) {
    currentEditKeyRef.value = record.id;
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
        const submitParam: UpdateRefuseRecordParams = {
          learningRecordId: record.learningRecordId,
          studentId: record.studentId,
          courseRecordId: record.courseRecordId,
          studentCourseEvaluate: record.studentCourseEvaluate,
          courseContent: record.courseContent,
          materialsId: record.materialsId,
          materialsTitle: record.materialsTitle,
          courseId: record.courseId,
          courseTime: record.courseTime,
          courseCategoryId: record.courseCategoryId,
          teacherId: record.teacherId,
          learningRecordCourseClear: record.learningRecordCourseClear,
          learningRecordStartTime: record.learningRecordStartTime,
          learningRecordEndTime: record.learningRecordEndTime,
        };
        const { code } = await submitRefuseRecord(submitParam);
        if (code == 0) {
          const pass = await record.onEdit?.(false, true);
          if (pass) {
            currentEditKeyRef.value = '';
          }
          msg.success({ content: '记录已提交', key: 'saving' });
          record.status = 0;
          updateTableDataRecord(record.learningRecordId, record);
        } else {
          msg.error({ content: '记录提交失败', key: 'saving' });
        }
      } catch (error) {
        msg.error({ content: '保存失败', key: 'saving' });
      }
    } else {
      msg.error({ content: '请填写正确的数据', key: 'saving' });
    }
  }

  function handleDelete(record: Recordable) {
    deleteRefuseRecord(record.learningRecordId);
    deleteTableDataRecord(record.learningRecordId);
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
