import { PatientData, PatientResponse } from './PatientDB';

//변형형식 토의 필요
export function TransferData(list: PatientResponse[]) {
  const temp: PatientData[] = [];

  for (let i = 0; i < list.length; i++) {
    temp.push({
      sex: list[i].sex,
      age: list[i].age,
      visitDate: list[i].visitDate,
      pid: list[i].pid,
      modality: list[i].modality.split(', '),
    });
  }
  return temp;
}
