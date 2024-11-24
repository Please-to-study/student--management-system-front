import { BasicColumn, FormSchema } from '@/components/Table';
import {
  queryValidateTeacherName,
  validateTeacherName,
  validateTeacherPhone,
} from '@/views/teacherInformationManagement/teacherValidate';
import { DescItem } from '@/components/Description';
import { getTeacherPayStyleInfoList } from '@/api/configManagement';

const genderMap = new Map([
  ['1', '男'],
  ['2', '女'],
]);

export const columns: BasicColumn[] = [
  {
    title: '教师ID',
    dataIndex: 'teacherId',
    width: 120,
  },
  {
    title: '教师姓名',
    dataIndex: 'teacherName',
    width: 120,
  },
  {
    title: '性别',
    dataIndex: 'teacherGender',
    customRender: ({ value }) => {
      return genderMap.get(value);
    },
    width: 80,
  },
  {
    title: '联系电话',
    dataIndex: 'teacherPhone',
    width: 140,
  },
  {
    title: '家庭地址',
    dataIndex: 'teacherAddress',
    width: 200,
  },
  // {
  //   title: '账号密码',
  //   dataIndex: 'teacherPassword',
  //   width: 120,
  // },
  // todo 是否添加教授课程
  // {
  //   title: '教授课程',
  //   dataIndex: 'teacherCourse',
  //   width: 120,
  // },
  {
    title: '签约形式(全职，兼职)',
    dataIndex: 'signingStyle',
    width: 120,
  },
  {
    title: '课时费计算方式ID',
    dataIndex: 'teacherPayStyleId',
    ifShow: false,
    width: 120,
  },
  {
    title: '课时费计算方式',
    dataIndex: 'teacherPayStyleName',
    width: 200,
  },
  {
    title: '底薪',
    dataIndex: 'teacherBasicSalary',
    width: 100,
  },
  {
    title: '备注',
    dataIndex: 'teacherNotes',
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
    field: 'signingStyle',
    label: '签约形式',
    component: 'Input',
    colProps: { span: 6 },
  },
];

// 添加教师账户
export const accountFormSchema: FormSchema[] = [
  {
    field: 'teacherId',
    label: '',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'teacherName',
    label: '教师姓名',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入教师姓名',
      },
      {
        trigger: 'blur',
        validator: validateTeacherName(),
      },
    ],
  },
  {
    field: 'teacherPhone',
    label: '联系电话',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入电话',
      },
      {
        trigger: 'change',
        validator: validateTeacherPhone(),
      },
    ],
    required: true,
  },
  {
    field: 'teacherPassword',
    label: '密码',
    component: 'Input',
    required: true,
    defaultValue: '123456',
    ifShow: false,
  },
  {
    label: '性别',
    field: 'teacherGender',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '男',
          value: '1',
          key: '1',
        },
        {
          label: '女',
          value: '2',
          key: '2',
        },
      ],
    },
    required: true,
  },
  {
    field: 'teacherAddress',
    label: '家庭地址',
    component: 'Input',
    // required: true,
  },
  // {
  //   // 单价和课时与课程名称相关联，选定课程自动填充不可更改
  //   field: 'signingId',
  //   label: '签约形式',
  //   component: 'ApiSelect',
  //   componentProps: ({ formModel, formActionType }) => {
  //     return {
  //       api: getSigningStyleInfoList,
  //       params: {},
  //       placeholder: '请选择签约形式',
  //       resultField: 'items',
  //       labelField: 'signingName',
  //       valueField: 'signingId',
  //       onChange: async (e: any) => {
  //         const data = await getSigningStyleInfoList();
  //         const res = data.items.find((element) => element.signingId === e);
  //         formModel.teacherPayStyle = res.payStyleName;
  //         const { updateSchema } = formActionType;
  //         updateSchema([
  //           {
  //             field: 'teacherPayStyle',
  //             componentProps: {
  //               disabled: true,
  //             },
  //           },
  //         ]);
  //       },
  //     };
  //   },
  //   required: true,
  // },
  {
    label: '签约形式',
    field: 'signingStyle',
    component: 'Input',
    required: true,
  },
  {
    field: 'teacherPayStyleId',
    label: '课时费计算',
    component: 'ApiSelect',
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: getTeacherPayStyleInfoList,
        params: {},
        placeholder: '请选择课时费方式',
        resultField: 'items',
        labelField: 'teacherPayStyleName',
        valueField: 'teacherPayStyleId',
        onChange: async (e: any) => {
          const data = await getTeacherPayStyleInfoList();
          const res = data.items.find((element) => element.teacherPayStyleId === e);
          const { updateSchema } = formActionType;
          if (res.basicSalary) {
            updateSchema([
              {
                field: 'teacherBasicSalary',
                componentProps: {
                  disabled: false,
                },
                defaultValue: '',
              },
            ]);
          } else {
            updateSchema([
              {
                field: 'teacherBasicSalary',
                componentProps: {
                  disabled: true,
                },
                defaultValue: 0,
              },
            ]);
          }
        },
      };
    },
    required: true,
  },
  {
    label: '底薪',
    field: 'teacherBasicSalary',
    component: 'InputNumber',
    componentProps: {
      disabled: true,
    },
    defaultValue: 0,
    required: true,
  },
  {
    label: '备注',
    field: 'teacherNotes',
    component: 'InputTextArea',
  },
];

export const teacherInfoSchema: DescItem[] = [
  {
    label: '教师ID',
    field: 'teacherId',
  },
  {
    label: '教师姓名',
    field: 'teacherName',
  },
  {
    label: '联系电话',
    field: 'teacherPhone',
  },
  {
    label: '性别',
    field: 'teacherGender',
    render: (value) => {
      return genderMap.get(value);
    },
  },
  {
    label: '家庭地址',
    field: 'teacherAddress',
  },
  // {
  //   label: '教授课程',
  //   field: 'teacherCourse',
  // },
  {
    label: '签约形式(全职，兼职)',
    field: 'signingStyle',
  },
  {
    label: '课时费计算方式',
    field: 'teacherPayStyleName',
  },
  {
    label: '备注',
    field: 'teacherNotes',
  },
];
