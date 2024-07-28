import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { AccountListItem } from '@/api/demo/model/systemModel';

export const columns: BasicColumn[] = [
  {
    title: '日期',
    dataIndex: 'date',
    width: 140,
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
    title: '课时费',
    dataIndex: 'teacherPay',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'teacherName',
    label: '教师姓名',
    component: 'Input',
    colProps: { span: 6 },
    required: true,
  },
  {
    field: 'teacherPhone',
    label: '电话',
    component: 'Input',
    colProps: { span: 6 },
    required: true,
  },
  {
    field: 'date',
    label: '月份',
    component: 'MonthPicker',
    colProps: { span: 6 },
    required: true,
  },
];
