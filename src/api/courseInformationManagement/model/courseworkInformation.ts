export type AddMaterialsInfoParams = {
  materialsId: number;
  teacherId: number;
  courseId: number;
  materialsStyle: string;
  materialsAddress: string;
  materialsTitle: string;
  materialsIntroduce: string;
  materialsDate: string;
  materialsNotes: string | null;
};

export type UpdateMaterialsInfoParams = AddMaterialsInfoParams & {
  materialsId: number;
};

export type QueryMaterialsInfoParams = {
  materialsTitle: string;
  courseName: string;
};
