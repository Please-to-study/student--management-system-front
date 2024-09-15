import { BasicColumn, FormSchema } from '@/components/Table';
import {
  queryValidateStudentName,
  queryValidateStudentNumber,
  validateStudentPhone,
} from '@/views/studentInformationManagement/studentValidate';
import { ref, unref } from 'vue';
import { getSameStudent } from '@/api/studentInformationManagement/studentInformationManagement';
import { DescItem } from '@/components/Description';

export const columns: BasicColumn[] = [
  {
    title: '学号',
    dataIndex: 'studentNumber',
    width: 120,
  },
  {
    title: '学生姓名',
    dataIndex: 'studentName',
    width: 80,
  },
  {
    title: '电话',
    dataIndex: 'studentPhone',
    width: 120,
  },
  {
    title: '等级',
    dataIndex: 'programRate',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'programNotes',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'studentNumber',
    label: '学号',
    component: 'Input',
    colProps: { span: 6 },
    rules: [
      {
        trigger: 'blur',
        validator: queryValidateStudentNumber(),
      },
    ],
  },
  {
    field: 'studentName',
    label: '姓名',
    component: 'Input',
    colProps: { span: 6 },
    rules: [
      {
        trigger: 'blur',
        validator: queryValidateStudentName(),
      },
    ],
  },
];

// 添加学生账户表单
export const accountFormSchema: FormSchema[] = [
  {
    field: 'studentName',
    component: 'Select',
    label: '学生姓名',
    componentProps: ({ formModel, formActionType }) => {
      const studentOptions = ref<any[]>([]);
      return {
        // --todolist-- getSameStudent获取数据
        options: unref(studentOptions),
        showSearch: true,
        placeholder: '请选择学生',
        onSearch: async (value) => {
          console.log('search value: ', value);
          const { result } = await getSameStudent(value);
          studentOptions.value = result.items;
        },
      };
    },
    required: true,
  },
  {
    field: 'studentPhone',
    label: '电话',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入电话',
      },
      {
        trigger: 'blur',
        validator: validateStudentPhone(),
      },
    ],
  },
  {
    label: '等级',
    field: 'programRate',
    component: 'Input',
    required: true,
  },
  {
    field: 'programNotes',
    label: '备注',
    component: 'InputTextArea',
  },
];

export const programRateSchema: DescItem[] = [
  {
    label: '学号',
    field: 'studentNumber',
  },
  {
    label: '学生姓名',
    field: 'studentName',
  },
  {
    label: '电话',
    field: 'studentPhone',
  },
  {
    label: '等级',
    field: 'programRate',
  },
  {
    label: '备注',
    field: 'programNotes',
  },
];
