export interface courseItem {
  id: number;
  begin: number;
  end: number;
  week: number;
  name: string;
  week_begin: number;
  week_end: number; //只在第8周有课
  place: string;
  teacher: string;
}
