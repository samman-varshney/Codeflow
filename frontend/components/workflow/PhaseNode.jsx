import React from "react";
import { Handle, Position } from "@xyflow/react";
import { 
  Calendar,         // Planning
  Palette,          // Design
  Code2,            // Implement
  TestTube,         // Test
  Rocket,           // Deployment
  Settings          // Maintenance
} from "lucide-react";

function PhaseNode({ data }) {
  // Function to get the appropriate icon for each phase
  const getPhaseIcon = (phaseName) => {
    const phase = phaseName.toLowerCase();
    
    if (phase.includes('plan')) return <Calendar className="w-4 h-4" style={{ color: '#cc6be4' }} />;
    if (phase.includes('design')) return <Palette className="w-4 h-4" style={{ color: '#cc6be4' }} />;
    if (phase.includes('implement') || phase.includes('develop')) return <Code2 className="w-4 h-4" style={{ color: '#cc6be4' }} />;
    if (phase.includes('test')) return <TestTube className="w-4 h-4" style={{ color: '#cc6be4' }} />;
    if (phase.includes('deploy')) return <Rocket className="w-4 h-4" style={{ color: '#cc6be4' }} />;
    if (phase.includes('maintain')) return <Settings className="w-4 h-4" style={{ color: '#cc6be4' }} />;
    
    // Default icon
    return <Calendar className="w-4 h-4" style={{ color: '#cc6be4' }} />;
  };

  // Function to get a unique color for each phase (optional)
  const getPhaseColor = (phaseName) => {
    const phase = phaseName.toLowerCase();
    
    if (phase.includes('plan')) return '#e40b7f';        // Pink for Planning
    if (phase.includes('design')) return '#6b8cff';      // Blue for Design
    if (phase.includes('implement')) return '#4cd964';   // Green for Implement
    if (phase.includes('test')) return '#ffcc00';        // Yellow for Test
    if (phase.includes('deploy')) return '#ff9500';      // Orange for Deployment
    if (phase.includes('maintain')) return '#5ac8fa';    // Light Blue for Maintenance
    
    return '#cc6be4'; // Default color
  };

  const iconColor = getPhaseColor(data.label);
  const borderColor = getPhaseColor(data.label);

  return (
    <div 
      className="relative rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      style={{
        width: '220px',
        height: '80px',
        backgroundColor: '#0c0c0c',
        border: `2px solid ${borderColor}`,
        boxShadow: `0 8px 20px ${borderColor}40`, // 40 is hex for 25% opacity
      }}
    >
      {/* Icon with glow effect */}
      <div 
        className="absolute top-1 right-2 p-1 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: `${iconColor}20`, // 20 is hex for 12.5% opacity
          boxShadow: `0 0 10px ${iconColor}50` // 50 is hex for 31.25% opacity
        }}
      >
        {getPhaseIcon(data.label)}
      </div>

      {/* Label - centered with proper spacing */}
      <h3 
        className="text-md font-semibold text-center px-2"
        style={{ 
          color: '#dededf',
          marginTop: '8px',
          lineHeight: '1.2',
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {data.label}
      </h3>

      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 rounded-lg -z-10 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${borderColor} 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, ${iconColor} 0%, transparent 50%)`
        }}
      ></div>

      {/* Handles - larger and more prominent for parent nodes */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-4 h-4"
        style={{ 
          backgroundColor: iconColor,
          border: '2px solid #0c0c0c',
          boxShadow: `0 0 8px ${iconColor}80` // 80 is hex for 50% opacity
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-4 h-4"
        style={{ 
          backgroundColor: iconColor,
          border: '2px solid #0c0c0c',
          boxShadow: `0 0 8px ${iconColor}80`
        }}
      />
      <Handle
        type="source"
        position={Position.Left}
        className="w-4 h-4"
        style={{ 
          backgroundColor: iconColor,
          border: '2px solid #0c0c0c',
          boxShadow: `0 0 8px ${iconColor}80`
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4"
        style={{ 
          backgroundColor: iconColor,
          border: '2px solid #0c0c0c',
          boxShadow: `0 0 8px ${iconColor}80`
        }}
      />
    </div>
  );
}

export default PhaseNode;