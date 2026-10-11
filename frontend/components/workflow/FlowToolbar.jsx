import React from 'react';
import { Panel, useReactFlow } from '@xyflow/react';
import DownloadButton from './DownloadButton';
import { RotateCcw } from 'lucide-react';

export default function FlowToolbar({ onResetLayout }) {
  const { fitView } = useReactFlow();

  const handleReset = () => {
    if (onResetLayout) {
      onResetLayout();
    } else {
      fitView({ duration: 600, padding: 0.15 });
    }
  };

  return (
    <Panel position="top-left" className="flex items-center gap-2 bg-[#161616]/90 p-1.5 rounded-lg border border-gray-800 shadow-xl backdrop-blur-sm">
      <DownloadButton />
      <button
        onClick={handleReset}
        title="Reset & Center View"
        className="p-2 text-gray-300 hover:text-purple-400 hover:bg-[#1D1D1D] rounded transition-colors"
      >
        <RotateCcw size={18} />
      </button>
    </Panel>
  );
}

