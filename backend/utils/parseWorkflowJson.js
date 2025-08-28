const {v4: generateId} = require('uuid');

module.exports = (jsonObject) => {

    const techStack = jsonObject.tech_stack;
    const bashCommand = jsonObject.bash_command;
    const workflow = jsonObject.workflow;
    
    const nodes = [];
    const edges = [];
    const defaultEdgeOptions = { type: 'smoothstep', animated: true, style: { stroke: '#ffffffff' } };
    const defaultNodeOptions = { type: 'expandable' };
    const workflowNode = {
        id: generateId(),
        data: { label: 'workflow' },
        position: { x: 0, y: 0 },
        type: 'workflow'
    };

    nodes.push(workflowNode);

    Object.keys(workflow).forEach(key => {
        const phase = {
            id: generateId(),
            data: { label: key },
            position: { x: 0, y: 0 },
            type: 'phase',
            phase: key
        };
        nodes.push(phase);
        edges.push({ id: generateId(), source: workflowNode.id, target: phase.id, ...defaultEdgeOptions});
        let prevId = phase.id;
        for( let stage in workflow[key]) {
            const stageNode = {
                id: generateId(),
                data: { ...workflow[key][stage] },
                position: { x: 0, y: 0 },
                phase: key,
                ...defaultNodeOptions
            };
            nodes.push(stageNode);
            edges.push({ id: generateId(), source: prevId, target: stageNode.id, phase: key, ...defaultEdgeOptions});
            prevId = stageNode.id;
        }
    });

    return { nodes, edges, techStack, bashCommand };
};

