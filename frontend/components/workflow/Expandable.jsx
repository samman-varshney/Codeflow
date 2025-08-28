import React, { useState, useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

const ExpandableNode = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const renderTable = (tableName, tableData) => {
    if (!tableData || !Array.isArray(tableData) || tableData.length === 0) return null;

    const headers = Object.keys(tableData[0]);

    return (
      <div className="mt-4">
        <h3 className="text-lg text-[#cc6be4] font-semibold mb-2 pl-2 border-l-4 border-[#cc6be4]">{tableName}</h3>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#333c4d]">
                {headers.map(header => (
                  <th key={header} className="px-4 py-2 text-left text-xs font-medium uppercase text-[#dededf] min-w-[200px]">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-[#333c4d]/40' : 'bg-[#333c4d]/20'}>
                  {headers.map(header => (
                    <td key={header} className="px-4 py-2 text-sm text-[#dededf]">
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="relative transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#e40b7f]/40">
      {/* Node body */}
      <div 
        className="flex items-center justify-center rounded-lg cursor-pointer"
        style={{
          width: '200px',
          height: '50px',
          backgroundColor: '#333c4d',
          border: '2px solid #e40b7f',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
        onClick={toggleExpand}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3"
          style={{ backgroundColor: '#cc6be4' }}
        />
        
        <div className="text-sm font-medium truncate px-2 text-[#dededf]">
          {data.label || 'Unnamed Stage'}
        </div>
        
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3"
          style={{ backgroundColor: '#cc6be4' }}
        />
      </div>

      {/* Expandable detail panel */}
      {isExpanded && (
        <div 
          className="absolute z-10 p-6 rounded-lg shadow-xl"
          style={{
            width: '500px',
            backgroundColor: '#0c0c0c',
            border: '2px solid #e40b7f',
            top: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <button 
            onClick={toggleExpand}
            className="absolute top-3 right-3 text-lg font-bold rounded-full w-7 h-7 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-[#e40b7f]/90"
            style={{ backgroundColor: '#e40b7f', color: '#dededf' }}
          >
            ×
          </button>
          
          <h2 className="text-xl font-bold mb-4 text-[#e40b7f]">{data.label}</h2>
          
          {/* Details Section */}
          {data.details && (
            <div className="mb-4">
              <h3 className="text-lg text-[#cc6be4] font-semibold mb-2 pl-2 border-l-4 border-[#cc6be4]">Details</h3>
              <p className="text-sm text-[#dededf]">{data.details}</p>
            </div>
          )}
          
          {/* Tools Section */}
          {data.tools && data.tools.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg text-[#cc6be4] font-semibold mb-2 pl-2 border-l-4 border-[#cc6be4]">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {data.tools.map((tool, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{backgroundColor: '#333c4d', color: '#dededf'}}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Table Section */}
          {renderTable('Design', data.design)}

          {/* Features Section */}
          {renderTable('Features', data.features)}
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default ExpandableNode;