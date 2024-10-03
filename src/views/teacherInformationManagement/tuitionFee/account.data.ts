import { BasicColumn, FormSchema } from '@/components/Table';
import { DescItem } from '@/components/Description';
import { validateTeacherPhone } from '@/views/teacherInformationManagement/teacherValidate';

const genderMap = new Map([
  ['1', '男'],
  ['2', '女'],
]);

export const columns: BasicColumn[] = [
  {
    title: '上课记录ID',
    dataIndex: 'courseRecordId',
    width: 140,
    ifShow: false,
  },
  {
    title: '上课日期',
    dataIndex: 'addCourseRecordTime',
    width: 140,
  },
  {
    title: '课程名称',
    dataIndex: 'courseName',
    width: 120,
  },
  {
    title: '课程类别ID',
    dataIndex: 'courseCategoryId',
    width: 120,
    ifShow: false,
  },
  {
    title: '课程类别',
    dataIndex: 'courseCategoryName',
    width: 120,
  },
  {
    title: '上课开始时间',
    dataIndex: 'startTime',
    width: 120,
  },
  {
    title: '上课结束时间',
    dataIndex: 'endTime',
    width: 120,
  },
  {
    title: '课时费',
    dataIndex: 'courseCategoryPrice',
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
    field: 'teacherDate',
    label: '月份',
    component: 'MonthPicker',
    componentProps: {
      style: { width: '100%' },
      format: 'YYYY-MM-DD',
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
    render: (value) => {
      return genderMap.get(value);
    },
  },
  {
    field: 'teacherPhone',
    label: '联系电话',
  },
  {
    field: 'teacherAddress',
    label: '住址',
  },
  // {
  //   field: 'teacherCourse',
  //   label: '教授课程',
  // },
  {
    field: 'teacherNumber',
    label: '上课次数',
  },
  {
    field: 'signingStyle',
    label: '签约形式',
  },
  {
    field: 'teacherPayStyleName',
    label: '课时费计算方式',
  },
  {
    field: 'teacherBasicSalary',
    label: '底薪',
  },
  {
    field: 'teacherCourseFee',
    label: '课时费',
  },
];
