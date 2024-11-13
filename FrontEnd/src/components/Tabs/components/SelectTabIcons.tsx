import React from 'react';
import Default from '../../../assets/images/logo.svg';
import Cxr from '../../../assets/images/cxr.svg';
import Capsule from '../../../assets/images/capsule.svg';

type Props = {
  logoType?: string;
  className?: string;
};
export default function SelectTabIcons({ logoType, className }: Props) {
  if (logoType === 'MG') return <Default className={className} />;
  if (logoType === 'CT') return <Capsule className={className} />;
  if (logoType === 'CXR') return <Cxr className={className} />;
}
