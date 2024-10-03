import { BasicColumn, FormSchema } from '@/components/Table';
import {
  queryValidateStudentNumber,
} from '@/views/studentInformationManagement/studentValidate';
import { getCourseList } from '@/api/courseInformationManagement/courseInformationManagement';
import { DescItem } from '@/components/Description';
import { getCourseCategoryInfoList } from "@/api/configManagement";

export const columns: BasicColumn[] = [
  {
    title: '缴费ID',
    dataIndex: 'payId',
    width: 120,
    ifShow: false,
  },
  {
    title: '学生姓名',
    dataIndex: 'studentName',
    width: 120,
  },
  {
    title: '学号',
    dataIndex: 'studentNumber',
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
    title: '缴费时间',
    dataIndex: 'addPayInfoTime',
    width: 120,
  },
  {
    title: '单价',
    dataIndex: 'courseCategoryPrice',
    width: 120,
  },
  {
    title: '课时',
    dataIndex: 'courseNumber',
    width: 120,
  },
  {
    title: '其他费用',
    dataIndex: 'otherFee',
    width: 120,
  },
  {
    title: '优惠',
    dataIndex: 'payPreferential',
    width: 120,
  },
  {
    title: '应缴金额',
    dataIndex: 'payableFee',
    width: 120,
  },
  {
    title: '实付费用',
    dataIndex: 'actuallyFee',
    width: 120,
  },
  {
    title: '支付方式',
    dataIndex: 'payStyle',
    width: 120,
  },
  {
    title: '收款人',
    dataIndex: 'payeeName',
    width: 120,
  },
  {
    title: '备注',
    dataIndex: 'payNotes',
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
    field: 'studentId',
    label: '学生姓名',
    slot: 'custom',
    colProps: {
      xl: 6,
    },
  },
  {
    field: 'courseCategoryId',
    label: '课程类别',
    component: 'ApiSelect',
    componentProps: {
      api: getCourseCategoryInfoList,
      params: {
      },
      resultField: 'items',
      labelField: 'courseCategoryName',
      valueField: 'courseCategoryId',
    },
    colProps: { span: 6 },
  },
];

// 新增缴费信息表单
export const accountFormSchema: FormSchema[] = [
  {
    label: '缴费ID',
    field: 'payId',
    component: 'Input',
    ifShow: false,
  },
  {
    label: '报名学生',
    field: 'studentId',
    required: true,
    slot: 'studentSearch',
  },
  {
    // 单价和课时与课程名称相关联，选定课程自动填充不可更改
    field: 'courseCategoryId',
    label: '课程类别',
    component: 'ApiSelect',
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: getCourseCategoryInfoList,
        params: {
        },
        placeholder: '请选择课程类别',
        resultField: 'items',
        labelField: 'courseCategoryName',
        valueField: 'courseCategoryId',
        onChange: async (e: any) => {
          const data = await getCourseCategoryInfoList();
          const res = data.items.find((element) => element.courseCategoryId === e);
          formModel.courseCategoryPrice = res.courseCategoryPrice;
          const { updateSchema } = formActionType;
          updateSchema([
            {
              field: 'courseCategoryPrice',
              componentProps: {
                disabled: true,
              },
            },
          ]);
        },
      };
    },
    required: true,
  },
  {
    field: 'courseCategoryPrice',
    label: '课程单价',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'courseNumber',
    label: '课时',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'payPreferential',
    label: '优惠',
    component: 'InputNumber',
    required: true,
    componentProps: ({ formModel, formActionType }) => {
      return {
        onChange: (e: any) => {
          formModel.payableFee =
            formModel.courseCategoryPrice * formModel.courseNumber -
            formModel.payPreferential -
            formModel.otherFee;
        },
      };
    },
  },
  {
    field: 'otherFee',
    label: '其他费用',
    component: 'InputNumber',
    defaultValue: 0,
    required: true,
    componentProps: ({ formModel, formActionType }) => {
      return {
        onChange: (e: any) => {
          formModel.payableFee =
            formModel.courseCategoryPrice * formModel.courseTime -
            formModel.payPreferential +
            formModel.otherFee;
        },
      };
    },
  },
  // 实付费用自己输入、应缴金额动态计算
  {
    field: 'payableFee',
    label: '应缴金额',
    component: 'InputNumber',
    componentProps: {
      prefix: '￥',
      bordered: false,
      disabled: true,
      // allowClear: false,
    },
    required: true,
  },
  {
    field: 'actuallyFee',
    label: '实付费用',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'payStyle',
    label: '支付方式',
    component: 'Input',
    defaultValue: '线下扫码支付',
    required: true,
  },
  {
    // todo 待修改
    field: 'payeeId',
    label: '收款人',
    component: 'Input',
    // defaultValue: 1,
    // componentProps: {
    //   disabled: true,
    // },
    required: true,
  },
  {
    label: '备注',
    field: 'payNotes',
    component: 'InputTextArea',
  },
];

export const spendingSchema: DescItem[] = [
  {
    label: '缴费ID',
    field: 'payId',
  },
  {
    label: '课程类别',
    field: 'courseCategoryName',
  },
  {
    label: '学生姓名',
    field: 'studentName',
  },
  {
    label: '学号',
    field: 'studentNumber',
  },

  {
    label: '缴费时间',
    field: 'addPayInfoTime',
  },
  {
    label: '课程单价',
    field: 'courseCategoryPrice',
  },
  {
    label: '课时',
    field: 'courseNumber',
  },
  {
    label: '优惠',
    field: 'payPreferential',
  },
  {
    label: '应缴金额',
    field: 'payableFee',
  },
  {
    label: '实付费用',
    field: 'actuallyFee',
  },
  {
    label: '其他费用',
    field: 'otherFee',
  },
  {
    label: '支付方式',
    field: 'payStyle',
  },
  {
    label: '收款人',
    field: 'payeeName',
  },
  {
    label: '备注',
    field: 'payNotes',
  },
];
