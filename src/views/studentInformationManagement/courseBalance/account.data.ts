import { BasicColumn, FormSchema } from '@/components/Table';
import {
  queryValidateStudentName,
  queryValidateStudentNumber,
} from '@/views/studentInformationManagement/studentValidate';
import { getAllCourseInfoList } from '@/api/courseInformationManagement/courseInformationManagement';

export const columns: BasicColumn[] = [
  {
    title: '学号',
    dataIndex: 'studentNumber',
    width: 120,
  },
  {
    title: '学生姓名',
    dataIndex: 'studentName',
    width: 80,
  },
  {
    title: '电话',
    dataIndex: 'studentPhone',
    width: 120,
  },
  {
    title: '课程名称',
    dataIndex: 'courseName',
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
    field: 'studentName',
    label: '姓名',
    component: 'Input',
    colProps: { span: 6 },
    rules: [
      {
        trigger: 'blur',
        validator: queryValidateStudentName(),
      },
    ],
  },
  {
    field: 'courseName',
    label: '课程名称',
    component: 'ApiSelect',
    // resultField: ''
    componentProps: {
      api: getAllCourseInfoList,
      // api: getAllRoleList,
      // --todolist--  更改对应字段
      labelField: 'courseName',
      valueField: 'courseId',
      // labelField: 'roleName',
      // valueField: 'roleValue',
    },
    colProps: { span: 6 },
  },
];
