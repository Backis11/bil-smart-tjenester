
import React from 'react';
import { Building2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorkshopSearch from '@/components/workshop/WorkshopSearch';

const WorkshopDirectory = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Workshop Directory</h1>
          </div>
          <p className="text-gray-600">Find certified workshops in your area</p>
        </div>

        <WorkshopSearch />
      </div>

      <Footer />
    </div>
  );
};

export default WorkshopDirectory;
