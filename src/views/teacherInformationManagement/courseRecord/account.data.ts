import { BasicColumn, FormSchema } from '@/components/Table';
import { queryValidateTeacherName } from '@/views/teacherInformationManagement/teacherValidate';
import { DescItem } from '@/components/Description';
import { getCourseCategoryInfoList } from '@/api/configManagement';
import { formatToDate, formatToDateTime } from "@/utils/dateUtil";

export const columns: BasicColumn[] = [
  {
    title: '教师ID',
    dataIndex: 'teacherId',
    width: 120,
    ifShow: false,
  },
  {
    title: '教师姓名',
    dataIndex: 'teacherName',
    width: 120,
  },
  {
    title: '课程ID',
    dataIndex: 'courseId',
    width: 120,
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
    title: '上课内容',
    dataIndex: 'courseContent',
    width: 200,
  },
  {
    title: '课程作业',
    dataIndex: 'materialsTitle',
    width: 200,
  },
  {
    title: '课次',
    dataIndex: 'courseTime',
    width: 80,
  },
  {
    title: '课消',
    dataIndex: 'courseConsume',
    width: 80,
  },
  {
    title: '上课人次',
    dataIndex: 'courseStudentNum',
    width: 100,
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    customRender: ({ value }) => {
      return formatToDateTime(value);
    },
    width: 140,
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    customRender: ({ value }) => {
      return formatToDateTime(value);
    },
    width: 140,
  },
  {
    title: '记录上传日期',
    dataIndex: 'addCourseRecordTime',
    customRender: ({ value }) => {
      return formatToDate(value);
    },
    width: 140,
  },
  {
    title: '备注',
    dataIndex: 'courseRecordNotes',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'teacherName',
    label: '教师姓名',
    component: 'Input',
    colProps: { span: 6 },
    rules: [
      {
        trigger: 'blur',
        validator: queryValidateTeacherName(),
      },
    ],
  },
  {
    field: 'courseCategoryId',
    label: '课程类别',
    component: 'ApiSelect',
    componentProps: {
      api: getCourseCategoryInfoList,
      params: {},
      resultField: 'items',
      labelField: 'courseCategoryName',
      valueField: 'courseCategoryId',
    },
    colProps: { span: 6 },
  },
  {
    field: 'signingStyle',
    label: '签约形式',
    component: 'Input',
    colProps: { span: 6 },
  },
];

// 添加账户表单
export const accountFormSchema: FormSchema[] = [
  {
    field: 'courseRecordId',
    label: '',
    component: 'Input',
    ifShow: false,
  },
  {
    label: '任课老师',
    field: 'teacherId',
    required: true,
    slot: 'teacherSearch',
    ifShow: false,
  },
  {
    field: 'courseId',
    label: '课程ID',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'courseCategoryId',
    label: '课程类别',
    component: 'ApiSelect',
    componentProps: {
      api: getCourseCategoryInfoList,
      params: {},
      resultField: 'items',
      labelField: 'courseCategoryName',
      valueField: 'courseCategoryId',
    },
    required: true,
    ifShow: false,
  },
  {
    field: 'courseContent',
    label: '上课内容',
    component: 'InputTextArea',
    required: true,
  },
  {
    field: 'materialsId',
    label: '课程作业',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'courseRecordNotes',
    label: '备注',
    component: 'InputTextArea',
    // required: true,
  },
  // {
  //   label: '开始时间',
  //   field: 'startTime',
  //   component: 'TimePicker',
  //   componentProps: {
  //     style: { width: '100%' },
  //   },
  //   required: true,
  // },
  // {
  //   label: '结束时间',
  //   field: 'endTime',
  //   component: 'TimePicker',
  //   componentProps: {
  //     style: { width: '100%' },
  //   },
  //   required: true,
  // },
  // {
  //   label: '上课日期',
  //   field: 'date',
  //   component: 'DatePicker',
  //   componentProps: {
  //     style: { width: '100%' },
  //   },
  //   required: true,
  // },
];

export const courseRecordSchema: DescItem[] = [
  {
    label: '上课记录ID',
    field: 'courseRecordId',
  },
  {
    label: '教师姓名',
    field: 'teacherName',
  },
  {
    label: '课程名称',
    field: 'courseName',
  },
  {
    label: '课程类别',
    field: 'courseCategoryName',
  },
  {
    label: '上课内容',
    field: 'courseContent',
  },
  {
    label: '课程作业',
    field: 'materialsTitle',
  },
  {
    label: '上课人次',
    field: 'courseStudentNum',
  },
  {
    label: '当期课次',
    field: 'courseTime',
  },
  {
    label: '课时',
    field: 'courseConsume',
  },
  {
    label: '开始时间',
    field: 'startTime',
    render: (value) => {
      return formatToDateTime(value);
    },
  },
  {
    label: '结束时间',
    field: 'endTime',
    render: (value) => {
      return formatToDateTime(value);
    },
  },
  {
    label: '上课日期',
    field: 'addCourseRecordTime',
    render: (value) => {
      return formatToDate(value);
    },
  },
  {
    label: '备注',
    field: 'courseRecordNotes',
  },
];
