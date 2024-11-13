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
    boxX1: number;
    boxY1: number;
    boxX2: number;
    boxY2: number;
    width: number;
    height: number;
    centerX: number;
    centerY: number;
    confidence: number;
  };
}
