import React from 'react';
import Default from '../../../assets/images/logo.svg';
import Cxr from '../../../assets/images/cxr.svg';
import Capsule from '../../../assets/images/capsule.svg';
import { PluginType } from '../Tab';
export default function SelectTabIcons(logoType: PluginType) {
  if (logoType === 'default') return <Default className="w-5 h-5" />;
  if (logoType === 'capsule') return <Capsule className="w-5 h-5" />;
  if (logoType === 'cxr') return <Cxr className="w-5 h-5" />;
}
