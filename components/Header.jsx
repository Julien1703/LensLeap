import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import React, { Children } from 'react';
import { Link } from 'lucide-react';

export default function Header({ title, children }) {
  return (
    <div className='w-full h-24 bg-gray-900 flex items-center justify-between px-8'>
      <h1 className="text-white text-3xl font-bold">{title}</h1>
      <div className='flex space-x-4'>
        {children}
      </div>
    </div>
  );
}
