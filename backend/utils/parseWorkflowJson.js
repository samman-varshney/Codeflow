const { v4: generateId } = require('uuid');

module.exports = (jsonObject) => {
  if (!jsonObject || typeof jsonObject !== 'object') {
    throw new Error('Invalid or empty workflow JSON provided');
  }

  const techStack = jsonObject.tech_stack || jsonObject.techStack || null;
  const bashCommand = jsonObject.bash_command || jsonObject.bashCommand || null;
  const workflow = jsonObject.workflow || null;

  const nodes = [];
  const edges = [];

  if (workflow && typeof workflow === 'object') {
    const defaultEdgeOptions = { type: 'smoothstep', animated: true, style: { stroke: '#ffffffff' } };
    const defaultNodeOptions = { type: 'expandable' };
    const workflowNode = {
      id: generateId(),
      data: { label: 'workflow' },
      position: { x: 0, y: 0 },
      type: 'workflow',
    };

    nodes.push(workflowNode);

    Object.keys(workflow).forEach((key) => {
      const phase = {
        id: generateId(),
        data: { label: key },
        position: { x: 0, y: 0 },
        type: 'phase',
        phase: key,
      };
      nodes.push(phase);
      edges.push({
        id: generateId(),
        source: workflowNode.id,
        target: phase.id,
        ...defaultEdgeOptions,
      });

      let prevId = phase.id;
      const phaseContent = workflow[key];

      if (Array.isArray(phaseContent)) {
        for (const stage of phaseContent) {
          const stageNode = {
            id: generateId(),
            data: { ...stage },
            position: { x: 0, y: 0 },
            phase: key,
            ...defaultNodeOptions,
          };
          nodes.push(stageNode);
          edges.push({
            id: generateId(),
            source: prevId,
            target: stageNode.id,
            phase: key,
            ...defaultEdgeOptions,
          });
          prevId = stageNode.id;
        }
      } else if (phaseContent && typeof phaseContent === 'object') {
        for (const stage in phaseContent) {
          const stageNode = {
            id: generateId(),
            data: { ...phaseContent[stage] },
            position: { x: 0, y: 0 },
            phase: key,
            ...defaultNodeOptions,
          };
          nodes.push(stageNode);
          edges.push({
            id: generateId(),
            source: prevId,
            target: stageNode.id,
            phase: key,
            ...defaultEdgeOptions,
          });
          prevId = stageNode.id;
        }
      }
    });
  }

  return { nodes, edges, techStack, bashCommand };
};
