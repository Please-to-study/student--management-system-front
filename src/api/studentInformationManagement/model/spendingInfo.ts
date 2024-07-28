export type AddSpendingInfoParams = {
  courseId: string;
  studentName: string;
  studentPhone: string;
  payPrice: number;
  courseTime: number;
  payPreferential: number | null;
  otherFee: number;
  payableFee: number | null;
  actuallyPay: number | null;
  payStyle: string;
  payee: string;
  payNotes: string | null;
};

export type QuerySpendingInfoParams = {
  studentNumber?: string | null;
  studentName?: string | null;
  courseName?: string | null;
};
