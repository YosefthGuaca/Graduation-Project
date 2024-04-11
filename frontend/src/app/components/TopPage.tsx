import React from 'react';
import Image from 'next/image';

type Props = {};

const TopPage = (props: Props) => {
  return (
    <div className="grid content-center justify-center h-screen">
      <h1>
        <Image src="/UxShowGo.gif" alt="UxShowGo" width={576} height={324} />
      </h1>
    </div>
  );
};

export default TopPage;
