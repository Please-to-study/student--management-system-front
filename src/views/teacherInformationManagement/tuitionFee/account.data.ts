import { BasicColumn, FormSchema } from '@/components/Table';
import { DescItem } from '@/components/Description';
import { formatToDateTime } from '@/utils/dateUtil';

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
    customRender: ({ value }) => {
      return formatToDateTime(value);
    },
    width: 120,
  },
  {
    title: '上课结束时间',
    dataIndex: 'endTime',
    customRender: ({ value }) => {
      return formatToDateTime(value);
    },
    width: 120,
  },
  {
    title: '课程单价',
    dataIndex: 'courseCategoryPrice',
    width: 120,
  },
  {
    title: '人次',
    dataIndex: 'courseStudentNum',
    width: 120,
  },
  {
    title: '当期课次',
    dataIndex: 'courseTime',
    width: 120,
  },
  {
    title: '课时',
    dataIndex: 'courseConsume',
    width: 120,
  },
  {
    title: '课时费校正',
    dataIndex: 'courseRecordFeeChange',
    edit: true,
    editComponentProps: {
      prefix: '￥',
    },
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '教师姓名',
    field: 'teacherId',
    slot: 'teacherCustom',
    colProps: {
      xl: 6,
    },
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
