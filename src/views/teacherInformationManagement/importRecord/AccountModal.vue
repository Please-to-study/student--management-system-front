<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #studentSearch="{ model, field }">
        <ApiSelect
          :api="getSameStudent"
          showSearch
          placeholder="请选择学生"
          v-model:value="model[field]"
          :filterOption="false"
          labelField="studentLabel"
          valueField="studentNumber"
          :params="studentSearchParams"
          @search="studentDebounceOptionsFn"
        />
      </template>
      <template #teacherSearch="{ model, field }">
        <ApiSelect
          :api="getTeacherInfoByName"
          showSearch
          placeholder="请选择教师"
          v-model:value="model[field]"
          :filterOption="false"
          labelField="teacherLabel"
          valueField="teacherId"
          :params="teacherSearchParams"
          @search="teacherDebounceOptionsFn"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ApiSelect, BasicForm, useForm } from '@/components/Form';
  import { accountFormSchema } from './data';
  import { getTeacherInfoByName } from '@/api/teacherInformationManagement/teacherInformationManagement';
  import { getSameStudent } from '@/api/studentInformationManagement/studentInformationManagement';
  import { useDebounceFn } from '@vueuse/core';
  import type { Recordable } from '@vben/types';
  import {
    AddLearningRecordList,
    AddLearningRecordParams,
  } from '@/api/courseInformationManagement/model/learningRecord';
  import { addLearningRecord } from '@/api/courseInformationManagement/courseInformationManagement';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'AccountModal' });

  const emit = defineEmits(['success', 'register']);

  const { createMessage: msg } = useMessage();

  const isUpdate = ref(true);
  const rowId = ref('');

  let studentDebounceOptionsFn = useDebounceFn(onStudentSearch, 300);
  const studentKeyword = ref<string>('');
  const studentSearchParams = computed<Recordable<string>>(() => {
    return { studentName: unref(studentKeyword) };
  });

  function onStudentSearch(value: string) {
    studentKeyword.value = value;
  }

  let teacherDebounceOptionsFn = useDebounceFn(onTeacherSearch, 300);
  const teacherKeyword = ref<string>('');
  const teacherSearchParams = computed<Recordable<string>>(() => {
    return { teacherName: unref(teacherKeyword) };
  });

  function onTeacherSearch(value: string) {
    teacherKeyword.value = value;
  }

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
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增记录' : '编辑记录'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // if (!unref(isUpdate)) {
      //   const addParams: AddTeacherInfoParams = { ...values };
      //   // debugger;
      //   await addTeacher(addParams);
      // } else {
      //   const updateParams: UpdateTeacherInfoParams = { ...values };
      //   // console.log('updateParams is :', updateParams);
      //   await updateTeacher(updateParams);
      // }
      const addParams: AddLearningRecordList = [];
      const {
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
        learningRecordTime,
      } = values;
      const record: AddLearningRecordParams = {
        learningRecordDate: learningRecordDate.substring(0, 10),
        studentNumber: String(studentNumber),
        studentCourseEvaluate,
        courseContent,
        materialsTitle,
        courseId: Number(courseId),
        courseTime: Number(courseTime),
        courseCategoryId: Number(courseCategoryId),
        teacherId: Number(teacherId),
        learningRecordCourseClear: Number(learningRecordCourseClear),
        learningRecordStartTime: learningRecordTime[0].substring(11),
        learningRecordEndTime: learningRecordTime[1].substring(11),
      };
      addParams.push(record);
      const { code, message } = await addLearningRecord(addParams);
      if (code == 0) {
        msg.success('记录添加成功', 1);
      } else {
        msg.error('记录添加失败', 1);
      }
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
