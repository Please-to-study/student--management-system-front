import { BasicColumn, FormSchema } from '@/components/Table';
import { getAllTeacherBasicInfoList } from '@/api/teacherInformationManagement/teacherInformationManagement';
import { DescItem } from '@/components/Description';
import { validateTeacherPhone } from "@/views/teacherInformationManagement/teacherValidate";

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
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: getAllTeacherBasicInfoList,
      // api: getAllRoleList,
      // --todolist--  更改对应字段
      labelField: 'teacherName',
      valueField: 'teacherId',
      // labelField: 'roleName',
      // valueField: 'roleValue',
    },
    required: true,
  },
  {
    field: 'teacherPhone',
    label: '电话',
    component: 'InputNumber',
    colProps: { span: 6 },
    rules: [
      {
        required: true,
        message: '请输入电话',
      },
      {
        trigger: 'blur',
        validator: validateTeacherPhone(),
      },
    ],
    required: true,
  },
  {
    field: 'date',
    label: '月份',
    component: 'MonthPicker',
    componentProps: {
      style: { width: '100%' },
    },
    colProps: { span: 6 },
    required: true,
  },
];

export const teacherInfoSchema: DescItem[] = [
  {
    field: 'teacherName',
    label: '姓名',
  },
  {
    field: 'teacherGender',
    label: '性别',
  },
  {
    field: 'teacherPhone',
    label: '联系电话',
  },
  {
    field: 'teacherAddress',
    label: '住址',
  },
  {
    field: 'teacherCourse',
    label: '教授课程',
  },
  {
    field: 'teacherSigning',
    label: '签约形式',
  },
  {
    field: 'teacherSigning',
    label: '已完成课时',
  },
  {
    field: 'teacherSigning',
    label: '上课次数',
  },
  {
    field: 'teacherSigning',
    label: '课时费',
  },
];
