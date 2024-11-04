import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-row">
        <div>{children}</div>
      </div>
    </>
  );
}
