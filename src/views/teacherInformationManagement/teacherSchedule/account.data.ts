import {getAccountList, getAllRoleList, isAccountExist} from '@/api/demo/system';
import {BasicColumn, FormSchema, useTable} from '@/components/Table';
import { AccountListItem } from '@/api/demo/model/systemModel';

export const columns: BasicColumn[] = [
  {
    title: '星期一',
    dataIndex: 'monday',
    width: 200,
    ellipsis: true,
    customRender: ({ text, index }) => {
      if (index == 2 || index == 5) {
        return {
          props: {
            colSpan: 7,
          },
        };
      }
    },
  },
  {
    title: '星期二',
    dataIndex: 'tuesday',
    width: 200,
    ellipsis: true,
  },
  {
    title: '星期三',
    dataIndex: 'wednesday',
    width: 200,
    ellipsis: true,
  },
  {
    title: '星期四',
    dataIndex: 'thursday',
    width: 200,
    ellipsis: true,
  },
  {
    title: '星期五',
    dataIndex: 'friday',
    width: 200,
    ellipsis: true,
  },
  {
    title: '星期六',
    dataIndex: 'saturday',
    width: 200,
    ellipsis: true,
  },
  {
    title: '星期日',
    dataIndex: 'sunday',
    width: 200,
    ellipsis: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'teacherName',
    label: '教师姓名',
    component: 'Input',
    required: true,
    colProps: { span: 8 },
  },
  {
    field: 'teacherPhone',
    label: '电话',
    component: 'Input',
    required: true,
    colProps: { span: 8 },
  },
];
