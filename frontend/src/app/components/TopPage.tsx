import React from 'react';
import Image from 'next/image';
import 'frontend/src/app/globals.css'; 

const TopPage: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen text-black">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="circle absolute" style={{ top: '15%', right: '10%' }}></div>
        <div className="circle absolute" style={{ top: '55%', right: '30%' }}></div>
        <div className="circle absolute" style={{ top: '30%', right: '5%' }}></div>
        <div className="circle absolute" style={{ top: '50%', right: '10%' }}></div>
        <div className="circle absolute" style={{ top: '10%', right: '30%' }}></div>
      </div>
      <div className="flex items-center justify-center h-screen relative z-50 px-3 mb-3">
        <Image src="/UxShowGo.gif" alt="UxShowGo" width={576} height={324} />
        <h2 className="text-3xl font-semibold px-20 mb-6">Fast & easy UX <br />portfolio building</h2>
      </div>

      <div className="py-20 relative z-10 bg-black">
        <div className="container mx-auto px-6 ">
          <h2 className="text-3xl font-semibold mb-8 text-white">Features made for UX professionals</h2>
        </div>
      </div>
    </div>
  );
};

export default TopPage;
