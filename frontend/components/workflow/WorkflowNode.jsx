import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Workflow } from "lucide-react";

function WorkflowNode({ data }) {
  return (
    <div 
      className="relative rounded-xl p-5 flex flex-col items-center justify-center transition-all duration-300 hover:scale-102"
      style={{
        width: '280px',
        minHeight: '120px',
        backgroundColor: '#0c0c0c',
        border: '3px solid #e40b7f',
        boxShadow: '0 12px 30px rgba(228, 11, 127, 0.4)',
      }}
    >
      {/* Main Icon */}
      <div 
        className="mb-3 p-3 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: 'rgba(228, 11, 127, 0.15)',
          boxShadow: '0 0 20px rgba(228, 11, 127, 0.6)'
        }}
      >
        <Workflow className="w-8 h-8" style={{ color: '#e40b7f' }} />
      </div>

      {/* Label */}
      <h3 
        className="text-xl font-bold text-center px-3 mb-1"
        style={{ 
          color: '#dededf',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
        }}
      >
        {data.label}
      </h3>

      {/* Optional description */}
      {data.description && (
        <p 
          className="text-sm text-center px-2 mt-1"
          style={{ color: '#848c94' }}
        >
          {data.description}
        </p>
      )}

      {/* Decorative elements */}
      <div 
        className="absolute top-2 left-2 w-3 h-3 rounded-full"
        style={{
          backgroundColor: '#cc6be4',
          boxShadow: '0 0 10px #cc6be4'
        }}
      ></div>
      <div 
        className="absolute bottom-2 right-2 w-3 h-3 rounded-full"
        style={{
          backgroundColor: '#cc6be4',
          boxShadow: '0 0 10px #cc6be4'
        }}
      ></div>

      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 rounded-xl -z-10 opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, #e40b7f 0%, transparent 40%),
                            radial-gradient(circle at 80% 80%, #cc6be4 0%, transparent 40%)`
        }}
      ></div>

      {/* Handles - positioned for connecting to phase nodes */}

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-5 h-5"
        id="main-output"
        style={{ 
          backgroundColor: '#e40b7f',
          border: '2px solid #0c0c0c',
          boxShadow: '0 0 12px rgba(228, 11, 127, 0.9)'
        }}
      />
      
      {/* Additional handles for connecting multiple phases */}


    </div>
  );
}

export default WorkflowNode;