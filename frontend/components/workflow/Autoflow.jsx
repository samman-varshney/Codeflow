import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Background,
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  MarkerType
} from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import PhaseNode from './PhaseNode';
import ExpandableNode from "./Expandable";
import WorkflowNode from "./WorkflowNode";
import { BiSolidObjectsVerticalTop, BiSolidObjectsHorizontalLeft, BiSolidObjectsHorizontalRight, BiSolidObjectsVerticalBottom } from 'react-icons/bi';
import { SiApacheairflow } from 'react-icons/si';
const nodeTypes = { phase: PhaseNode, expandable: ExpandableNode, workflow: WorkflowNode };
import "@xyflow/react/dist/style.css";
import './xy-theme.css';
import DownloadButton from "./DownloadButton";
import SaveButton from "./SaveButton";
const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, nodeSizes, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    const size = nodeSizes[node.id] || { width: 150, height: 50 }; // fallback
    dagreGraph.setNode(node.id, size);
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      position: {
        x: nodeWithPosition.x - (nodeSizes[node.id]?.width || 150) / 2,
        y: nodeWithPosition.y - (nodeSizes[node.id]?.height || 50) / 2,
      },
    };
  });

  return { nodes: newNodes, edges };
};

const AutoFlow = ({ initialEdges, initialNodes }) => {
  const [nodeSizes, setNodeSizes] = useState({});
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowInstance = useRef(null);
  const hasInitialLayout = useRef(false);

  // 1️⃣ measure node sizes only once, when DOM is ready
  useEffect(() => {
    const sizes = {};
    initialNodes.forEach((node) => {
      const el = document.querySelector(`[data-id="${node.id}"]`);
      if (el) {
        const rect = el.getBoundingClientRect();
        sizes[node.id] = { width: rect.width, height: rect.height };
      }
    });
    setNodeSizes(sizes);
  }, []); // 👈 run only once after first render

  // 2️⃣ run layout when nodeSizes are available
  useEffect(() => {
    if (Object.keys(nodeSizes).length > 0 && !hasInitialLayout.current) {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        initialNodes, // 👈 use initialNodes, not nodes (prevents infinite loop)
        initialEdges,
        nodeSizes,
        "TB"
      );
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      hasInitialLayout.current = true;

      // Fit view after initial layout
      setTimeout(() => {
        if (reactFlowInstance.current) {
          reactFlowInstance.current.fitView({ duration: 800, padding: 0.15 });
        }
      }, 100);
    }
  }, [nodeSizes]); // 👈 only when nodeSizes is set

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
      ),
    []
  );

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        nodeSizes,
        direction
      );
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);

      // Fit view after layout change
      setTimeout(() => {
        if (reactFlowInstance.current) {
          reactFlowInstance.current.fitView({ duration: 800, padding: 0.15 });
        }
      }, 100);
    },
    [nodes, edges, nodeSizes]
  );
  const handleAddNode = (e) => {
    const label = document.getElementById('node-label').value.trim();
    const details = document.getElementById('node-details').value.trim();
    if (label) {
      const newNode = {
        id: `node-${Date.now()}`, // Better ID using timestamp
        data: {
          label: label,
          // Add any default data properties your expandable nodes need
          details: details,
          tools: [],
          design: [],
          features: []
        },
        position: {
          x: Math.random() * 400, // Random position instead of (0,0)
          y: Math.random() * 400
        },
        type: 'expandable',
        // Add style properties to ensure consistent styling
        style: {
          width: 200,
          height: 50,
          backgroundColor: '#333c4d',
          border: '2px solid #e40b7f',
        }
      };

      setNodes([...nodes, newNode]);

      // Clear the input field after adding
      document.getElementById('node-label').value = '';
      document.getElementById('node-details').value = '';
    }
  };
  const onInit = useCallback((instance) => {
    reactFlowInstance.current = instance;
  }, []);

  return (
    <>
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
            stroke: '#cc6be4', // Your edge color
            strokeWidth: 2,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#cc6be4',
          },
        }}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView={!hasInitialLayout.current} // Let ReactFlow handle initial fitView
        colorMode="dark"
      >
        <Panel position='top-left' className="flex gap-2 justify-center items-center">
          <DownloadButton />
          <SaveButton />
        </Panel>
        <Panel position="top-right" className="xy-theme__panel">
          <button className="download-btn text-[#e40b7f]">
            <SiApacheairflow className="mr-2 hover:animate-spin " size={28} />
          </button>
        </Panel>
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
            // Apply different colors based on node type
            if (node.type === 'workflow') return '#e40b7f';
            if (node.data?.label?.toLowerCase() === 'planning') return '#e40b7f';
            if (node.data?.label?.toLowerCase() === 'design') return '#6b8cff';
            if (node.data?.label?.toLowerCase() === 'implementation') return '#4cd964';
            if (node.data?.label?.toLowerCase() === 'testing') return '#ffcc00';
            if (node.data?.label?.toLowerCase() === 'deployment') return '#ff9500';
            if (node.data?.label?.toLowerCase() === 'maintenance') return '#5ac8fa';
            return '#333c4d'; // Default color
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
    <div className="z-10 flex flex-col gap-2 w-[320px] p-3 bg-black border-s-4 border-[#333c4d]">
        {/* add node form */}
        <div className="text-lg text-[#dededf] mt-3 ml-1">Add a Node :</div>
        <form className="mb-5" style={{
          border: "1px solid #333c4d",
          padding: "12px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0c0c0c",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
        }}>
          <input
            style={{
              marginBottom: "8px",
              border: "1px solid #333c4d",
              padding: "8px",
              borderRadius: "4px",
              color: "#dededf",
              backgroundColor: "#0c0c0c",
              outline: "none",
              transition: "border-color 0.2s ease"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#cc6be4";
              e.target.style.boxShadow = "0 0 0 2px rgba(204, 107, 228, 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#333c4d";
              e.target.style.boxShadow = "none";
            }}
            id="node-label"
            type="text"
            placeholder='Enter node name'
          />
          <textarea style={{
            marginBottom: "8px",
            border: "1px solid #333c4d",
            padding: "8px",
            borderRadius: "4px",
            color: "#dededf",
            backgroundColor: "#0c0c0c",
            outline: "none",
            transition: "border-color 0.2s ease"
          }}
            onFocus={(e) => {
              e.target.style.borderColor = "#cc6be4";
              e.target.style.boxShadow = "0 0 0 2px rgba(204, 107, 228, 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#333c4d";
              e.target.style.boxShadow = "none";
            }}
            name="node-details" id="node-details" placeholder="Enter node details"></textarea>
          <button
            style={{
              marginBottom: "4px",
              border: "1px solid #e40b7f",
              padding: "8px 12px",
              borderRadius: "4px",
              color: "#dededf",
              backgroundColor: "#e40b7f",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#cc6be4";
              e.target.style.borderColor = "#cc6be4";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#e40b7f";
              e.target.style.borderColor = "#e40b7f";
            }}
            onMouseDown={(e) => {
              e.target.style.transform = "scale(0.98)";
              e.target.style.backgroundColor = "#b80665";
            }}
            onMouseUp={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.backgroundColor = "#cc6be4";
            }}
            onClick={handleAddNode}
            type="button"
          >
            Add 
          </button>
        </form>
        <div className="mb-5"> 
         
           <div className="text-lg text-[#dededf] ml-1 mb-3">Layout :</div>
          <div className="flex justify-center gap-2">
            {/* top to bottom layout */}
            <button className="xy-theme__button flex justify-center items-center"  onClick={() => onLayout("TB")}>
              <BiSolidObjectsVerticalTop className="mr-2" size={20} />
            </button>
            {/* left to right layout */}
            <button className="xy-theme__button flex justify-center items-center" onClick={() => onLayout("LR")}>
              <BiSolidObjectsHorizontalLeft className="mr-2" size={20} />
            </button>
            {/* right to left layout */}
            <button className="xy-theme__button flex justify-center items-center" onClick={() => onLayout("RL")}>
              <BiSolidObjectsHorizontalRight className="mr-2" size={20} />
            </button>
            {/* bottom to top layout */}
            <button className="xy-theme__button flex justify-center items-center" onClick={() => onLayout("BT")}>
              <BiSolidObjectsVerticalBottom className="mr-2" size={20} />
            </button>
          </div>
        </div>
        {/* phase flow */}
        <div className="mb-5">
        <div className="text-lg text-[#dededf] mb-3 ml-1">Phase Flow :</div>
        <div className="grid grid-cols-2 gap-4">

          <button className="xy-theme__button" onClick={() => onLayout("LR")}>
            Planning
          </button>
          <button className="xy-theme__button" onClick={() => onLayout("LR")}>
            Design
          </button>
          <button className="xy-theme__button" onClick={() => onLayout("LR")}>
            Implementation
          </button>
          <button className="xy-theme__button" onClick={() => onLayout("LR")}>
            Testing
          </button>
          <button className="xy-theme__button" onClick={() => onLayout("LR")}>
            Deployment
          </button>
          <button className="xy-theme__button" onClick={() => onLayout("LR")}>
            Maintenance
          </button>
        </div>
        </div>
      </div>
    </>
  );
};

export default AutoFlow;