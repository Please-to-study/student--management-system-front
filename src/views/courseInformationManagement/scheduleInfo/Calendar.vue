<template>
  <Calendar v-model:value="value" @panel-change="onPanelChange">
    <template #dateCellRender="{ current }">
      <ul class="events">
        <li v-for="item in getListData(current)" :key="item.content">
          <Popover>
            <template #content>
              <!--              <p>{{ item.everyCourseDetailId }}</p>-->
              <p>{{ item.content }}</p>
            </template>
            <Badge :color="item.color" :text="item.content" />
          </Popover>
        </li>
      </ul>
    </template>
    <template #monthCellRender="{ current }">
      <div v-if="getMonthData(current)" class="notes-month">
        <section>{{ getMonthData(current) }}</section>
        <span>节课</span>
      </div>
    </template>
  </Calendar>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { Calendar, Badge, Popover } from 'ant-design-vue';
  import { calendarSchema } from '@/views/competitionManagement/competitionSchedule/account.data';
  import { badgeColors } from '@/views/teacherInformationManagement/teacherSchedule/account.data';
  import { getCourseSchedule } from '@/api/courseInformationManagement/courseInformationManagement';
  import { QueryCourseScheduleParams } from '@/api/courseInformationManagement/model/courseSchedule';

  defineOptions({ name: 'CourseCalendar' });

  const value = ref<Dayjs>();

  const monthCalendar = ref({});
  const yearCalendar = ref([]);

  const currentYear = ref('');
  const currentMonth = ref('');
  const calendarMode = ref('month');

  currentYear.value = String(dayjs().year());
  currentMonth.value = String(dayjs().month() + 1);

  const queryParams: QueryCourseScheduleParams = {
    courseYear: currentYear.value,
    courseMonth: currentMonth.value,
  };

  // 切换年月
  // onSelect onPanelChange
  function onPanelChange(value, mode) {
    currentYear.value = String(dayjs(value).year());
    currentMonth.value = String(dayjs(value).month() + 1);
    calendarMode.value = mode;

    if (mode == 'month') {
      const changeParams: QueryCourseScheduleParams = {
        courseYear: currentYear.value,
        courseMonth: currentMonth.value,
      };
      getCalendarData(changeParams);
    }
    if (mode == 'year') {
      const changeParams: QueryCourseScheduleParams = {
        courseYear: currentYear.value,
        courseMonth: '',
      };
      getYearCalendarData(changeParams);
    }
  }

  async function getCalendarData(params: QueryCourseScheduleParams) {
    const tempCalendarSchema = JSON.parse(JSON.stringify(calendarSchema));
    const items = await getCourseSchedule(params);
    console.log('items is ', items);
    items.forEach((element) => {
      element.content =
        element.courseAddress +
        ' ' +
        element.startTime.substring(11, 16) +
        '-' +
        element.endTime.substring(11, 16) +
        ' ' +
        element.courseName;
      const badgeColorIndex = Math.floor(Math.random() * badgeColors.length);
      element.color = badgeColors[badgeColorIndex];
      const dayIndex = element.startTime.substring(8, 10);
      tempCalendarSchema[dayIndex].push(element);
    });
    monthCalendar.value = tempCalendarSchema;
    // console.log('calendarSchema is ', tempCalendarSchema);
  }

  getCalendarData(queryParams);

  async function getYearCalendarData(params: QueryCourseScheduleParams) {
    // const tempCalendarSchema = JSON.parse(JSON.stringify(calendarSchema));
    const items = await getCourseSchedule(params);
    yearCalendar.value = items as [];
    console.log('yearCalendar is ', yearCalendar.value);
  }

  const getListData = (value: Dayjs) => {
    const monthIndex = value.month() + 1;
    let index: string | number = value.date();
    if (index < 10) {
      index = '0' + index;
    }
    index = '' + index;
    if (monthIndex != Number(currentMonth.value)) {
      return [];
    }
    return monthCalendar.value[index];
  };

  const getMonthData = (value: Dayjs) => {
    // console.log('getMonthData is :  ');
    const monthIndex = value.month();
    const curMonth = yearCalendar.value[monthIndex];
    console.log('curMonth is ', curMonth);
    return curMonth?.count;
  };
</script>
<style scoped>
  .events {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .events .ant-badge-status {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    font-size: 12px;
  }
  .notes-month {
    text-align: center;
    font-size: 28px;
  }
  .notes-month section {
    font-size: 28px;
  }
</style>
