import { BasicColumn } from '@/components/Table';
export const columnMap = new Map([
  ['日期', 'learningRecordDate'],
  ['姓名', 'studentName'],
  ['学号', 'studentNumber'],
  ['评价', 'studentCourseEvaluate'],
  ['内容', 'courseContent'],
  ['作业', 'materialsTitle'],
  ['课程/班级', 'courseName'],
  ['课程ID', 'courseId'],
  ['课次', 'courseTime'],
  ['课程类别', 'courseCategoryName'],
  ['课程类别ID', 'courseCategoryId'],
  ['任课老师', 'teacherName'],
  ['任课老师ID', 'teacherId'],
  ['课消', 'learningRecordCourseClear'],
  ['开始时间', 'learningRecordStartTime'],
  ['结束时间', 'learningRecordEndTime'],
]);

export const mustKeyArray = [
  'learningRecordDate',
  'studentNumber',
  'studentCourseEvaluate',
  'courseContent',
  'courseId',
  'courseTime',
  'courseCategoryId',
  'teacherId',
  'learningRecordCourseClear',
  'learningRecordStartTime',
  'learningRecordEndTime',
];

export const columns: BasicColumn[] = [
  {
    title: '日期',
    dataIndex: 'learningRecordDate',
    editRow: true,
    width: 120,
  },
  {
    title: '姓名',
    dataIndex: 'studentName',
    editRow: true,
    width: 100,
  },
  {
    title: '学号',
    dataIndex: 'studentNumber',
    editRow: true,
    customRender: ({ value }) => {
      console.log('xuehao wenben ', value);
      // if (value === '') {
      //   return <Tag color="red">此处数据有误</Tag>;
      // }
    },
    width: 120,
  },
  {
    title: '评价',
    dataIndex: 'studentCourseEvaluate',
    editRow: true,
    width: 200,
  },
  {
    title: '内容',
    dataIndex: 'courseContent',
    editRow: true,
    width: 200,
  },
  {
    title: '作业',
    dataIndex: 'materialsTitle',
    editRow: true,
    width: 200,
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
    width: 120,
  },
  {
    title: '课次',
    dataIndex: 'courseTime',
    editRow: true,
    width: 120,
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
    editRow: true,
    width: 120,
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
    editRow: true,
    width: 120,
  },
  {
    title: '课消',
    dataIndex: 'learningRecordCourseClear',
    editRow: true,
    width: 120,
  },
  {
    title: '开始时间',
    dataIndex: 'learningRecordStartTime',
    editRow: true,
    width: 120,
  },
  {
    title: '结束时间',
    dataIndex: 'learningRecordEndTime',
    editRow: true,
    width: 120,
  },
];

export const data: any[] = (() => {
  const arr: any[] = [];
  for (let index = 0; index < 40; index++) {
    arr.push({
      id: `${index}`,
      name: `${index} John Brown`,
      age: `${index + 10}`,
      no: `${index}98678`,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
      beginTime: new Date().toLocaleString(),
      endTime: new Date().toLocaleString(),
    });
  }
  return arr;
})();

// ["ID", "姓名", "年龄", "编号", "地址", "开始时间", "结束时间"]
export const arrHeader = columns.map((column) => column.title);
// [["ID", "姓名", "年龄", "编号", "地址", "开始时间", "结束时间"],["0", "0 John Brown", "10", "098678"]]
export const arrData = data.map((item) => {
  return Object.keys(item).map((key) => item[key]);
});
