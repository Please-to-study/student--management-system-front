import { BasicColumn, FormSchema } from '@/components/Table';
import { DescItem } from '@/components/Description';

export const columns: BasicColumn[] = [
  {
    title: '课程ID',
    dataIndex: 'courseId',
    width: 120,
    ifShow: false,
  },
  {
    title: '课程名称',
    dataIndex: 'courseName',
    width: 120,
  },
  {
    title: '任课教师ID',
    dataIndex: 'teacherId',
    width: 120,
    ifShow: false,
  },
  {
    title: '任课教师',
    dataIndex: 'teacherName',
    width: 120,
  },
  {
    title: '资料ID',
    dataIndex: 'materialsId',
    width: 120,
    ifShow: false,
  },
  {
    title: '资料类型',
    dataIndex: 'materialsStyle',
    width: 120,
  },
  {
    title: '后端存储位置',
    dataIndex: 'materialsAddress',
    width: 140,
    ifShow: false,
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
  {
    title: '备注',
    dataIndex: 'materialsNotes',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'courseName',
    label: '课程名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'materialsTitle',
    label: '作业题目',
    component: 'Input',
    colProps: { span: 8 },
  },
];

// 添加账户表单
export const accountFormSchema: FormSchema[] = [
  {
    field: 'materialsId',
    label: '资料ID',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'courseId',
    label: '课程ID',
    component: 'Input',
    required: true,
  },
  {
    label: '任课老师',
    field: 'teacherId',
    required: true,
    slot: 'teacherSearch',
  },
  {
    field: 'materialsStyle',
    label: '资料类型',
    component: 'Input',
    required: true,
  },
  {
    field: 'materialsTitle',
    label: '作业题目',
    component: 'Input',
    required: true,
  },
  {
    label: '作业介绍',
    field: 'materialsIntroduce',
    component: 'InputTextArea',
  },
  {
    label: '备注',
    field: 'materialsNotes',
    component: 'InputTextArea',
  },
];

export const materialsSchema: DescItem[] = [
  {
    label: '资料ID',
    field: 'materialsId',
    // show:false,
  },
  {
    label: '课程名称',
    field: 'courseName',
  },
  {
    label: '任课教师',
    field: 'teacherName',
  },
  {
    label: '资料类型',
    field: 'materialsStyle',
  },
  {
    label: '后端存储位置',
    field: 'materialsAddress',
  },
  {
    label: '作业题目',
    field: 'materialsTitle',
  },
  {
    label: '作业介绍',
    field: 'materialsIntroduce',
  },
  {
    label: '日期',
    field: 'materialsDate',
  },
  {
    label: '备注',
    field: 'materialsNotes',
  },
];
