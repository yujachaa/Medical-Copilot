import React from 'react';
import colors from '../styles/colors';
import styles from './ColorPalette.module.scss';

const ColorPalette: React.FC = () => {
  const copyToClipboard = (colorName: string) => {
    const formattedName = `$${colorName}`; // $ 기호 붙이기
    navigator.clipboard
      .writeText(formattedName) // 클립보드에 복사
      .then(() => {
        alert(`${formattedName} copied to clipboard!`); // 성공 메시지
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className={styles.container}>
      {Object.entries(colors).map(([name, color]) => (
        <div
          key={name}
          className={styles.box}
          onClick={() => copyToClipboard(name)}
        >
          <div
            style={{
              width: '150px',
              height: '150px',
              backgroundColor: color,
              borderRadius: '8px',
              border: '1px solid black',
            }}
          />
          <p>
            {name} <br /> {color}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;
