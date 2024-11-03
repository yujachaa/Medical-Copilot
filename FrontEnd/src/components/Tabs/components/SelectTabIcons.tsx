import React from 'react';
import Default from '../../../assets/images/logo.svg';
import Cxr from '../../../assets/images/cxr.svg';
import Capsule from '../../../assets/images/capsule.svg';
import { PluginType } from '../Tab';

type Props ={
  logoType: PluginType;
  className?: string;
}
export default function SelectTabIcons({logoType,className} : Props) {
  if (logoType === 'default') return <Default className={className} />;
  if (logoType === 'capsule') return <Capsule className={className} />;
  if (logoType === 'cxr') return <Cxr className={className} />;
}
