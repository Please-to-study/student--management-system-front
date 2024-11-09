<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #teacherSearch="{ model, field }">
        <ApiSelect
          :api="getTeacherInfoByName"
          showSearch
          placeholder="请选择教师"
          v-model:value="model[field]"
          :filterOption="false"
          labelField="teacherLabel"
          valueField="teacherId"
          :params="searchParams"
          @search="debounceOptionsFn"
        />
      </template>
      <template #add="{ field }">
        <a-button v-if="Number(field) === 0" @click="handleAdd(field)">+</a-button>
        <a-button v-if="Number(field) > 0" @click="() => handleDel(field)">-</a-button>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ApiSelect, BasicForm, useForm } from '@/components/Form';
  import { accountFormSchema, weekend } from './account.data';
  import {
    AddCourseInfoParams,
    UpdateCourseInfoParams,
  } from '@/api/courseInformationManagement/model/basicInfo';
  import {
    addCourse,
    updateCourse,
  } from '@/api/courseInformationManagement/courseInformationManagement';
  import { useDebounceFn } from '@vueuse/core';
  import type { Recordable } from '@vben/types';
  import { getTeacherInfoByName } from '@/api/teacherInformationManagement/teacherInformationManagement';
  import dayjs from "dayjs";

  defineOptions({ name: 'AccountModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');
  const courseIndex = ref(1);

  const debounceOptionsFn = useDebounceFn(onSearch, 300);
  const keyword = ref<string>('');
  const searchParams = computed<Recordable<string>>(() => {
    return { teacherName: unref(keyword) };
  });

  const [
    registerForm,
    {
      appendSchemaByField,
      removeSchemaByField,
      setFieldsValue,
      updateSchema,
      resetFields,
      validate,
    },
  ] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  function onSearch(value: string) {
    keyword.value = value;
  }

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      rowId.value = data.record.courseId;
      const count = data.record.courseWeekArget.length;
      for (let index = 1; index < count; index++) {
        appendSchemaByField(
          [
            {
              field: `weekEnd_${index}`,
              label: '上课时间',
              component: 'Select',
              componentProps: {
                options: weekend,
                // style: { width: '50%' },
              },
              colProps: { span: 18 },
              required: true,
            },
            {
              field: `${index}`,
              component: 'Input',
              label: ' ',
              slot: 'add',
              colProps: { span: 4 },
            },
            {
              field: `courseTime_${index}`,
              label: '上课时段',
              component: 'TimeRangePicker',
              componentProps: {
                style: { width: '100%' },
                placeholder: ['开始时间', '结束时间'],
              },
              colProps: { span: 18 },
              required: true,
            },
          ],
          `courseTime_${index - 1}`,
        );
      }
      data.record.courseStartDate = dayjs(data.record.courseStartDate);
      setFieldsValue({
        ...data.record,
      });
      for (let i = 0; i < count; i++) {
        const tempWeekKey = 'weekEnd_' + i;
        const tempWeekValue = data.record.courseWeekArget[i].weekEnd;
        const tempTimeKey = 'courseTime_' + i;
        const tempTimeValue: any[] = [];
        tempTimeValue.push(dayjs(data.record.courseWeekArget[i].startTime));
        tempTimeValue.push(dayjs(data.record.courseWeekArget[i].endTime));
        setFieldsValue({
          [tempWeekKey]: tempWeekValue,
          [tempTimeKey]: tempTimeValue,
        });
      }
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增课程' : '编辑信息'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // 需要重新构造courseArget字段 再进行上传
      console.log(values);
      const params: AddCourseInfoParams = {
        courseName: values.courseName,
        courseCategoryId: values.courseCategoryId,
        teacherId: values.teacherId,
        courseSalary: values.courseSalary,
        courseBasicPrice: values.courseBasicPrice,
        courseAddress: values.courseAddress,
        courseStartDate: values.courseStartDate,
        courseNumber: values.courseNumber,
        courseIntroduce: values.courseIntroduce,
        courseNotes: values.courseNotes,
        courseWeekArget: [],
      };
      const dateKey = 'weekEnd_';
      const timeKey = 'courseTime_';
      for (let i = 0; i < 10; i++) {
        const tempDateKey = dateKey + i;
        const tempTimeKey = timeKey + i;
        if (values.hasOwnProperty(dateKey + i)) {
          params.courseWeekArget.push({
            everyCourseDetailId: i,
            weekEnd: values[tempDateKey],
            startTime: values[tempTimeKey][0],
            endTime: values[tempTimeKey][1],
          });
        }
      }

      if (!unref(isUpdate)) {
        // debugger;
        await addCourse(params);
      } else {
        const updateParams: UpdateCourseInfoParams = {
          ...params,
          courseId: values.courseId,
        };
        console.log('updateParams is :', updateParams);
        await updateCourse(updateParams);
      }
      // eslint-disable-next-line no-debugger
      // debugger;
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  function handleAdd(field: string) {
    console.log('field  ', field);
    // eslint-disable-next-line no-debugger
    // debugger;
    appendSchemaByField(
      [
        {
          field: `weekEnd_${courseIndex.value}`,
          label: '上课时间',
          component: 'Select',
          componentProps: {
            options: weekend,
            // style: { width: '50%' },
          },
          colProps: { span: 18 },
          required: true,
        },
        {
          field: `${courseIndex.value}`,
          component: 'Input',
          label: ' ',
          slot: 'add',
          colProps: { span: 4 },
        },
        {
          field: `courseTime_${courseIndex.value}`,
          label: '上课时段',
          component: 'TimeRangePicker',
          componentProps: {
            style: { width: '100%' },
            placeholder: ['开始时间', '结束时间'],
          },
          colProps: { span: 18 },
          required: true,
        },
      ],
      `courseTime_${courseIndex.value - 1}`,
    );
    courseIndex.value++;
  }

  function handleDel(field: string) {
    console.log('field:  ', field);
    // eslint-disable-next-line no-debugger
    // debugger;
    removeSchemaByField([`weekEnd_${field}`, `courseTime_${field}`, `${field}`]);
    courseIndex.value--;
  }
</script>
