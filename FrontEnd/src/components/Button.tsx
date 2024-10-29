import React from 'react';
import './Button.css';
type Props = {
  varient: string; // 기본값을 설정했으므로 optional로 지정
  children: string;
};

export default function Button({
  varient = 'primary', // 기본값 설정
  children,
}: Props) {
  return <button className={`button ${varient}`}>{children}</button>;
}
