import dagre from "@dagrejs/dagre";

export const getLayoutedElements = (nodes, edges, nodeSizes, direction = "TB") => {
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction });

  // Set node sizes in dagre
  nodes.forEach((node) => {
    const size = nodeSizes[node.id] || { width: 150, height: 50 };
    dagreGraph.setNode(node.id, size);
  });

  // Set dagre edges
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id) || { x: 0, y: 0 };

    // Compute the source/target positions for this direction
    let targetPosition = "top";
    let sourcePosition = "bottom";

    if (direction === "LR") {
      targetPosition = "left";
      sourcePosition = "right";
    } else if (direction === "RL") {
      targetPosition = "right";
      sourcePosition = "left";
    } else if (direction === "BT") {
      targetPosition = "bottom";
      sourcePosition = "top";
    } // TB -> defaults are already top/bottom

    // Return brand-new node object and copy positions into data
    return {
      ...node,
      targetPosition,
      sourcePosition,
      data: {
        ...(node.data || {}),
        __computedSourcePosition: sourcePosition,
        __computedTargetPosition: targetPosition,
      },
      position: {
        x: nodeWithPosition.x - (nodeSizes[node.id]?.width || 150) / 2,
        y: nodeWithPosition.y - (nodeSizes[node.id]?.height || 50) / 2,
      },
    };
  });

  // Clear any explicit handle references on edges so ReactFlow will re-evaluate attachment
  const newEdges = edges.map((e) => ({
    ...e,
    sourceHandle: undefined,
    targetHandle: undefined,
  }));

  return { nodes: newNodes, edges: newEdges };
};

