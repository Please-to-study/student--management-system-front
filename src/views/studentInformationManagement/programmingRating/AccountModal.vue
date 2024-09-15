<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { accountFormSchema } from './account.data';
  import { getDeptList } from '@/api/demo/system';
  import {
    AddProgramRateParams,
    UpdateProgramRateParams,
  } from '@/api/courseInformationManagement/model/programmingRating';
  import {
    addProgramRateInfo,
    updateProgramRateInfo,
  } from '@/api/studentInformationManagement/studentInformationManagement';

  defineOptions({ name: 'AccountModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

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
      rowId.value = data.record.id;
      setFieldsValue({
        ...data.record,
      });
    }

    const treeData = await getDeptList();
    updateSchema([
      {
        field: 'pwd',
        show: !unref(isUpdate),
      },
      {
        field: 'dept',
        componentProps: { treeData },
      },
    ]);
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api  新增学生信息功能function
      // isUpdate为false ---> 创建账号  isUpdate为true ---> 修改账号信息

      if (!unref(isUpdate)) {
        const addParams: AddProgramRateParams = { ...values };
        // debugger;
        await addProgramRateInfo(addParams);
      } else {
        const updateParams: UpdateProgramRateParams = { ...values };
        console.log('updateParams is :', updateParams);
        await updateProgramRateInfo(updateParams);
      }
      // console.log(values);
      // eslint-disable-next-line no-debugger
      // debugger;
      console.log(values);
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
