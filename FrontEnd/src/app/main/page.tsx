'use client';
import React from 'react';
import CheckIndex from './components/checkIndex';
type paramsType = {
  params: {
    id: string;
  };
};
export default function page({ params }: paramsType) {
  return <CheckIndex id={params.id} />;
}
