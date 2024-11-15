export const CheckModality = (modality: string) => {
  const t1 = modality.replaceAll('MG', '');
  const t2 = t1.replaceAll(',', '');
  return t2.trim();
};
