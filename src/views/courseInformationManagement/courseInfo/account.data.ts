import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { AccountListItem } from '@/api/demo/model/systemModel';
import { getAllCourseInfoList } from '@/api/courseInformationManagement/courseInformationManagement';
import { getAllTeacherBasicInfoList } from '@/api/teacherInformationManagement/teacherInformationManagement';
import { DescItem } from '@/components/Description';

export const weekend = [
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
];

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
  // 课程信息详情部分展示
  // {
  //   title: '上课时间',
  //   dataIndex: 'courseDate',
  //   width: 120,
  // },
  // {
  //   title: '上课时段',
  //   dataIndex: 'courseTime',
  //   width: 120,
  // },
  {
    title: '开课时间',
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
  {
    field: 'courseAddress',
    label: '上课校区',
    component: 'ApiSelect',
    // resultField: ''
    componentProps: {
      // --todolist--  获取上课校区的api
      api: getAllCourseInfoList,
      // api: getAllRoleList,
      labelField: 'courseAddress',
      valueField: 'courseAddressId',
      // labelField: 'roleName',
      // valueField: 'roleValue',
    },
    colProps: { span: 8 },
  },
];

// 添加课程form
export const accountFormSchema: FormSchema[] = [
  {
    field: 'courseId',
    label: '',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'courseName',
    label: '课程名称',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入课程名称',
      },
    ],
  },
  {
    label: '课程类别',
    field: 'courseCategory',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入课程名称',
      },
    ],
  },
  {
    field: 'teacherId',
    label: '任课老师',
    component: 'ApiSelect',
    componentProps: {
      api: getAllTeacherBasicInfoList,
      // --todolist--  更改对应字段
      labelField: 'teacherName',
      valueField: 'teacherId',
    },
    required: true,
  },
  {
    field: 'courseAddress',
    label: '上课校区',
    component: 'ApiSelect',
    componentProps: {
      // 获取上课校区api
      api: getAllTeacherBasicInfoList,
      // --todolist--  更改对应字段
      labelField: 'courseAddress',
      valueField: 'courseAddressId',
    },
    required: true,
  },
  {
    label: '开始日期',
    field: 'courseStartTime',
    component: 'DatePicker',
    componentProps: {
      style: { width: '100%' },
    },
    required: true,
  },
  {
    label: '课程单价',
    field: 'coursePrice',
    component: 'InputNumber',
    required: true,
  },
  {
    label: '总课时',
    field: 'courseNumber',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'courseDate_0',
    label: '上课时间',
    component: 'Select',
    componentProps: {
      options: weekend,
    },
    colProps: { span: 18 },
    required: true,
  },
  {
    field: '0',
    label: ' ',
    slot: 'add',
    colProps: { span: 4 },
  },
  {
    label: '上课时段',
    field: 'courseTime_0',
    component: 'TimeRangePicker',
    componentProps: {
      style: { width: '100%' },
    },
    colProps: { span: 18 },
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

export const courseInfoSchema: DescItem[] = [
  {
    label: '课程名称',
    field: 'courseName',
  },
  {
    label: '课程类别',
    field: 'courseCategory',
  },
  {
    label: '主任课老师',
    field: 'teacherName',
  },
  {
    label: '上课校区',
    field: 'courseAddress',
  },
  // 课程信息详情部分展示
  // {
  //   title: '上课时间',
  //   dataIndex: 'courseDate',
  //   width: 120,
  // },
  // {
  //   title: '上课时段',
  //   dataIndex: 'courseTime',
  //   width: 120,
  // },
  {
    label: '开课时间',
    field: 'courseStartTime',
  },
  {
    label: '课程单价',
    field: 'coursePrice',
  },
  {
    label: '课程总课时',
    field: 'courseNumber',
  },
  {
    label: '课程简介',
    field: 'courseIntroduce',
  },
  {
    label: '备注',
    field: 'courseNotes',
  },
];
