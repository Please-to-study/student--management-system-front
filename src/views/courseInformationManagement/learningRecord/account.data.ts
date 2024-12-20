import { BasicColumn, FormSchema } from '@/components/Table';
import { DescItem } from '@/components/Description';
import { formatToDateTime } from '@/utils/dateUtil';
import { queryValidateTeacherName } from "@/views/teacherInformationManagement/teacherValidate";

export const columns: BasicColumn[] = [
  {
    title: '学习记录ID',
    dataIndex: 'learningRecordId',
    width: 120,
    ifShow: false,
  },
  {
    title: '学生ID',
    dataIndex: 'studentId',
    width: 120,
    ifShow: false,
  },
  {
    title: '姓名',
    dataIndex: 'studentName',
    width: 120,
  },
  {
    title: '上课评价',
    dataIndex: 'studentCourseEvaluate',
    width: 200,
  },
  {
    title: '上课内容',
    dataIndex: 'courseContent',
    width: 120,
  },
  {
    title: '课程作业',
    dataIndex: 'materialsTitle',
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
    title: '课次',
    dataIndex: 'courseTime',
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
    title: '课消',
    dataIndex: 'learningRecordCourseClear',
    width: 80,
  },
  {
    title: '任课老师ID',
    dataIndex: 'teacherId',
    width: 120,
    ifShow: false,
  },
  {
    title: '任课老师',
    dataIndex: 'teacherName',
    width: 120,
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    customRender: ({ value }) => {
      return formatToDateTime(value);
    },
    width: 120,
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    customRender: ({ value }) => {
      return formatToDateTime(value);
    },
    width: 120,
  },
  {
    title: '审核意见',
    dataIndex: 'reviewRecordContent',
    width: 120,
  },
  {
    title: '审核日期',
    dataIndex: 'addReviewRecordTime',
    customRender: ({ value }) => {
      return formatToDateTime(value);
    },
    width: 120,
  },
  {
    title: '备注',
    dataIndex: 'learningRecordNotes',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'studentId',
    label: '学生姓名',
    slot: 'custom',
    colProps: {
      xl: 6,
    },
  },
  {
    field: 'learningRecordDate',
    label: '日期',
    component: 'DatePicker',
    componentProps: {
      style: { width: '100%' },
      format: 'YYYY-MM-DD',
    },
    colProps: { span: 6 },
  },
  {
    field: 'courseName',
    label: '课程名称',
    component: 'Input',
    colProps: { span: 6 },
  },
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
];

export const accountFormSchema: FormSchema[] = [
  {
    label: '学生学习记录ID',
    field: 'learningRecordId',
    component: 'Input',
    ifShow: false,
  },
  {
    label: '学生ID',
    field: 'studentId',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'studentCourseEvaluate',
    label: '上课评价',
    component: 'InputTextArea',
    required: true,
  },
  // {
  //   field: 'courseContent',
  //   label: '上课内容',
  //   component: 'Input',
  //   required: true,
  // },
  // {
  //   field: 'materialsTitle',
  //   label: '课程作业',
  //   component: 'InputTextArea',
  // },
  {
    field: 'courseId',
    label: '课程ID',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'teacherId',
    label: '教师ID',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'courseRecordId',
    label: '教师ID',
    component: 'Input',
    required: true,
    ifShow: false,
  },
  {
    field: 'courseCategoryId',
    label: '教师ID',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'materialsId',
    label: '教师ID',
    component: 'Input',
    ifShow: false,
  },
  // {
  //   field: 'courseName',
  //   label: '课程名称',
  //   component: 'Input',
  //   required: true,
  // },
  // {
  //   field: 'courseCategoryId',
  //   label: '课程类别',
  //   component: 'ApiSelect',
  //   componentProps: {
  //     api: getCourseCategoryInfoList,
  //     params: {},
  //     resultField: 'items',
  //     labelField: 'courseCategoryName',
  //     valueField: 'courseCategoryId',
  //   },
  //   required: true,
  // },
  // {
  //   label: '任课老师',
  //   field: 'teacherId',
  //   required: true,
  //   slot: 'teacherSearch',
  // },
  {
    field: 'learningRecordNotes',
    label: '备注',
    component: 'InputTextArea',
  },
];

export const learningRecordSchema: DescItem[] = [
  {
    label: '学习记录ID',
    field: 'learningRecordId',
  },
  {
    label: '姓名',
    field: 'studentName',
  },
  {
    label: '上课评价',
    field: 'studentCourseEvaluate',
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
    label: '课程名称',
    field: 'courseName',
  },
  {
    label: '课程类别',
    field: 'courseCategoryName',
  },
  {
    label: '任课老师',
    field: 'teacherName',
  },
  {
    label: '开始时间',
    field: 'startTime',
    render: ({ value }) => {
      return formatToDateTime(value);
    },
  },
  {
    label: '结束时间',
    field: 'endTime',
    render: ({ value }) => {
      return formatToDateTime(value);
    },
  },
  {
    label: '日期',
    field: 'addLearningRecordTime',
    render: ({ value }) => {
      return formatToDateTime(value);
    },
  },
  {
    label: '备注',
    field: 'learningRecordNotes',
  },
];
