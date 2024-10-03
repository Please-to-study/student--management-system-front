import { BasicColumn, FormSchema } from '@/components/Table';
import {
  queryValidateTeacherName,
  queryValidateTeacherPhone,
} from '@/views/teacherInformationManagement/teacherValidate';
import { DescItem } from '@/components/Description';
import { getCourseCategoryInfoList } from '@/api/configManagement';

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
    title: '开始时间',
    dataIndex: 'startTime',
    width: 140,
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    width: 140,
  },
  {
    title: '上课日期',
    dataIndex: 'addCourseRecordTime',
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
    field: 'teacherPhone',
    label: '教师电话',
    component: 'Input',
    colProps: { span: 6 },
    rules: [
      {
        trigger: 'blur',
        validator: queryValidateTeacherPhone(),
      },
    ],
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
    label: '教师ID',
    field: 'teacherId',
  },
  {
    label: '教师姓名',
    field: 'teacherName',
  },
  {
    label: '课程ID',
    field: 'courseId',
  },
  {
    label: '课程名称',
    field: 'courseName',
  },
  {
    label: '课程类别ID',
    field: 'courseCategoryId',
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
    field: 'courseHomework',
  },
  {
    label: '开始时间',
    field: 'startTime',
  },
  {
    label: '结束时间',
    field: 'endTime',
  },
  {
    label: '上课日期',
    field: 'addCourseRecordTime',
  },
  {
    label: '备注',
    field: 'courseRecordNotes',
  },
];
