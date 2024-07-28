import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { AccountListItem } from '@/api/demo/model/systemModel';

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
    field: 'studentName',
    label: '学生姓名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'studentNumber',
    label: '学号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'courseName',
    label: '课程名称',
    component: 'Input',
    colProps: { span: 6 },
  },
];
