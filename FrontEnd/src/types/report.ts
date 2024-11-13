export interface CoordinatesGroup {
  points: { x: number; y: number }[];
}

export interface ReportDataType {
  id: string;
  pid: string;
  imageUrl: string;
  createDate: string;
  modifiedDate: string;
  chatId: string | null;
  memberId: string;
  shootingDate: string;
  sex: 'MALE' | 'FEMALE' | null;
  age: number;
  disease: string | null;
  location: string;
  size: string;
  symptoms: string;
  summary: string;
  detection: {
    Box_X1: number;
    Box_X2: number;
    Box_Y1: number;
    Box_Y2: number;
    Width: number;
    Height: number;
    Center_x: number;
    Center_y: number;
    Confidence: number;
  };
}
