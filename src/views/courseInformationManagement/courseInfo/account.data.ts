import { BasicColumn, FormSchema } from '@/components/Table';
import { DescItem } from '@/components/Description';
import { getCourseCategoryInfoList } from '@/api/configManagement';
import { isNull } from "@/utils/is";
import { formatToDate, formatToDateTime } from "@/utils/dateUtil";

export const weekend = [
  {
    label: '星期一',
    value: 1,
    key: '1',
  },
  {
    label: '星期二',
    value: 2,
    key: '2',
  },
  {
    label: '星期三',
    value: 3,
    key: '3',
  },
  {
    label: '星期四',
    value: 4,
    key: '4',
  },
  {
    label: '星期五',
    value: 5,
    key: '5',
  },
  {
    label: '星期六',
    value: 6,
    key: '6',
  },
  {
    label: '星期日',
    value: 7,
    key: '7',
  },
];

export const columns: BasicColumn[] = [
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
    title: '主任课老师Id',
    dataIndex: 'teacherId',
    width: 120,
    ifShow: false,
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
    title: '上课时间',
    dataIndex: 'courseWeekArget',
    width: 110,
    customRender: ({ value }) => {
      let courseTime = '';
      if (isNull(value)) {
        return courseTime;
      }
      value.forEach((courseDetail) => {
        const day = weekend.find((ele) => ele.value == courseDetail.weekEnd);
        const onceCourseTime =
          day?.label +
          ' ' +
          courseDetail.startTime.substring(11, 16) +
          '-' +
          courseDetail.endTime.substring(11, 16);
        courseTime += onceCourseTime;
      });
      return courseTime;
    },
  },
  {
    title: '课程单价',
    dataIndex: 'courseCategoryPrice',
    width: 120,
  },
  {
    title: '开课时间',
    dataIndex: 'courseStartDate',
    customRender: ({ value }) => {
      return formatToDate(value);
    },
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
    colProps: { span: 6 },
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
    field: 'courseAddress',
    label: '上课校区',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'courseStartDate',
    label: '日期',
    component: 'MonthPicker',
    componentProps: {
      style: { width: '100%' },
      format: 'YYYY-MM-DD',
    },
    colProps: { span: 6 },
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
  },
  {
    label: '任课老师',
    field: 'teacherId',
    required: true,
    slot: 'teacherSearch',
  },
  {
    field: 'courseAddress',
    label: '上课校区',
    component: 'Input',
    required: true,
  },
  {
    label: '开始日期',
    field: 'courseStartDate',
    component: 'DatePicker',
    componentProps: {
      style: { width: '100%' },
      format: 'YYYY-MM-DD',
    },
    required: true,
  },
  {
    label: '总课时',
    field: 'courseNumber',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'weekEnd_0',
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
      placeholder: ['开始时间', '结束时间'],
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
    render: ({ value }) => {
      return formatToDate(value);
    },
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
