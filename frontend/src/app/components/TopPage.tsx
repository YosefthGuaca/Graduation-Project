import React from 'react';
import Image from 'next/image';
import 'frontend/src/app/globals.css'; 

type Props = {};
const TopPage = (props: Props) => {
  return (
    <div className="grid content-center justify-center h-screen">
            <div className="circle absolute" style={{ top: '15%', right: '10%' }}></div>
        <div className="circle absolute" style={{ top: '55%', right: '30%' }}></div>
        <div className="circle absolute" style={{ top: '30%', right: '5%' }}></div>
        <div className="circle absolute" style={{ top: '50%', right: '10%' }}></div>
        <div className="circle absolute" style={{ top: '10%', right: '30%' }}></div>
        <div className="flex items-center justify-center h-screen relative z-50 px-3 mb-3">
        <Image src="/UxShowGo.gif" alt="UxShowGo" width={576} height={324} />
        <h2 className="text-3xl font-semibold px-20 mb-6">Fast & easy UX <br />portfolio building</h2>
      </div>
        {/* <div className="container mx-auto px-6 ">
          <h2 className="text-3xl font-semibold mb-8 text-black">Features made for UX professionals</h2>
        </div> */}

    </div>
  );
};
export default TopPage;

