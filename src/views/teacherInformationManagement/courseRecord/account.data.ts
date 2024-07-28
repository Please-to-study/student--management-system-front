import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { AccountListItem } from '@/api/demo/model/systemModel';

export const columns: BasicColumn[] = [
  {
    title: '教师姓名',
    dataIndex: 'teacherName',
    width: 120,
  },
  {
    title: '课程名称',
    dataIndex: 'courseName',
    width: 120,
  },
  {
    title: '课程类别',
    dataIndex: 'courseCategory',
    width: 120,
  },
  {
    title: '上课内容',
    dataIndex: 'teacherCourseContent',
    width: 200,
  },
  {
    title: '课程作业',
    dataIndex: 'courseHomework',
    width: 200,
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    width: 140,
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    width: 140,
  },
  {
    title: '日期',
    dataIndex: 'date',
    width: 140,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'teacherName',
    label: '教师姓名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'courseName',
    label: '课程名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];
