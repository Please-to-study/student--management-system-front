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
  import {
    AddCompetitionParams,
    UpdateCompetitionParams,
  } from '@/api/competitionManagement/model/basicInfo';
  import {
    addCompetition,
    updateCompetition,
  } from '@/api/competitionManagement/competitionManagement';

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

  const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    // debugger;
    console.log('data record is ', data.record);
    if (unref(isUpdate)) {
      rowId.value = data.record.competitionId;
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增赛事' : '编辑信息'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // isUpdate为false ---> 创建账号  isUpdate为true ---> 修改账号信息
      if (!unref(isUpdate)) {
        const addParams: AddCompetitionParams = { ...values };
        // debugger;
        await addCompetition(addParams);
      } else {
        const updateParams: UpdateCompetitionParams = { ...values };
        await updateCompetition(updateParams);
        // console.log('updateParams is :', updateParams);
      }
      // eslint-disable-next-line no-debugger
      // debugger;
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
