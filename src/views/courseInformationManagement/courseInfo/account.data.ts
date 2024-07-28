import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { AccountListItem } from '@/api/demo/model/systemModel';

export const columns: BasicColumn[] = [
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
    title: '主任课老师',
    dataIndex: 'teacherName',
    width: 120,
  },
  {
    title: '上课校区',
    dataIndex: 'courseAddress',
    width: 120,
  },
  {
    title: '上课时间',
    dataIndex: 'courseDate',
    width: 120,
  },
  {
    title: '上课时段',
    dataIndex: 'courseTime',
    width: 120,
  },
  {
    title: '开始时间',
    dataIndex: 'courseStartTime',
    width: 120,
  },
  {
    title: '课程单价',
    dataIndex: 'coursePrice',
    width: 120,
  },
  {
    title: '课程总课时',
    dataIndex: 'courseNumber',
    width: 120,
  },
  {
    title: '课程简介',
    dataIndex: 'courseIntroduce',
    width: 120,
  },
  {
    title: '备注',
    dataIndex: 'courseNotes',
    width: 120,
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
    field: 'courseAddress',
    label: '上课校区',
    component: 'Input',
    colProps: { span: 8 },
  },
];

// 添加课程form
export const accountFormSchema: FormSchema[] = [
  {
    field: 'courseName',
    label: '课程名称',
    component: 'Input',
    // helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    rules: [
      {
        required: true,
        message: '请输入课程名称',
      },
      // {
      //   trigger: 'blur',
      //   validator(_, value) {
      //     return new Promise((resolve, reject) => {
      //       if (!value) return resolve();
      //       isAccountExist(value)
      //         .then(resolve)
      //         .catch((err) => {
      //           reject(err.message || '验证失败');
      //         });
      //     });
      //   },
      // },
    ],
  },
  {
    label: '课程类别',
    field: 'courseCategory',
    component: 'Input',
    required: true,
  },
  {
    field: 'teacherId',
    label: '任课老师',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      // --todolist--  更改对应字段
      labelField: 'teacherName',
      valueField: 'teacherId',
    },
    required: true,
  },
  {
    field: 'courseAddress',
    label: '上课校区',
    component: 'Input',
    required: true,
  },
  {
    field: 'courseDate',
    label: '上课时间',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '星期一',
          value: '1',
          key: '1',
        },
        {
          label: '星期二',
          value: '2',
          key: '2',
        },
        {
          label: '星期三',
          value: '3',
          key: '3',
        },
        {
          label: '星期四',
          value: '4',
          key: '4',
        },
        {
          label: '星期五',
          value: '5',
          key: '5',
        },
        {
          label: '星期六',
          value: '6',
          key: '6',
        },
        {
          label: '星期日',
          value: '7',
          key: '7',
        },
      ],
    },
    required: true,
  },
  {
    label: '上课时段',
    field: 'courseTime',
    component: 'TimeRangePicker',
    required: true,
  },
  {
    label: '开始日期',
    field: 'courseStartTime',
    component: 'DatePicker',
    required: true,
  },
  {
    label: '课程单价',
    field: 'coursePrice',
    component: 'Input',
    required: true,
  },
  {
    label: '总课时',
    field: 'courseNumber',
    component: 'Input',
    required: true,
  },
  {
    label: '课程简介',
    field: 'courseIntroduce',
    component: 'InputTextArea',
  },
  {
    label: '备注',
    field: 'courseNotes',
    component: 'InputTextArea',
  },
];
