import React from 'react';
import Button from './Button';

const ButtonStory = {
  title: 'Button',
  component: Button,
};
export default ButtonStory;

export const Primary = () => <Button varient="primary">Primary</Button>;
export const Secondary = () => <Button varient="secondary">Secondary</Button>;
export const Success = () => <Button varient="success">Success</Button>;
export const Danger = () => <Button varient="danger">Danger</Button>;
