'use client'
import React, { useState, ReactElement } from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import DivisionCalculator from './Calc';

const Ranks: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState<ReactElement | null>(<DivisionCalculator />);

  const renderComponent = (component: ReactElement) => {
    setCurrentComponent(component);
  };

  return (
    <div className='mt-8 w-full'>
      <div className='lg:flex-row lg:flex-nowrap lg:flex'>
        <Button
          onClick={() => renderComponent(<DivisionCalculator />)}
          className='max-w-[400px] min-w-[170px] max-md:min-w-[200px] p-2 bg-transparent border-white border-[1px] border-solid text-white text-lg whitespace-nowrap '
        >
          Divisions
        </Button>
        <Tooltip color='foreground' content='Coming Soon'>
          <button className='max-w-[400px] min-w-[170px] max-md:min-w-[200px] p-2 mx-10 max-md:mx-0 cursor-default opacity-40 text-white border-white border-[1px] rounded-lg whitespace-nowrap max-md:my-3'>
            Placements
          </button>
        </Tooltip>
        <Tooltip color='foreground' content='Coming Soon'>
          <button className='max-w-[400px] min-w-[170px] max-md:min-w-[200px] p-2  cursor-default opacity-40 text-white border-white border-[1px] rounded-lg whitespace-nowrap'>
            Net Wins
          </button>
        </Tooltip>
      </div>
      <div className='w-full mt-5'>{currentComponent}</div>
    </div>
  );
};

export default Ranks;
