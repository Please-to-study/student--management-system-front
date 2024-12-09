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
      <template #import>
        <ImpExcel @success="loadDataSuccess" dateFormat="YYYY-MM-DD">
          <a-button type="primary"> 上传课表 </a-button>
        </ImpExcel>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ApiSelect, BasicForm, useForm } from '@/components/Form';
  import { accountFormSchema, weekend, unShowList, columnMap, mustKeyArray } from './account.data';
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
  import dayjs from 'dayjs';
  import { ExcelData, ImpExcel } from '@/components/Excel';
  import { isNull, isUndefined } from '@/utils/is';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'AccountModal' });

  const emit = defineEmits(['success', 'register']);

  const { createMessage: msg, notification } = useMessage();
  const isUpdate = ref(true);
  const rowId = ref('');
  const courseIndex = ref(1);
  const courseSemesterArget = ref([]);

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
      if (count > 0) {
        data.record.scheduleMode = 1;
        for (let index = 1; index < count; index++) {
          unShowList.value.push(index);
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
      } else {
        data.record.scheduleMode = 0;
        courseSemesterArget.value = data.record.courseSemesterArget;
      }

      data.record.courseStartDate = dayjs(data.record.courseStartDate);
      setFieldsValue({
        ...data.record,
      });
      if (count > 0) {
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
    } else {
      updateSchema([
        {
          field: 'scheduleMode',
          defaultValue: 1,
        },
        {
          field: 'importSchedule',
          ifShow: false,
        },
      ]);
      unShowList.value.forEach((item) => {
        const tempWeekField = 'weekEnd_' + item;
        const tempOPField = '' + item;
        const tempCourseTimeField = 'courseTime_' + item;
        updateSchema([
          {
            field: tempWeekField,
            ifShow: true,
          },
          {
            field: tempOPField,
            ifShow: true,
          },
          {
            field: tempCourseTimeField,
            ifShow: true,
          },
        ]);
      });
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
        courseSemesterArget: [],
      };
      if (values.scheduleMode == 1) {
        const dateKey = 'weekEnd_';
        const timeKey = 'courseTime_';
        for (let i = 0; i < 20; i++) {
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
      } else {
        params.courseSemesterArget = courseSemesterArget.value;
      }

      let courseNumberFlag = true;
      if (values.scheduleMode == 0) {
        courseNumberFlag = params.courseNumber == params.courseSemesterArget.length;
      }

      if (!courseNumberFlag) {
        msg.error('总课时数与课表排课数不一致', 1);
      }

      if (courseNumberFlag && !unref(isUpdate)) {
        await addCourse(params);
        closeModal();
        emit('success', { isUpdate: unref(isUpdate), values: { ...params, id: rowId.value } });
      }

      if (courseNumberFlag && unref(isUpdate)) {
        const updateParams: UpdateCourseInfoParams = {
          ...params,
          courseId: Number(values.courseId),
        };
        await updateCourse(updateParams);
        closeModal();
        emit('success', { isUpdate: unref(isUpdate), values: { ...params, id: rowId.value } });
      }
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  function handleAdd(field: string) {
    appendSchemaByField(
      [
        {
          field: `weekEnd_${courseIndex.value}`,
          label: '上课时间',
          component: 'Select',
          componentProps: {
            options: weekend,
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
    unShowList.value.push(courseIndex.value);
    courseIndex.value++;
  }

  function handleDel(field: string) {
    unShowList.value = unShowList.value.filter((value) => value != Number(field));
    removeSchemaByField([`weekEnd_${field}`, `courseTime_${field}`, `${field}`]);
    courseIndex.value--;
  }

  async function loadDataSuccess(excelDataList: ExcelData[]) {
    const tableData = [];
    const wrongData: number[] = [];
    const dateTime = 'courseDate';
    const startTime = 'startTime';
    const endTime = 'endTime';
    let tempDate = '';
    const minTimeLength = 17;
    const maxTimeLength = 19;
    for (const excelData of excelDataList) {
      const {
        header,
        results,
        meta: { sheetName },
      } = excelData;

      let index: number = 0;
      for (const obj of results) {
        const temp = {};
        temp.everyCourseDetailId = index;
        index++;
        // debugger;
        for (const k in obj) {
          const key = columnMap.get(k);
          const value = obj[k];
          if (key == dateTime) {
            tempDate = value;
          } else {
            temp[key] = tempDate + ' ' + value + ':00';
          }
        }

        const startTimeFlag =
          temp[startTime].length >= minTimeLength && temp[startTime].length <= maxTimeLength;
        const endTimeFlag =
          temp[endTime].length >= minTimeLength && temp[endTime].length <= maxTimeLength;
        if (startTimeFlag && endTimeFlag) {
          tableData.push(temp);
        } else {
          wrongData.push(index);
        }
      }
      // setTableData(tableData);
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
      } else {
        courseSemesterArget.value = tableData;
      }
      // console.log('courseSemesterArget is', courseSemesterArget.value);
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
