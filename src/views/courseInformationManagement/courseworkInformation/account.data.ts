import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { AccountListItem } from '@/api/demo/model/systemModel';
import {
  getAllCourseInfoList
} from "@/api/courseInformationManagement/courseInformationManagement";

export const columns: BasicColumn[] = [
  {
    title: '课程名称',
    dataIndex: 'courseName',
    width: 120,
  },
  {
    title: '布置教师',
    dataIndex: 'teacherName',
    width: 120,
  },
  {
    title: '资料类型',
    dataIndex: 'materialsStyle',
    width: 120,
  },
  {
    title: '作业题目',
    dataIndex: 'materialsTitle',
    width: 200,
  },
  {
    title: '作业介绍',
    dataIndex: 'materialsIntroduce',
    width: 200,
  },
  {
    title: '日期',
    dataIndex: 'materialsDate',
    width: 140,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'materialsTitle',
    label: '作业题目',
    component: 'Input',
    colProps: { span: 8 },
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
    colProps: { span: 8 },
  },
];

// 添加学生账户表单
export const accountFormSchema: FormSchema[] = [
  {
    field: 'courseName',
    label: '课程名称',
    component: 'Input',
  },
  {
    label: '布置教师',
    field: 'teacherName',
    component: 'Input',
  },
  {
    field: 'materialsStyle',
    label: '资料类型',
    component: 'Input',
  },
  {
    field: 'materialsTitle',
    label: '作业题目',
    component: 'Input',
  },

  {
    label: '作业介绍',
    field: 'materialsIntroduce',
    component: 'InputTextArea',
  },
  {
    label: '日期',
    field: 'materialsDate',
    component: 'TimePicker',
    componentProps: {
      style: { width: '100%' },
    },
  },
];
