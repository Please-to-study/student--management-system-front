import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { AccountListItem } from '@/api/demo/model/systemModel';

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
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'courseName',
    label: '课程名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

// 添加账户表单
export const accountFormSchema: FormSchema[] = [
  {
    field: 'teacherName',
    component: 'Select',
    label: '教师姓名',
    componentProps: ({ formModel, formActionType }) => {
      return {
        // --todolist-- getSameStudent获取数据
        showSearch: true,
        placeholder: '请选择教师',
        onSearch: (value) => {
          console.log('search value: ', value);
          const studentOptions = [];
          const { updateSchema } = formActionType;
          updateSchema([
            {
              field: 'teacherName',
              componentProps: {
                options: studentOptions,
              },
            },
          ]);
        },
      };
    },
    required: true,
  },
  {
    field: 'courseName',
    label: '课程名称',
    component: 'Input',
    required: true,
  },
  {
    label: '课程类别',
    field: 'courseCategory',
    component: 'Select',
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
