<template>
  <Calendar v-model:value="value" @panel-change="onPanelChange">
    <template #dateCellRender="{ current }">
      <ul class="events">
        <li v-for="item in getListData(current)" :key="item.content">
          <Badge :status="item.type" :text="item.competitionName" />
          <Badge :status="item.type" :text="item.competitionDate" />
          <Badge :status="item.type" :text="item.introduce" />
        </li>
      </ul>
    </template>
    <template #monthCellRender="{ current }">
      <div v-if="getMonthData(current)" class="notes-month">
        <section>{{ getMonthData(current) }}</section>
        <span>Backlog number</span>
      </div>
    </template>
  </Calendar>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { Calendar, Badge } from 'ant-design-vue';
  import { getCompetitionSchedule } from '@/api/competitionManagement/competitionManagement';
  import { QueryCompetitionScheduleParams } from '@/api/competitionManagement/model/competitionSchedule';
  import { calendarSchema } from '@/views/competitionManagement/competitionSchedule/account.data';

  defineOptions({ name: 'CourseCalendar' });

  const value = ref<Dayjs>();

  const calendar = ref({});

  const currentYear = dayjs().year();
  const currentMonth = dayjs().month() + 1;

  const queryParams: QueryCompetitionScheduleParams = {
    competitionYear: String(currentYear),
    competitionMonth: String(currentMonth),
  };

  // 切换年月
  // onSelect onPanelChange
  function onPanelChange(value, mode) {
    console.log('onPanelChange mode is :  ', mode);
    const changeYear = dayjs(value).year();
    const changeMonth = dayjs(value).month() + 1;

    if (mode == 'month') {
      const changeParams: QueryCompetitionScheduleParams = {
        competitionYear: String(changeYear),
        competitionMonth: String(changeMonth),
      };
      console.log('mode is month :  ', changeParams);
      getCalendarData(changeParams);
    }
    // --todolist-- 获取全年的赛事日程表
    if (mode == 'year') {
      const changeParams: QueryCompetitionScheduleParams = {
        competitionYear: String(changeYear),
        competitionMonth: '',
      };
      console.log('mode is year :  ', changeParams);
    }
  }

  // function onPanelChange(value) {}

  async function getCalendarData(params: QueryCompetitionScheduleParams) {
    const tempCalendarSchema = JSON.parse(JSON.stringify(calendarSchema));
    const { items } = await getCompetitionSchedule(params);
    // console.log('result is ', items);
    items.forEach((element) => {
      const dayIndex = element.competitionDate.substring(8, 10);
      tempCalendarSchema[dayIndex].push(element);
    });
    calendar.value = tempCalendarSchema;
    // console.log('calendarSchema is ', tempCalendarSchema);
  }

  getCalendarData(queryParams);

  const isCurrentMonth = (value: Dayjs) => {
    return value.month() == dayjs().month();
  };

  const getListData = (value: Dayjs) => {
    let index: string | number = value.date();
    if (index < 10) {
      index = '0' + index;
    }
    index = '' + index;
    // console.log('calendar.value is ', calendar.value);
    return calendar.value[index] || [];
  };

  const getMonthData = (value: Dayjs) => {
    // console.log('getMonthData is :  ');
    if (value.month() === 8) {
      return 1394;
    }
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
