import { BasicColumn, FormSchema } from '@/components/Table';
import { DescItem } from '@/components/Description';
import { queryValidateTeacherName } from '@/views/teacherInformationManagement/teacherValidate';
import { formatToDateTime } from '@/utils/dateUtil';

export const IDENTITY_REFUSE_STATUS = 2;

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
    title: '教师记录ID',
    dataIndex: 'courseRecordId',
    width: 120,
    ifShow: false,
  },
  {
    title: '姓名',
    dataIndex: 'studentName',
    editRow: true,
    width: 120,
  },
  {
    title: '学号',
    dataIndex: 'studentNumber',
    editRow: true,
    width: 120,
  },
  {
    title: '上课评价',
    dataIndex: 'studentCourseEvaluate',
    editRow: true,
    width: 200,
  },
  {
    title: '上课内容',
    dataIndex: 'courseContent',
    editRow: true,
    width: 120,
  },
  {
    title: '课程作业',
    dataIndex: 'materialsTitle',
    editRow: true,
    width: 120,
  },
  {
    title: '课程/班级',
    dataIndex: 'courseName',
    editRow: true,
    width: 120,
  },
  {
    title: '课程ID',
    dataIndex: 'courseId',
    editRow: true,
    width: 100,
  },
  {
    title: '课次',
    dataIndex: 'courseTime',
    editRow: true,
    width: 80,
  },
  {
    title: '课程类别',
    dataIndex: 'courseCategoryName',
    editRow: true,
    width: 120,
  },
  {
    title: '课程类别ID',
    dataIndex: 'courseCategoryId',
    width: 100,
    editRow: true,
  },
  {
    title: '任课老师',
    dataIndex: 'teacherName',
    editRow: true,
    width: 120,
  },
  {
    title: '任课老师ID',
    dataIndex: 'teacherId',
    width: 100,
    editRow: true,
  },
  {
    title: '课消',
    dataIndex: 'learningRecordCourseClear',
    editRow: true,
    width: 80,
  },
  {
    title: '开始时间',
    dataIndex: 'learningRecordStartTime',
    // customRender: ({ value }) => {
    //   return formatToDateTime(value);
    // },
    editRow: true,
    width: 140,
  },
  {
    title: '结束时间',
    dataIndex: 'learningRecordEndTime',
    // customRender: ({ value }) => {
    //   return formatToDateTime(value);
    // },
    editRow: true,
    width: 140,
  },
  // {
  //   title: '日期',
  //   dataIndex: 'addLearningRecordTime',
  //   customRender: ({ value }) => {
  //     return formatToDateTime(value);
  //   },
  //   editRow: true,
  //   width: 120,
  // },
  // {
  //   title: '备注',
  //   dataIndex: 'learningRecordNotes',
  //   editRow: true,
  //   width: 120,
  // },
  {
    title: '审核意见',
    dataIndex: 'reviewRecordContent',
    width: 200,
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
    field: 'reviewRecordContent',
    label: '审核意见',
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
