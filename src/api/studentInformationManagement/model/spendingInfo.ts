export type AddPayInfoParams = {
  courseCategoryId: number;
  studentId: number;
  payeeId: number;
  courseNumber: number;
  courseFee: number;
  otherFee: number;
  payPreferential: number;
  payableFee: number;
  actuallyFee: number;
  payStyle: string;
  payNotes: string | null;
};

export type QueryPayInfoParams = {
  studentNumber: string;
  studentId: number;
  courseCategoryId: number;
};
