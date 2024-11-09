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
        <span>次赛事</span>
      </div>
    </template>
  </Calendar>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { Calendar, Badge, Popover } from 'ant-design-vue';
  import { getCompetitionSchedule } from '@/api/competitionManagement/competitionManagement';
  import { QueryCompetitionScheduleParams } from '@/api/competitionManagement/model/competitionSchedule';
  import { calendarSchema } from '@/views/competitionManagement/competitionSchedule/account.data';
  import { badgeColors } from '@/views/teacherInformationManagement/teacherSchedule/account.data';

  defineOptions({ name: 'CourseCalendar' });

  const value = ref<Dayjs>();

  const monthCalendar = ref({});
  const yearCalendar = ref([]);

  const currentYear = ref('');
  const currentMonth = ref('');
  const calendarMode = ref('month');

  currentYear.value = String(dayjs().year());
  currentMonth.value = String(dayjs().month() + 1);

  const queryParams: QueryCompetitionScheduleParams = {
    competitionYear: currentYear.value,
    competitionMonth: currentMonth.value,
  };

  // 切换年月
  // onSelect onPanelChange
  function onPanelChange(value, mode) {
    currentYear.value = String(dayjs(value).year());
    currentMonth.value = String(dayjs(value).month() + 1);
    calendarMode.value = mode;

    if (mode == 'month') {
      const changeParams: QueryCompetitionScheduleParams = {
        competitionYear: currentYear.value,
        competitionMonth: currentMonth.value,
      };
      getCalendarData(changeParams);
    }
    // --todolist-- 获取全年的赛事日程表
    if (mode == 'year') {
      const changeParams: QueryCompetitionScheduleParams = {
        competitionYear: currentYear.value,
        competitionMonth: '',
      };
      getYearCalendarData(changeParams);
    }
  }

  async function getCalendarData(params: QueryCompetitionScheduleParams) {
    const tempCalendarSchema = JSON.parse(JSON.stringify(calendarSchema));
    const { items } = await getCompetitionSchedule(params);
    console.log('items is ', items);
    items.forEach((element) => {
      element.content =
        element.competitionName +
        ' ' +
        element.competitionDate.substring(0, 10) +
        ' ' +
        element.introduce;
      const badgeColorIndex = Math.floor(Math.random() * badgeColors.length);
      element.color = badgeColors[badgeColorIndex];
      const dayIndex = element.competitionDate.substring(8, 10);
      tempCalendarSchema[dayIndex].push(element);
    });
    monthCalendar.value = tempCalendarSchema;
    // console.log('calendarSchema is ', tempCalendarSchema);
  }

  getCalendarData(queryParams);

  async function getYearCalendarData(params: QueryCompetitionScheduleParams) {
    // const tempCalendarSchema = JSON.parse(JSON.stringify(calendarSchema));
    const items = await getCompetitionSchedule(params);
    yearCalendar.value = items as [];
    console.log('yearCalendar is ', yearCalendar.value);
  }

  const isCurrentMonth = (value: Dayjs) => {
    return value.month() == dayjs().month();
  };

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
