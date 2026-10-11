import React from 'react';
import {
  ReactFlow,
  Background,
  MiniMap,
  Controls,
  ConnectionLineType,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './xy-theme.css';

export default function FlowCanvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  nodeTypes,
  onInit,
  children,
}) {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={{
        style: {
          stroke: '#cc6be4',
          strokeWidth: 2,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#cc6be4',
        },
      }}
      connectionLineType={ConnectionLineType.SmoothStep}
      colorMode="dark"
    >
      {children}
      <Background style={{ backgroundColor: '#000000ff' }} />
      <MiniMap
        className="xy-theme__minimap"
        style={{
          backgroundColor: '#0c0c0c',
          border: '1px solid #333c4d',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
        nodeColor={(node) => {
          if (node.type === 'workflow') return '#e40b7f';
          const label = node.data?.label?.toLowerCase();
          if (label === 'planning') return '#e40b7f';
          if (label === 'design') return '#6b8cff';
          if (label === 'implementation') return '#4cd964';
          if (label === 'testing') return '#ffcc00';
          if (label === 'deployment') return '#ff9500';
          if (label === 'maintenance') return '#5ac8fa';
          return '#333c4d';
        }}
        nodeStrokeColor={(node) => {
          const color = node.type === 'workflow' ? '#cc6be4' : '#848c94';
          return node.selected ? '#e40b7f' : color;
        }}
        nodeBorderRadius={4}
        maskColor="rgba(228, 11, 127, 0.2)"
        maskStrokeColor="#e40b7f"
        maskStrokeWidth={2}
        position="bottom-right"
      />
      <Controls />
    </ReactFlow>
  );
}

