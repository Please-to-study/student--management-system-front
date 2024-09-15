import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { AccountListItem } from '@/api/demo/model/systemModel';

export const columns: BasicColumn[] = [
  {
    title: '姓名',
    dataIndex: 'studentName',
    width: 120,
  },
  {
    title: '上课评价',
    dataIndex: 'studentCourseEvaluate',
    width: 200,
  },
  {
    title: '上课内容',
    dataIndex: 'courseContent',
    width: 120,
  },
  {
    title: '课程作业',
    dataIndex: 'courseHomework',
    width: 120,
  },
  {
    title: '课程类别',
    dataIndex: 'courseCategory',
    width: 120,
  },
  {
    title: '任课老师',
    dataIndex: 'teacherName',
    width: 120,
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    width: 120,
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    width: 120,
  },
  {
    title: '日期',
    dataIndex: 'date',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'studentName',
    label: '学生姓名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'date',
    label: '日期',
    component: 'Input',
    colProps: { span: 8 },
  },
];
