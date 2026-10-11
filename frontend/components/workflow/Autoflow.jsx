import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useNodesState, useEdgesState, addEdge, ConnectionLineType } from '@xyflow/react';
import PhaseNode from './PhaseNode';
import ExpandableNode from './Expandable';
import WorkflowNode from './WorkflowNode';
import FlowCanvas from './FlowCanvas';
import FlowSidebar from './FlowSidebar';
import FlowToolbar from './FlowToolbar';
import { getLayoutedElements } from './layoutUtils';

const nodeTypes = {
  phase: PhaseNode,
  expandable: ExpandableNode,
  workflow: WorkflowNode,
};

export default function AutoFlow({ initialEdges = [], initialNodes = [] }) {
  const [nodeSizes, setNodeSizes] = useState({});
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [phase, setPhase] = useState(null);

  const reactFlowInstance = useRef(null);
  const hasInitialLayout = useRef(false);
  const allNodes = useRef(initialNodes);
  const allEdges = useRef(initialEdges);

  // Sync refs if initial nodes/edges change
  useEffect(() => {
    allNodes.current = initialNodes;
    allEdges.current = initialEdges;
    setNodes(initialNodes);
    setEdges(initialEdges);
    hasInitialLayout.current = false;
  }, [initialNodes, initialEdges]);

  // Measure node sizes on mount
  useEffect(() => {
    const sizes = {};
    initialNodes.forEach((node) => {
      const el = document.querySelector(`[data-id="${node.id}"]`);
      if (el) {
        const rect = el.getBoundingClientRect();
        sizes[node.id] = { width: rect.width || 150, height: rect.height || 50 };
      }
    });
    setNodeSizes(sizes);
  }, [initialNodes]);

  // Initial layout when node sizes are ready
  useEffect(() => {
    if (initialNodes.length > 0 && !hasInitialLayout.current) {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        initialNodes,
        initialEdges,
        nodeSizes,
        'TB'
      );
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      hasInitialLayout.current = true;

      setTimeout(() => {
        if (reactFlowInstance.current) {
          reactFlowInstance.current.fitView({ duration: 800, padding: 0.15 });
        }
      }, 100);
    }
  }, [nodeSizes, initialNodes, initialEdges, setNodes, setEdges]);

  const onInit = useCallback((instance) => {
    reactFlowInstance.current = instance;
    setTimeout(() => {
      instance.fitView({ duration: 600, padding: 0.15 });
    }, 150);
  }, []);

  const onConnect = useCallback(
    (params) => {
      const newEdge = { ...params, type: ConnectionLineType.SmoothStep, animated: true };
      setEdges((eds) => {
        const updated = addEdge(newEdge, eds);
        allEdges.current = updated;
        return updated;
      });
    },
    [setEdges]
  );

  const handleLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        nodeSizes,
        direction
      );
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);

      setTimeout(() => {
        if (reactFlowInstance.current) {
          reactFlowInstance.current.fitView({ duration: 800, padding: 0.15 });
        }
      }, 100);
    },
    [nodes, edges, nodeSizes, setNodes, setEdges]
  );

  const handleAddNode = useCallback(
    ({ label, phase, details }) => {
      const newNode = {
        id: `node-${Date.now()}`,
        data: {
          label,
          details,
          tools: [],
          design: [],
          features: [],
          phase,
        },
        position: {
          x: Math.random() * 300 + 100,
          y: Math.random() * 300 + 100,
        },
        type: 'expandable',
        style: {
          width: 200,
          height: 50,
          backgroundColor: '#333c4d',
          border: '2px solid #e40b7f',
        },
      };

      const updated = [...nodes, newNode];
      setNodes(updated);
      allNodes.current = updated;
    },
    [nodes, setNodes]
  );

  const handlePhaseFilter = useCallback(
    (selectedPhase) => {
      let filteredNodes = [];
      let filteredEdges = [];

      if (!selectedPhase) {
        filteredNodes = allNodes.current;
        filteredEdges = allEdges.current;
      } else {
        filteredNodes = allNodes.current.filter((node) => node.phase === selectedPhase);
        const visibleNodeIds = new Set(filteredNodes.map((node) => node.id));
        filteredEdges = allEdges.current.filter(
          (edge) =>
            edge.phase === selectedPhase &&
            visibleNodeIds.has(edge.source) &&
            visibleNodeIds.has(edge.target)
        );
      }

      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        filteredNodes,
        filteredEdges,
        nodeSizes,
        'TB'
      );

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      setPhase(selectedPhase);

      setTimeout(() => {
        if (reactFlowInstance.current) {
          reactFlowInstance.current.fitView({ duration: 800, padding: 0.15 });
        }
      }, 100);
    },
    [nodeSizes, setNodes, setEdges]
  );

  const handleResetLayout = () => {
    handleLayout('TB');
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row relative overflow-hidden bg-black">
      <div className="flex-1 h-full relative">
        <FlowCanvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onInit={onInit}
        >
          <FlowToolbar onResetLayout={handleResetLayout} />
        </FlowCanvas>
      </div>

      <FlowSidebar
        onAddNode={handleAddNode}
        onLayout={handleLayout}
        onPhaseFilter={handlePhaseFilter}
        currentPhase={phase}
      />
    </div>
  );
}
