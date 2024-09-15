import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { AccountListItem } from '@/api/demo/model/systemModel';
import { queryValidateTeacherName } from '@/views/teacherInformationManagement/teacherValidate';
import {
  getAllCourseInfoList,
  getSpecialCourseInfoList,
} from '@/api/courseInformationManagement/courseInformationManagement';
import { DescItem } from '@/components/Description';
import { ref, unref } from 'vue';
import { getSameStudent } from '@/api/studentInformationManagement/studentInformationManagement';
import {
  getAllTeacherBasicInfoList
} from "@/api/teacherInformationManagement/teacherInformationManagement";

export const columns: BasicColumn[] = [
  {
    title: '教师姓名',
    dataIndex: 'teacherName',
    width: 120,
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
    title: '上课内容',
    dataIndex: 'teacherCourseContent',
    width: 200,
  },
  {
    title: '课程作业',
    dataIndex: 'courseHomework',
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
    title: '日期',
    dataIndex: 'date',
    width: 140,
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
  },
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
    field: 'teacherName',
    component: 'Select',
    label: '教师姓名',
    componentProps: ({ formModel, formActionType }) => {
      const teacherOptions = ref<any[]>([]);
      return {
        options: unref(teacherOptions),
        showSearch: true,
        placeholder: '请选择教师',
        onSearch: async (value) => {
          console.log('search value: ', value);
          // todolist 获取简略的老师信息列表
          const { result } = await getSameStudent(value);
          teacherOptions.value = result.items;
        },
      };
    },
    required: true,
  },
  {
    // 单价和课时与课程名称相关联，选定课程自动填充不可更改
    field: 'courseName',
    label: '课程名称',
    component: 'ApiSelect',
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: getAllCourseInfoList,
        // options: getAllCourseInfoList,
        // todolist
        placeholder: '请选择课程',
        labelField: 'courseName',
        valueField: 'courseId',
      };
    },
    required: true,
  },
  {
    label: '课程类别',
    field: 'courseCategory',
    component: 'ApiSelect',
    componentProps: ({ formModel, formActionType }) => {
      return {
        // todolist 使用获取课程类别api
        api: getAllCourseInfoList,
        // options: getAllCourseInfoList,
        // todolist
        placeholder: '请选择课程',
        labelField: 'courseName',
        valueField: 'courseId',
      };
    },
    required: true,
  },
  {
    field: 'teacherCourseContent',
    label: '上课内容',
    component: 'InputTextArea',
    required: true,
  },
  {
    field: 'courseHomework',
    label: '课程作业',
    component: 'InputTextArea',
    // required: true,
  },

  {
    label: '开始时间',
    field: 'startTime',
    component: 'TimePicker',
    componentProps: {
      style: { width: '100%' },
    },
    required: true,
  },
  {
    label: '结束时间',
    field: 'endTime',
    component: 'TimePicker',
    componentProps: {
      style: { width: '100%' },
    },
    required: true,
  },
  {
    label: '上课日期',
    field: 'date',
    component: 'DatePicker',
    componentProps: {
      style: { width: '100%' },
    },
    required: true,
  },
];

export const courseRecordSchema: DescItem[] = [
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
    field: 'courseCategory',
  },
  {
    label: '上课内容',
    field: 'teacherCourseContent',
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
    label: '日期',
    field: 'date',
  },
];
