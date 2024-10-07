<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { courseCategoryFormSchema } from './account.data';
  import {
    AddCourseCategoryParams,
    UpdateCourseCategoryParams,
  } from '@/api/configParams';
  import {
    addCourseCategory,
    updateCourseCategory,
  } from '@/api/configManagement';

  defineOptions({ name: 'AccountModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: courseCategoryFormSchema,
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
      rowId.value = data.record.id;
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增教师' : '编辑教师'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // isUpdate为false ---> 创建账号  isUpdate为true ---> 修改账号信息
      if (!unref(isUpdate)) {
        const addParams: AddCourseCategoryParams = { ...values };
        // debugger;
        await addCourseCategory(addParams);
      } else {
        const updateParams: UpdateCourseCategoryParams = { ...values };
        await updateCourseCategory(updateParams);
      }
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
