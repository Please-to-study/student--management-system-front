<!--
 * @Author: Smile1k
 * @Date: 2023-11-20 09:27:21
 * @LastEditTime: 2023-11-20 17:55:12
 * @Description: Do Something
-->
<template>
  <div class="curriculum-component-wrapper flex-col">
    <div class="header flex-c">
      <span class="pre btn" @click="changeWeek(0)">上一周</span>
      <span class="time flex-c">第 {{ currendWeekIdx + 1 }} 周 ({{ formatterTime }})</span>
      <span class="next btn" @click="changeWeek(1)">下一周</span>
    </div>
    <div class="week flex">
      <span class="month flex-c">
        <span class="time-span">星期</span>
        <span class="week-span">时间</span>
      </span>
      <ul class="week-list flex">
        <li
          v-for="(item, idx) in weekList"
          :key="idx"
          class="flex-col week-item"
          :class="item.isToday ? 'isActive' : ''"
        >
          <span>{{ item.week }}</span>
          <span class="date">{{ item.date }}</span>
        </li>
      </ul>
    </div>
    <!-- 课表 -->
    <div class="curriculum-content flex-b">
      <div class="left-time flex">
        <div class="left flex-col">
          <div class="morning half">上午</div>
          <div class="divider"></div>
          <div class="afternoon half">下午</div>
        </div>
        <div class="time flex-col">
          <div class="top">
            <span
              class="time-box flex-col"
              v-for="(item, idx) in morningList"
              :class="idx == morningList.length - 1 ? 'last' : ''"
            >
              <span>{{ item.time.split('~')[0] }}</span>
              <span v-if="item">~</span>
              <span>{{ item.time.split('~')[1] }}</span>
            </span>
          </div>
          <div class="divider"></div>
          <div class="bottom">
            <span
              class="time-box flex-col"
              v-for="(item, idx) in afternoonList"
              :class="idx == afternoonList.length - 1 ? 'last' : ''"
            >
              <span>{{ item.time.split('~')[0] }}</span>
              <span v-if="item">~</span>
              <span>{{ item.time.split('~')[1] }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="right-content flex">
        <li v-for="(item, idx) in curWeekData" :key="idx" class="week-item flex-col">
          <div class="top flex-col">
            <span
              v-for="ihook in formatterList(item.classList, 'morning')"
              :style="{
                top: ihook.startIdx * topPix + '%',
                height: (ihook.endIdx - ihook.startIdx) * topPix + '%',
              }"
              @click="chooseItem(ihook)"
              class="course-item"
            >
              <em class="course-box">{{ ihook.name }}</em>
            </span>
          </div>
          <div class="divider"></div>
          <div class="bottom">
            <span
              v-for="ihook in formatterList(item.classList, 'afternoon')"
              :style="{
                top: ihook.startIdx * botPix + '%',
                height: (ihook.endIdx - ihook.startIdx) * botPix + '%',
              }"
              @click="chooseItem(ihook)"
              class="course-item"
            >
              <em class="course-box">{{ ihook.name }}</em>
            </span>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps, computed, onMounted, defineEmits } from 'vue';
  import moment from 'moment';

  interface timeItem {
    time: string;
    type: 0 | 1;
    [key: string]: any;
  }

  interface dataItem {
    date: string;
    classList: Array<classItem>;
    [key: string]: any;
  }

  interface classItem {
    name: string;
    start: string;
    end: string;
    [key: string]: any;
  }

  const props = defineProps({
    timeList: {
      type: Array as () => timeItem[],
      default: () => [],
    },
    dataList: {
      type: Array as () => dataItem[],
      default: () => [],
    },
    currentDate: {
      type: [String, Number],
      default: moment().format('YYYY-MM-DD'),
    },
  });

  const curYear = computed(() => {
    return moment(props.currentDate).format('YYYY');
  });

  // 上午时间
  const morningList = computed(() => {
    return props.timeList.filter((u: any) => !u.type);
  });

  const topPix = computed(() => {
    return 100 / morningList.value.length;
  });
  // 下午时间
  const afternoonList = computed(() => {
    return props.timeList.filter((u: any) => u.type);
  });
  const botPix = computed(() => {
    return 100 / afternoonList.value.length;
  });

  // 查询的当前周
  const timeRange: any = computed(() => {
    let week: any = monthWeek.value[currendWeekIdx.value];
    return week ? week.list : [];
  });

  // 格式化当前周范围 start ~ end
  const formatterTime = computed(() => {
    return timeRange.value.length
      ? `${timeRange.value[0].date} ~ ${timeRange.value[timeRange.value.length - 1].date}`
      : '';
  });

  // 顶部周一 ~ 周日日期格式化
  const weekList = computed(() => {
    let week = ['一', '二', '三', '四', '五', '六', '日'];
    let dayMap = timeRange.value.reduce((pre: any, cur: any) => {
      pre[cur.day] = cur.date;
      return pre;
    }, {});
    return week.reduce((pre: any, cur: any, idx: number) => {
      pre.push({
        week: `周${cur}`,
        date: dayMap[idx + 1] ? dayMap[idx + 1] : '--',
        isToday: dayMap[idx + 1]
          ? `${curYear.value}/${dayMap[idx + 1]}` == moment().format('YYYY/MM/DD')
            ? true
            : false
          : false,
      });
      return pre;
    }, []);
  });

  const curWeekData = computed(() => {
    let dataMap = props.dataList.reduce((pre: any, cur: any) => {
      pre[cur.date] = cur.classList;
      return pre;
    }, {});
    let data = weekList.value.map((u: any) => {
      u.classList = dataMap[u.date] ? dataMap[u.date] : [];
      return u;
    });
    return data;
  });

  // data
  // 当前是第几周
  const currendWeekIdx = ref(0);

  // 当前月每周的日期list
  const monthWeek = ref([]);

  // methods
  // 判断当前是周几
  const getWeek = (date: any) => {
    const week = moment(date).day();
    switch (week) {
      case 1:
        return '周一';
      case 2:
        return '周二';
      case 3:
        return '周三';
      case 4:
        return '周四';
      case 5:
        return '周五';
      case 6:
        return '周六';
      case 0:
        return '周日';
    }
  };

  // 获取当前月的每周时间
  const getWeekList = (date) => {
    //获取date当月第一天和最后一天
    const monthFirstDay = moment(date).startOf('month').format('YYYY-MM-DD');
    const monthLastDay = moment(date).endOf('month').format('YYYY-MM-DD');

    //获取第一周周日的日期
    const firstWeekEnd = moment(monthFirstDay).day()
      ? moment(monthFirstDay).weekday(7).format('YYYY-MM-DD')
      : monthFirstDay;

    //一周的开始日期和结束日期
    let next = [monthFirstDay, firstWeekEnd];

    let monthWeek: any = [];

    //一周的结束日期没有超出date当月的最后一天就加入数组，如最后一天不是周日就不加入数组
    while (moment(next[1]).isBefore(monthLastDay)) {
      monthWeek.push(next);
      let weekFirstDay = moment(next[1]).add(1, 'd').format('YYYY-MM-DD');
      let weekLastDay = moment(weekFirstDay).weekday(7).format('YYYY-MM-DD');
      next = [weekFirstDay, weekLastDay];
    }

    //判断数组中有没有date当月的最后一天，如没有添加最后一周
    if (monthWeek.some((item: any) => !item.some((child: any) => child === monthLastDay))) {
      monthWeek.push([next[0], monthLastDay]);
    }

    let arr = monthWeek.map((u: any, idx: number) => {
      console.log('u====', u);
      u = {
        list: enumerateDaysBetweenDates(u[0], u[1]),
      };
      return u;
    });

    let today = moment().format('MM/DD');
    arr.map((u: any, idx: number) => {
      u.list.map((v: any) => {
        if (v.date == today) {
          v.isToday = true;
          u.isActive = true;
          currendWeekIdx.value = idx;
        }
      });
    });

    console.log(arr);

    return arr;
  };

  // 获取两个日期之间的所有日期
  const enumerateDaysBetweenDates = (startDate: any, endDate: any) => {
    let daysList = [];
    const start = moment(startDate);
    const end = moment(endDate);
    const day = end.diff(start, 'days');
    daysList.push({
      date: start.format('MM/DD'),
      day: moment(start.format('YYYY-MM-DD')).day() ? moment(start.format('YYYY-MM-DD')).day() : 7,
    });
    for (let i = 1; i <= day; i++) {
      let d = start.add(1, 'd').format('YYYY-MM-DD');
      daysList.push({
        date: moment(d).format('MM/DD'),
        day: moment(d).day() == 0 ? 7 : moment(d).day(),
      });
    }
    return daysList;
  };

  // 格式化返回数据  判断占几行 距离顶部多少
  const initClassList = () => {
    let data = props.dataList;
    let topIdx = 0;
    let botIdx = 0;
    const timeObj = props.timeList.reduce((pre: any, cur: any) => {
      if (!cur.type) topIdx += 1;
      else botIdx += 1;
      pre[cur.time.split('~')[0]] = {
        idx: cur.type ? botIdx : topIdx,
        type: cur.type,
        mode: 'start',
      };
      pre[cur.time.split('~')[1]] = {
        idx: cur.type ? botIdx : topIdx,
        type: cur.type,
        mode: 'end',
      };
      return pre;
    }, {});

    data.map((u: any) => {
      u.classList.map((v: any) => {
        v.startIdx = timeObj[v.start].idx - 1;
        v.type = timeObj[v.start].type;
        v.endIdx = timeObj[v.end].idx;
      });
    });
  };

  // 根据判断是上午还是下午的课程
  const formatterList = (arr: any[], type: string) => {
    if (type == 'morning') {
      return arr.filter((u) => {
        return u.type == 0;
      });
    } else {
      return arr.filter((u) => {
        return u.type;
      });
    }
  };

  // 切换当前周
  const changeWeek = (type: number) => {
    if (!type) {
      if (currendWeekIdx.value > 0) {
        currendWeekIdx.value -= 1;
      }
    } else {
      if (currendWeekIdx.value < monthWeek.value.length - 1) {
        currendWeekIdx.value += 1;
      }
    }
  };

  const emits = defineEmits(['choose']);

  const chooseItem = (item: any) => {
    emits('choose', item);
  };

  onMounted(() => {
    monthWeek.value = getWeekList(props.currentDate);
    initClassList();
  });
</script>

<style lang="scss" scoped>
  $font-lg: 32rpx;
  $font-md: 28rpx;
  $font-sm: 26rpx;
  $font-mini: 24rpx;

  .flex {
    display: flex;
    align-items: center;
  }

  .flex-c {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-b {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }

  page {
    height: 100%;
  }

  .curriculum-component-wrapper {
    flex: 0 0 100%;
    height: 100%;

    width: 100%;
    overflow: hidden;
    .header {
      font-size: $font-sm;
      line-height: 80rpx;
      .time {
        flex: 1;
      }
      .btn {
        flex: 0 0 120rpx;
        text-align: center;
      }
    }
    .week {
      margin: 0 0 0 0;
      border-top: 1px solid #b5b5b5;
      border-bottom: 1px solid #b5b5b5;
      height: 80rpx;
      // padding-bottom: 10rpx;
      .month {
        position: relative;
        flex: 0 0 140rpx;
        width: 140rpx;
        height: 100%;
        font-size: $font-sm;
        border-left: 1px solid #b5b5b5;
        border-right: 1px solid #b5b5b5;
        background: linear-gradient(
          to top right,
          transparent 0%,
          transparent calc(50% - 1px),
          #b5b5b5 50%,
          transparent calc(50% + 1px),
          transparent 100%
        );
        .time-span {
          position: absolute;
          right: 10rpx;
          top: 0;
        }
        .week-span {
          position: absolute;
          left: 10rpx;
          bottom: 0;
        }
      }
      .week-list {
        flex: 1;
        padding: 0;
        margin: 0;
        height: 100%;
        .week-item {
          list-style: none;
          flex: 1;
          font-size: $font-mini;
          align-items: center;
          border-right: 1px solid #b5b5b5;
          height: 100%;
          justify-content: center;
          box-sizing: border-box;
          &.isActive {
            background: #409eff;
            color: #fff;
          }
        }
      }
    }
    .curriculum-content {
      position: relative;
      flex: 1;
      border-left: 1px solid #b5b5b5;
      border-bottom: 1px solid #b5b5b5;
      &::after {
        content: '午\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0休';
        font-size: $font-sm;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .left-time {
        flex: 0 0 140rpx;
        font-size: $font-sm;
        height: 100%;
        justify-content: space-between;
        .left {
          height: 100%;
          flex: 0 0 70rpx;
          .half {
            width: 70rpx;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 1px solid #b5b5b5;
          }
        }
        .time {
          flex: 0 0 70rpx;
          width: 70rpx;
          height: 100%;
          .top,
          .bottom {
            flex: 1;
            display: flex;
            flex-direction: column;
            border-right: 1px solid #b5b5b5;
          }
          .time-box {
            flex: 1;
            text-align: center;
            font-size: $font-mini;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #b5b5b5;
            box-sizing: border-box;
            &.last {
              border: none;
            }
          }
        }
        .divider {
          flex: 0 0 80rpx !important;
          height: 80rpx !important;
          border-top: 1px solid #b5b5b5;
          border-bottom: 1px solid #b5b5b5;
          box-sizing: border-box;
        }
      }
      .right-content {
        flex: 1;
        height: 100%;
        overflow: hidden;
        flex-wrap: nowrap;
        .week-item {
          height: 100%;
          flex: 1;
          list-style: none;
          box-sizing: border-box;
          &:last-child {
            .divider {
              border-right: 1px solid #b5b5b5;
            }
          }
          .divider {
            height: 80rpx;
            background: #fff;
            border-top: 1px solid #b5b5b5;
            border-bottom: 1px solid #b5b5b5;
            box-sizing: border-box;
          }
          .top,
          .bottom {
            position: relative;
            flex: 1;
            border-right: 1px solid #b5b5b5;
            box-sizing: border-box;
            .course-item {
              font-size: 24rpx;
              width: 80%;
              margin: 0 auto;
              text-align: center;
              position: absolute;
              left: 0;
              right: 0;
              z-index: 1;
              .course-box {
                border: 1px solid #409eff;
                border-radius: 10rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                writing-mode: vertical-lr;
                position: absolute;
                top: 10rpx;
                bottom: 10rpx;
                left: 50%;
                transform: translateX(-50%);
                letter-spacing: 8rpx;
                background-size: 50px 50px;
                background-color: #0ae;
                color: #fff;
                background-image: -webkit-linear-gradient(
                  -45deg,
                  rgba(255, 255, 255, 0.2) 25%,
                  transparent 25%,
                  transparent 50%,
                  rgba(255, 255, 255, 0.2) 50%,
                  rgba(255, 255, 255, 0.2) 75%,
                  transparent 75%,
                  transparent
                );
                background-image: linear-gradient(
                  -45deg,
                  rgba(255, 255, 255, 0.2) 25%,
                  transparent 25%,
                  transparent 50%,
                  rgba(255, 255, 255, 0.2) 50%,
                  rgba(255, 255, 255, 0.2) 75%,
                  transparent 75%,
                  transparent
                );
              }
            }
          }
        }
      }
    }
  }
</style>
