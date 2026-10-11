import React, { useState } from 'react';
import {
  BiSolidObjectsVerticalTop,
  BiSolidObjectsHorizontalLeft,
  BiSolidObjectsHorizontalRight,
  BiSolidObjectsVerticalBottom,
} from 'react-icons/bi';

export default function FlowSidebar({
  onAddNode,
  onLayout,
  onPhaseFilter,
  currentPhase,
}) {
  const [label, setLabel] = useState('');
  const [phase, setPhase] = useState('');
  const [details, setDetails] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!label.trim()) return;

    onAddNode({
      label: label.trim(),
      phase: phase.trim(),
      details: details.trim(),
    });

    setLabel('');
    setPhase('');
    setDetails('');
  };

  const phases = [
    { id: 'planning', name: 'Planning' },
    { id: 'design', name: 'Design' },
    { id: 'implementation', name: 'Implementation' },
    { id: 'testing', name: 'Testing' },
    { id: 'deployment', name: 'Deployment' },
    { id: 'maintenance', name: 'Maintenance' },
  ];

  return (
    <div className="z-10 flex flex-col gap-2 w-full md:w-[320px] p-4 bg-[#111] border-l border-gray-800 h-full overflow-y-auto">
      {/* Add node form */}
      <div className="text-base font-semibold text-gray-200 mt-1 mb-2">
        Add Custom Node
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="mb-6 p-3 rounded-lg border border-gray-800 bg-[#161616] shadow-lg flex flex-col gap-2"
      >
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Enter node name"
          required
          className="w-full bg-[#1D1D1D] border border-gray-700 focus:border-purple-500 rounded p-2 text-sm text-gray-200 outline-none transition-colors"
        />
        <input
          type="text"
          value={phase}
          onChange={(e) => setPhase(e.target.value)}
          placeholder="Enter phase (e.g. planning)"
          className="w-full bg-[#1D1D1D] border border-gray-700 focus:border-purple-500 rounded p-2 text-sm text-gray-200 outline-none transition-colors"
        />
        <textarea
          rows="2"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Enter node details..."
          className="w-full bg-[#1D1D1D] border border-gray-700 focus:border-purple-500 rounded p-2 text-sm text-gray-200 outline-none transition-colors resize-none"
        />
        <button
          type="submit"
          className="w-full py-2 px-3 rounded bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all duration-200 shadow hover:shadow-purple-500/25 active:scale-95"
        >
          Add Node
        </button>
      </form>

      {/* Layout Direction */}
      <div className="mb-6">
        <div className="text-base font-semibold text-gray-200 mb-2">
          Layout Direction
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button
            title="Top to Bottom"
            className="flex items-center justify-center p-2 rounded bg-[#161616] hover:bg-purple-900/40 border border-gray-800 hover:border-purple-500 text-gray-200 transition-colors"
            onClick={() => onLayout('TB')}
          >
            <BiSolidObjectsVerticalTop size={20} />
          </button>
          <button
            title="Left to Right"
            className="flex items-center justify-center p-2 rounded bg-[#161616] hover:bg-purple-900/40 border border-gray-800 hover:border-purple-500 text-gray-200 transition-colors"
            onClick={() => onLayout('LR')}
          >
            <BiSolidObjectsHorizontalLeft size={20} />
          </button>
          <button
            title="Right to Left"
            className="flex items-center justify-center p-2 rounded bg-[#161616] hover:bg-purple-900/40 border border-gray-800 hover:border-purple-500 text-gray-200 transition-colors"
            onClick={() => onLayout('RL')}
          >
            <BiSolidObjectsHorizontalRight size={20} />
          </button>
          <button
            title="Bottom to Top"
            className="flex items-center justify-center p-2 rounded bg-[#161616] hover:bg-purple-900/40 border border-gray-800 hover:border-purple-500 text-gray-200 transition-colors"
            onClick={() => onLayout('BT')}
          >
            <BiSolidObjectsVerticalBottom size={20} />
          </button>
        </div>
      </div>

      {/* Phase Flow Filter */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-base font-semibold text-gray-200">
            Phase Flow Filter
          </div>
          {currentPhase && (
            <button
              onClick={() => onPhaseFilter(null)}
              className="text-xs text-purple-400 hover:text-purple-300 underline"
            >
              Reset
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {phases.map((p) => {
            const isActive = currentPhase === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onPhaseFilter(isActive ? null : p.id)}
                className={`py-2 px-2.5 rounded text-xs font-medium border text-center transition-all ${
                  isActive
                    ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                    : 'bg-[#161616] border-gray-800 text-gray-300 hover:bg-purple-950/30 hover:border-purple-500'
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

