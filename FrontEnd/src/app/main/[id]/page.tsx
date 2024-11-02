'use client';
import React from 'react';

type paramsType = {
  params: {
    id: string;
  };
};
export default function page({ params }: paramsType) {
  return <div>{params.id}</div>;
}
