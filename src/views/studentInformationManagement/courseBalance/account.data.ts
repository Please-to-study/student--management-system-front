import { BasicColumn, FormSchema } from '@/components/Table';
import { queryValidateStudentNumber } from '@/views/studentInformationManagement/studentValidate';
import { getCourseList } from '@/api/courseInformationManagement/courseInformationManagement';
import { getCourseCategoryInfoList } from '@/api/configManagement';

export const columns: BasicColumn[] = [
  {
    title: '学生ID',
    dataIndex: 'studentId',
    width: 80,
    ifShow: false,
  },
  {
    title: '学生姓名',
    dataIndex: 'studentName',
    width: 80,
  },
  {
    title: '学号',
    dataIndex: 'studentNumber',
    width: 120,
  },
  {
    title: '电话',
    dataIndex: 'studentPhone',
    width: 120,
  },
  {
    title: '课程类别ID',
    dataIndex: 'courseCategoryId',
    width: 120,
    ifShow: false,
  },
  {
    title: '课程类别',
    dataIndex: 'courseCategoryName',
    width: 120,
  },
  {
    title: '完成课时',
    dataIndex: 'courseBalanceFinishCourse',
    width: 120,
  },
  {
    title: '已缴费课时',
    dataIndex: 'courseBalanceTotalCourse',
    width: 120,
  },
  {
    title: '剩余课时',
    dataIndex: 'courseBalanceLeftCourse',
    width: 120,
  },
  {
    title: '报名日期',
    dataIndex: 'courseBalanceRegistrationDate',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'studentNumber',
    label: '学号',
    component: 'Input',
    colProps: { span: 6 },
    rules: [
      {
        trigger: 'blur',
        validator: queryValidateStudentNumber(),
      },
    ],
  },
  {
    field: 'studentId',
    label: '学生姓名',
    slot: 'studentCustom',
    colProps: {
      xl: 6,
    },
  },
  {
    field: 'courseCategoryId',
    label: '课程类别',
    component: 'ApiSelect',
    componentProps: {
      api: getCourseCategoryInfoList,
      params: {},
      resultField: 'items',
      labelField: 'courseCategoryName',
      valueField: 'courseCategoryId',
    },
    colProps: { span: 6 },
  },
];
