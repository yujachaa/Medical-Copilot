import React from 'react';
import Default from '../../../assets/images/logo.svg';
import Cxr from '../../../assets/images/cxr.svg';
import Capsule from '../../../assets/images/capsule.svg';
import { PluginType } from '../Tab';

type Props ={
  logoType: PluginType;
  w? : string;
  h? : string;
}
export default function SelectTabIcons({logoType,w='8',h='8'} : Props) {
  if (logoType === 'default') return <Default className={`w-${w} h-${h}`} />;
  if (logoType === 'capsule') return <Capsule className={`w-${w} h-${h}`} />;
  if (logoType === 'cxr') return <Cxr className={`w-${w} h-${h}`} />;
}
