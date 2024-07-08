import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { AccountListItem } from "@/api/demo/model/systemModel";

/**
 * transform mock data
 * {
 *  0: '华东分部',
 * '0-0': '华东分部-研发部'
 * '0-1': '华东分部-市场部',
 *  ...
 * }
 */
export const deptMap = (() => {
  const pDept = ['华东分部', '华南分部', '西北分部'];
  const cDept = ['研发部', '市场部', '商务部', '财务部'];

  return pDept.reduce((map, p, pIdx) => {
    map[pIdx] = p;

    cDept.forEach((c, cIndex) => (map[`${pIdx}-${cIndex}`] = `${p}-${c}`));

    return map;
  }, {});
})();

export const columns: BasicColumn[] = [
  {
    title: '课程ID',
    dataIndex: 'courseId',
    width: 120,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '学生ID',
    dataIndex: 'studentId',
    width: 80,
  },
  {
    title: '单价',
    dataIndex: 'price',
    width: 140,
  },
  {
    title: '课时',
    dataIndex: 'courseTime',
    width: 120,
  },
  {
    title: '优惠',
    dataIndex: 'preferential',
    width: 200,
  },
  {
    title: '应缴金额',
    dataIndex: 'payableFee',
    width: 160,
  },
  {
    title: '实缴费用',
    dataIndex: 'actuallyPay',
    width: 200,
  },
  {
    title: '其他费用',
    dataIndex: 'otherFee',
    width: 200,
  },
  {
    title: '支付方式',
    dataIndex: 'actuallyPay',
    width: 200,
  },
  {
    title: '收款人',
    dataIndex: 'payee',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'notes',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '姓名',
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

// 新增缴费信息表单
export const accountFormSchema: FormSchema[] = [
  {
    field: 'courseName',
    label: '课程名称',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      // --todolist--  更改对应字段
      labelField: 'roleName',
      valueField: 'roleValue',
    },
    required: true,
  },
  {
    field: 'courseId',
    label: '课程id',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      // --todolist--  更改对应字段
      labelField: 'courseName',
      valueField: 'courseId',
    },
    required: true,
    ifShow: false,
  },
  {
    field: 'pwd',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: false,
  },
  {
    label: '性别',
    field: 'gender',
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
    field: 'school',
    label: '当前学校',
    component: 'Input',
    // required: true,
  },
  {
    field: 'grade',
    label: '当前年级',
    component: 'Input',
    // required: true,
  },

  {
    label: '家庭地址',
    field: 'address',
    component: 'Input',
    // required: true,
  },
  {
    label: '电话',
    field: 'phone',
    component: 'Input',
    required: true,
  },
  {
    label: '备注',
    field: 'notes',
    component: 'InputTextArea',
  },
];


export const data: AccountListItem[] =  [
  {
    "id": "0",
    "account": "Jason",
    "email": "m.bwiszgfvjp@pjzccoin.ru",
    "nickname": "邱霞",
    "role": "Ruth",
    "createTime": "1994-04-03 02:18:29",
    "remark": "至术响其快称相多质起月三水或正",
    "dept": 0,
    "status": "1"
  },
  {
    "id": "1",
    "account": "Kevin",
    "email": "w.nqhjwvbm@wvxr.st",
    "nickname": "程丽",
    "role": "Edward",
    "createTime": "2017-02-18 15:59:42",
    "remark": "家别保指品物角路王专",
    "dept": 0,
    "status": "1"
  },
  {
    "id": "2",
    "account": "Susan",
    "email": "s.tkp@fxwha.uy",
    "nickname": "谭平",
    "role": "Kevin",
    "createTime": "1996-02-28 18:43:51",
    "remark": "事为样复西局族南养号交国斗说部队记也按西",
    "dept": 1,
    "status": "1"
  },
  {
    "id": "3",
    "account": "Brian",
    "email": "n.crv@mudxsqlfq.ro",
    "nickname": "邱洋",
    "role": "Sarah",
    "createTime": "1974-09-23 11:23:34",
    "remark": "后引条了持内证器代采火行",
    "dept": 0,
    "status": "1"
  },
  {
    "id": "4",
    "account": "David",
    "email": "h.nqiwjklrsr@zbfkz.an",
    "nickname": "曹强",
    "role": "Mark",
    "createTime": "2020-12-26 08:06:06",
    "remark": "月半快实革产一世群设军法改商以个段革",
    "dept": 1,
    "status": "0"
  },
  {
    "id": "5",
    "account": "Matthew",
    "email": "e.pxvfz@orptfexwn.gb",
    "nickname": "易杰",
    "role": "Deborah",
    "createTime": "1997-07-08 17:32:30",
    "remark": "民科属交值员见价两品质要约",
    "dept": 0,
    "status": "1"
  },
  {
    "id": "6",
    "account": "George",
    "email": "m.yscygfxy@fftslpdd.kr",
    "nickname": "龚军",
    "role": "Susan",
    "createTime": "2017-02-21 21:14:14",
    "remark": "同七口即里局消名样情却此心你团通",
    "dept": 1,
    "status": "0"
  },
  {
    "id": "7",
    "account": "Robert",
    "email": "n.gergpy@hujc.cv",
    "nickname": "徐娜",
    "role": "Jeffrey",
    "createTime": "2024-04-28 12:58:40",
    "remark": "济现后张产细色马更品理强米行节集月",
    "dept": 1,
    "status": "0"
  },
  {
    "id": "8",
    "account": "Mark",
    "email": "c.ibhhkpi@bybctabuxg.nu",
    "nickname": "史艳",
    "role": "Brenda",
    "createTime": "2000-08-23 00:43:57",
    "remark": "有在须装务路活且为理内制技器五海号利进",
    "dept": 0,
    "status": "1"
  },
  {
    "id": "9",
    "account": "Kimberly",
    "email": "x.ybv@gyxk.ec",
    "nickname": "龙芳",
    "role": "George",
    "createTime": "1997-04-04 00:08:50",
    "remark": "性好真革计议根工速叫再快身计",
    "dept": 1,
    "status": "1"
  },
  {
    "id": "6",
    "account": "George",
    "email": "m.yscygfxy@fftslpdd.kr",
    "nickname": "龚军",
    "role": "Susan",
    "createTime": "2017-02-21 21:14:14",
    "remark": "同七口即里局消名样情却此心你团通",
    "dept": 1,
    "status": "0"
  },
  {
    "id": "7",
    "account": "Robert",
    "email": "n.gergpy@hujc.cv",
    "nickname": "徐娜",
    "role": "Jeffrey",
    "createTime": "2024-04-28 12:58:40",
    "remark": "济现后张产细色马更品理强米行节集月",
    "dept": 1,
    "status": "0"
  },
  {
    "id": "8",
    "account": "Mark",
    "email": "c.ibhhkpi@bybctabuxg.nu",
    "nickname": "史艳",
    "role": "Brenda",
    "createTime": "2000-08-23 00:43:57",
    "remark": "有在须装务路活且为理内制技器五海号利进",
    "dept": 0,
    "status": "1"
  },
  {
    "id": "9",
    "account": "Kimberly",
    "email": "x.ybv@gyxk.ec",
    "nickname": "龙芳",
    "role": "George",
    "createTime": "1997-04-04 00:08:50",
    "remark": "性好真革计议根工速叫再快身计",
    "dept": 1,
    "status": "1"
  }
]
