
import React from 'react';
import Header from '@/components/Header';

const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-center py-8">
          <p className="text-gray-500">Laster bildata...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
