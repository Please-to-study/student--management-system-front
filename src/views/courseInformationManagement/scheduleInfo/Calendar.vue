<template>
  <Calendar v-model:value="value">
    <template #dateCellRender="{ current }">
      <div v-if="isCurrentMonth(current)">
        <ul class="events">
          <li v-for="item in getListData(current)" :key="item.content">
            <Badge :status="item.type" :text="item.content" />
          </li>
        </ul>
      </div>
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

  defineOptions({ name: 'CourseCalendar' });

  const value = ref<Dayjs>();

  console.log('value is :  ', value);

  const isCurrentMonth = (value: Dayjs) => {
    return value.month() == dayjs().month();
  };

  const getListData = (value: Dayjs) => {
    let listData;
    // eslint-disable-next-line no-debugger
    // debugger;
    // console.log("dayjs", value.date());
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  };

  const getMonthData = (value: Dayjs) => {
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
