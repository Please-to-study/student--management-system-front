<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { accountFormSchema } from '@/views/courseInformationManagement/reviewRecord/account.data';
  import { updateLearningRecord } from '@/api/courseInformationManagement/courseInformationManagement';
  import { UpdateLearningRecordParams } from '@/api/courseInformationManagement/model/learningRecord';

  defineOptions({ name: 'AccountModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');
  const rowInfo = ref('');

  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      rowId.value = data.record.learningRecordId;
      rowInfo.value = data.record;
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => '审核信息');

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api  新增学生信息功能function
      rowInfo.value.reviewRecordContent = values.reviewRecordContent;
      // if (!unref(isUpdate)) {
      // } else {
      //   const updateParams: UpdateLearningRecordParams = { ...values };
      //   // debugger;
      //   await updateLearningRecord(updateParams);
      // }
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { rowInfo, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
