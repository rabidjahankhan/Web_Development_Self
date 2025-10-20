import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { GripVertical, X, Plus, Search, RotateCcw, ZoomIn, ZoomOut, Maximize2, Zap } from 'lucide-react';

// Sample data
const sampleData = {
  sourcePeriod: "2024",
  targetPeriod: "2025",
  totalSourceRecords: 847,
  transitions: [
    { from: "Source (2024)", to: "ECY2 (2025)", count: 342, type: "renewed" },
    { from: "Source (2024)", to: "Full Member (2025)", count: 156, type: "upgraded" },
    { from: "Source (2024)", to: "ECY1 (2025)", count: 98, type: "downgraded" },
    { from: "Source (2024)", to: "Cancelled", count: 187, type: "cancelled" },
    { from: "Source (2024)", to: "Lifetime (2025)", count: 45, type: "upgraded" },
    { from: "Source (2024)", to: "Unknown", count: 19, type: "unknown" }
  ],
  provinceBreakdown: {
    // Province breakdown of member types (Layer 1 → Layer 2)
    "ECY2 (2025)": [
      { to: "Ontario", count: 154 },
      { to: "Quebec", count: 89 },
      { to: "BC", count: 65 },
      { to: "Other", count: 34 }
    ],
    "Full Member (2025)": [
      { to: "Ontario", count: 70 },
      { to: "Quebec", count: 40 },
      { to: "BC", count: 32 },
      { to: "Other", count: 14 }
    ],
    // Province breakdown of age groups (Layer 2 → Layer 3)
    "18-24": [
      { to: "Ontario", count: 20 },
      { to: "Quebec", count: 15 },
      { to: "BC", count: 8 },
      { to: "Other", count: 2 }
    ],
    "25-34": [
      { to: "Ontario", count: 85 },
      { to: "Quebec", count: 55 },
      { to: "BC", count: 32 },
      { to: "Other", count: 13 }
    ],
    "35-44": [
      { to: "Ontario", count: 35 },
      { to: "Quebec", count: 25 },
      { to: "BC", count: 15 },
      { to: "Other", count: 3 }
    ],
    "45+": [
      { to: "Ontario", count: 16 },
      { to: "Quebec", count: 10 },
      { to: "BC", count: 6 },
      { to: "Other", count: 2 }
    ]
  },
  ageGroupBreakdown: {
    // Age group breakdown of member types (Layer 1 → Layer 2)
    "ECY2 (2025)": [
      { to: "18-24", count: 45 },
      { to: "25-34", count: 185 },
      { to: "35-44", count: 78 },
      { to: "45+", count: 34 }
    ],
    "Full Member (2025)": [
      { to: "18-24", count: 20 },
      { to: "25-34", count: 78 },
      { to: "35-44", count: 42 },
      { to: "45+", count: 16 }
    ],
    // Age group breakdown of provinces (Layer 2 → Layer 3)
    "Ontario": [
      { to: "18-24", count: 48 },
      { to: "25-34", count: 105 },
      { to: "35-44", count: 55 },
      { to: "45+", count: 16 }
    ],
    "Quebec": [
      { to: "18-24", count: 30 },
      { to: "25-34", count: 60 },
      { to: "35-44", count: 30 },
      { to: "45+", count: 9 }
    ],
    "BC": [
      { to: "18-24", count: 15 },
      { to: "25-34", count: 42 },
      { to: "35-44", count: 28 },
      { to: "45+", count: 12 }
    ],
    "Other": [
      { to: "18-24", count: 5 },
      { to: "25-34", count: 18 },
      { to: "35-44", count: 15 },
      { to: "45+", count: 10 }
    ]
  },
  members: {
    "ECY2 (2025)": [
      { id: 1, name: "Sarah Chen", joinDate: "Jan 15, 2025", previous: "ECY1", revenue: 250 },
      { id: 2, name: "Michael Torres", joinDate: "Jan 18, 2025", previous: "ECY1", revenue: 250 },
      { id: 3, name: "Jessica Wong", joinDate: "Jan 22, 2025", previous: "ECY1", revenue: 250 },
      { id: 4, name: "David Kumar", joinDate: "Jan 25, 2025", previous: "ECY1", revenue: 250 },
      { id: 5, name: "Emily Johnson", joinDate: "Feb 2, 2025", previous: "ECY1", revenue: 250 },
      { id: 6, name: "Alex Martinez", joinDate: "Feb 5, 2025", previous: "ECY1", revenue: 250 },
      { id: 7, name: "Sophie Anderson", joinDate: "Feb 8, 2025", previous: "ECY1", revenue: 250 },
      { id: 8, name: "Ryan O'Brien", joinDate: "Feb 12, 2025", previous: "ECY1", revenue: 250 },
      { id: 9, name: "Maya Patel", joinDate: "Feb 15, 2025", previous: "ECY1", revenue: 250 },
      { id: 10, name: "James Wilson", joinDate: "Feb 18, 2025", previous: "ECY1", revenue: 250 },
      { id: 11, name: "Olivia Brown", joinDate: "Feb 22, 2025", previous: "ECY1", revenue: 250 },
      { id: 12, name: "Ethan Davis", joinDate: "Feb 25, 2025", previous: "ECY1", revenue: 250 },
      { id: 13, name: "Ava Thompson", joinDate: "Mar 1, 2025", previous: "ECY1", revenue: 250 },
      { id: 14, name: "Noah Garcia", joinDate: "Mar 5, 2025", previous: "ECY1", revenue: 250 },
      { id: 15, name: "Isabella Rodriguez", joinDate: "Mar 8, 2025", previous: "ECY1", revenue: 250 },
      { id: 16, name: "Liam Taylor", joinDate: "Mar 12, 2025", previous: "ECY1", revenue: 250 },
      { id: 17, name: "Mia Lee", joinDate: "Mar 15, 2025", previous: "ECY1", revenue: 250 },
      { id: 18, name: "Lucas Martin", joinDate: "Mar 18, 2025", previous: "ECY1", revenue: 250 },
      { id: 19, name: "Charlotte White", joinDate: "Mar 22, 2025", previous: "ECY1", revenue: 250 },
      { id: 20, name: "Benjamin Harris", joinDate: "Mar 25, 2025", previous: "ECY1", revenue: 250 }
    ]
  },
  suggestedLayers: [
    { 
      id: "province", 
      name: "Province", 
      reason: "high variance",
      icon: "📍",
      preview: "Ontario: 45%, Quebec: 26%, BC: 19%, Other: 10%"
    },
    { 
      id: "regMonth", 
      name: "Registration Month", 
      reason: "timing patterns",
      icon: "📅",
      preview: "Spike in January (67%)"
    }
  ]
};

const getEdgeColor = (type) => {
  const colors = {
    upgraded: '#34C759',
    renewed: '#FFCC00',
    downgraded: '#FF9500',
    cancelled: '#FF3B30',
    unknown: '#8E8E93'
  };
  return colors[type] || colors.unknown;
};

// Simple hierarchical layout
const calculateLayout = (nodes, edges) => {
  const layers = {};
  const nodeMap = {};
  
  // Group nodes by layer
  nodes.forEach(node => {
    if (!layers[node.layer]) layers[node.layer] = [];
    layers[node.layer].push(node);
    nodeMap[node.id] = node;
  });
  
  // Position nodes
  const layerWidth = 300;
  const nodeHeight = 100;
  const startX = 100;
  
  Object.keys(layers).forEach(layerNum => {
    const nodesInLayer = layers[layerNum];
    const totalHeight = nodesInLayer.length * nodeHeight;
    const startY = (800 - totalHeight) / 2;
    
    nodesInLayer.forEach((node, index) => {
      node.x = startX + (parseInt(layerNum) * layerWidth);
      node.y = startY + (index * nodeHeight);
    });
  });
  
  return { nodes, edges };
};

const Node = ({ node, onNodeClick, hoveredNode, selectedNode, onMouseEnter, onMouseLeave, pathNodes }) => {
  const percentage = ((node.count / node.total) * 100).toFixed(1);
  const barWidth = Math.min((node.count / node.total) * 100, 100);
  const isHovered = hoveredNode === node.id;
  const isSelected = selectedNode?.id === node.id;
  
  // Check if node is in the path to selected node
  const isInPath = !pathNodes || pathNodes.size === 0 || pathNodes.has(node.id);
  const nodeOpacity = isInPath ? 1 : 0.3;
  
  const handleClick = (e) => {
    e.stopPropagation();
    onNodeClick(node);
  };
  
  // Scale factor for hover
  const scale = isHovered ? 1.05 : 1;
  const offset = isHovered ? -5 : 0; // Offset to keep centered when scaled
  
  return (
    <g 
      transform={`translate(${node.x + offset}, ${node.y + offset})`}
      onClick={handleClick}
      onMouseEnter={() => onMouseEnter(node.id)}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'pointer' }}
      opacity={nodeOpacity}
    >
      <rect
        width={200 * scale}
        height={80 * scale}
        rx="8"
        fill="white"
        stroke={isSelected ? '#3b82f6' : isHovered ? '#3b82f6' : '#d1d5db'}
        strokeWidth={isSelected || isHovered ? '3' : '2'}
        filter={isHovered ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' : 'none'}
      />
      
      <text x="10" y="25" fontSize="14" fontWeight="600" fill="#111827">
        {node.label}
      </text>
      
      {/* Progress bar background */}
      <rect x="10" y="35" width="120" height="8" rx="4" fill="#e5e7eb" />
      
      {/* Progress bar fill */}
      <rect 
        x="10" 
        y="35" 
        width={Math.min(barWidth * 1.2, 120)} 
        height="8" 
        rx="4" 
        fill="#3b82f6"
      />
      
      {/* Count number on the right */}
      <text x="190" y="43" fontSize="14" fontWeight="700" fill="#111827" textAnchor="end">
        {node.count}
      </text>
      
      <text x="10" y="60" fontSize="12" fill="#6b7280">
        {percentage}% of flow
      </text>
    </g>
  );
};

const Edge = ({ edge, nodes, edgeLabelType, edgeWidthByVolume, colorByChange, maxCount, hoveredEdge, setHoveredEdge, pathEdges }) => {
  const sourceNode = nodes.find(n => n.id === edge.source);
  const targetNode = nodes.find(n => n.id === edge.target);
  
  if (!sourceNode || !targetNode) return null;
  
  const sx = sourceNode.x + 200;
  const sy = sourceNode.y + 40;
  const tx = targetNode.x;
  const ty = targetNode.y + 40;
  
  const midX = (sx + tx) / 2;
  const midY = (sy + ty) / 2;
  
  const edgeWidth = edgeWidthByVolume 
    ? 2 + (edge.count / maxCount) * 18
    : 3;
  
  const color = colorByChange ? getEdgeColor(edge.type) : '#94a3b8';
  const isHovered = hoveredEdge === edge.id;
  
  // Fade edges not in the path to selected node
  const isInPath = !pathEdges || pathEdges.size === 0 || pathEdges.has(edge.id);
  const edgeOpacity = isHovered ? 1 : isInPath ? 0.7 : 0.1;
  
  const label = edgeLabelType === 'none' ? null
    : edgeLabelType === 'count' 
      ? `${edge.count}` 
      : edgeLabelType === 'percentage' 
        ? `${((edge.count / sourceNode.total) * 100).toFixed(1)}%`
        : `${edge.count} (${((edge.count / sourceNode.total) * 100).toFixed(1)}%)`;
  
  return (
    <g>
      <path
        d={`M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ty}, ${tx} ${ty}`}
        fill="none"
        stroke={color}
        strokeWidth={edgeWidth}
        opacity={edgeOpacity}
        onMouseEnter={() => setHoveredEdge(edge.id)}
        onMouseLeave={() => setHoveredEdge(null)}
        style={{ cursor: 'pointer' }}
      />
      
      <polygon
        points={`${tx},${ty} ${tx-10},${ty-5} ${tx-10},${ty+5}`}
        fill={color}
        opacity={edgeOpacity}
      />
      
      {label && (
        <>
          <rect
            x={midX - 40}
            y={midY - 12}
            width="80"
            height="24"
            rx="4"
            fill="white"
            fillOpacity="0.9"
            stroke="#e5e7eb"
          />
          
          <text
            x={midX}
            y={midY + 5}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="#1f2937"
          >
            {label}
          </text>
        </>
      )}
    </g>
  );
};

export default function FlowAnalytics() {
  const [layers, setLayers] = useState([
    { id: 'memberType', name: 'Member Type (Target)', count: 847, groups: 6 }
  ]);
  const [nodeBreakdowns, setNodeBreakdowns] = useState({}); // Track breakdowns per node: { nodeOriginalLabel: ['ageGroup', 'province'] }
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('members');
  const [initialFilter, setInitialFilter] = useState('all');
  const [edgeLabelType, setEdgeLabelType] = useState('none');
  const [edgeWidthByVolume, setEdgeWidthByVolume] = useState(true);
  const [colorByChange, setColorByChange] = useState(true);
  const [minFlowCount, setMinFlowCount] = useState(10);
  const [draggedLayer, setDraggedLayer] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragMoved, setDragMoved] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredEdge, setHoveredEdge] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [actionsExpanded, setActionsExpanded] = useState(false);
  const svgRef = useRef(null);

  const generateGraph = useCallback(() => {
    let currentNodes = [];
    let currentEdges = [];
    let nodeId = 0;

    if (layers.length === 0) {
      setNodes([]);
      setEdges([]);
      return;
    }

    // Filter transitions based on initial filter
    let filteredTransitions = sampleData.transitions;
    let sourceLabel = 'Source (2024)';
    let totalRecords = sampleData.totalSourceRecords;
    
    if (initialFilter === 'ecy1') {
      filteredTransitions = sampleData.transitions.filter(t => 
        t.to.includes('ECY1') || t.to.includes('ECY2') || t.to === 'Full Member (2025)' || t.to === 'Cancelled'
      );
      sourceLabel = 'ECY1 Members (2024)';
      totalRecords = 342;
    } else if (initialFilter === 'full') {
      filteredTransitions = sampleData.transitions.filter(t => 
        t.to.includes('Full Member')
      );
      sourceLabel = 'Full Members (2024)';
      totalRecords = 156;
    }

    // Layer 0: Source node
    const sourceNode = {
      id: `node-${nodeId++}`,
      label: sourceLabel,
      count: totalRecords,
      total: totalRecords,
      layer: 0,
      x: 0,
      y: 0
    };
    currentNodes.push(sourceNode);

    const maxCount = Math.max(...filteredTransitions.map(t => t.count));

    // Layer 1: Initial transitions
    filteredTransitions
      .filter(t => t.count >= minFlowCount)
      .forEach((transition, index) => {
        const targetNode = {
          id: `node-${nodeId++}`,
          label: transition.to,
          count: transition.count,
          total: totalRecords,
          originalLabel: transition.to,
          layer: 1,
          x: 0,
          y: 0
        };
        currentNodes.push(targetNode);

        currentEdges.push({
          id: `edge-${sourceNode.id}-${targetNode.id}`,
          source: sourceNode.id,
          target: targetNode.id,
          count: transition.count,
          type: transition.type
        });
      });

    // Recursive function to expand nodes with breakdowns
    const processedNodes = new Set(); // Track which nodes we've already processed
    
    const expandNode = (parentNode, layerNum, remainingBreakdowns) => {
      const nodeKey = `${parentNode.originalLabel}-${layerNum}`;
      if (processedNodes.has(nodeKey) || remainingBreakdowns.length === 0) return;
      processedNodes.add(nodeKey);
      
      // Process first breakdown in the list
      const breakdownType = remainingBreakdowns[0];
      const breakdownData = breakdownType === 'ageGroup' ? sampleData.ageGroupBreakdown : sampleData.provinceBreakdown;
      const breakdown = breakdownData[parentNode.originalLabel];
      
      if (breakdown) {
        const nextBreakdowns = remainingBreakdowns.slice(1); // Remaining breakdowns to apply to children
        
        breakdown.forEach(item => {
          const childNode = {
            id: `node-${nodeId++}`,
            label: item.to,
            count: item.count,
            total: parentNode.count,
            parent: parentNode.originalLabel,
            originalLabel: item.to,
            layer: layerNum + 1,
            x: 0,
            y: 0
          };
          currentNodes.push(childNode);

          currentEdges.push({
            id: `edge-${parentNode.id}-${childNode.id}`,
            source: parentNode.id,
            target: childNode.id,
            count: item.count,
            type: 'breakdown'
          });
          
          // Continue expanding this child with remaining breakdowns from parent
          if (nextBreakdowns.length > 0) {
            expandNode(childNode, layerNum + 1, nextBreakdowns);
          }
          
          // Also check if this child has its own explicit breakdowns
          const childBreakdowns = nodeBreakdowns[childNode.originalLabel];
          if (childBreakdowns && childBreakdowns.length > 0) {
            expandNode(childNode, layerNum + 1, childBreakdowns);
          }
        });
      }
    };
    
    // Expand layer 1 nodes if they have breakdowns
    const layer1Nodes = currentNodes.filter(n => n.layer === 1);
    layer1Nodes.forEach(node => {
      const breakdowns = nodeBreakdowns[node.originalLabel];
      if (breakdowns && breakdowns.length > 0) {
        expandNode(node, 1, breakdowns);
      }
    });

    const { nodes: layoutedNodes, edges: layoutedEdges } = calculateLayout(currentNodes, currentEdges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [layers, minFlowCount, initialFilter, nodeBreakdowns]);

  useEffect(() => {
    generateGraph();
  }, [generateGraph]);

  const onNodeClick = useCallback((node) => {
    setSelectedNode(node);
    setDetailsOpen(true);
    setActiveTab('members');
    setSelectedMembers([]); // Clear selection when switching nodes
    setActionsExpanded(false); // Collapse actions when switching nodes
  }, []);

  // Helper function to find all nodes and edges in the path from source to selected node
  const getPathToNode = useCallback((targetNodeId, allNodes, allEdges) => {
    if (!targetNodeId) return { pathNodes: new Set(), pathEdges: new Set() };
    
    const pathNodes = new Set([targetNodeId]);
    const pathEdges = new Set();
    
    // Recursively trace back from target to source
    const traceBack = (nodeId) => {
      // Find all edges that lead TO this node
      const incomingEdges = allEdges.filter(e => e.target === nodeId);
      
      incomingEdges.forEach(edge => {
        pathEdges.add(edge.id);
        if (!pathNodes.has(edge.source)) {
          pathNodes.add(edge.source);
          traceBack(edge.source); // Recursively trace back from source node
        }
      });
    };
    
    traceBack(targetNodeId);
    
    return { pathNodes, pathEdges };
  }, []);

  // Calculate path only when selectedNode or graph changes
  const pathData = useMemo(() => 
    getPathToNode(selectedNode?.id, nodes, edges),
    [selectedNode, nodes, edges, getPathToNode]
  );
  
  const { pathNodes, pathEdges } = pathData;

  const addLayerToNode = (nodeLabel, layerId, layerName) => {
    // Add breakdown only to the selected node
    setNodeBreakdowns(prev => ({
      ...prev,
      [nodeLabel]: [...(prev[nodeLabel] || []), layerId]
    }));
    
    // Update layers list if not already present
    if (!layers.find(l => l.id === layerId)) {
      const counts = layerId === 'ageGroup' ? 4 : layerId === 'province' ? 4 : 5;
      setLayers([...layers, { id: layerId, name: layerName, count: 342, groups: counts }]);
    }
  };

  const addLayerToAll = (layerId, layerName) => {
    // Add breakdown to all nodes in the current last layer
    const maxLayer = Math.max(...nodes.map(n => n.layer));
    const lastLayerNodes = nodes.filter(n => n.layer === maxLayer);
    
    const newBreakdowns = { ...nodeBreakdowns };
    lastLayerNodes.forEach(node => {
      if (node.originalLabel) {
        newBreakdowns[node.originalLabel] = [...(newBreakdowns[node.originalLabel] || []), layerId];
      }
    });
    setNodeBreakdowns(newBreakdowns);
    
    // Update layers list
    if (!layers.find(l => l.id === layerId)) {
      const counts = layerId === 'ageGroup' ? 4 : layerId === 'province' ? 4 : 5;
      setLayers([...layers, { id: layerId, name: layerName, count: 342, groups: counts }]);
    }
  };

  const removeLayer = (layerId) => {
    // Remove from layers list
    setLayers(layers.filter(l => l.id !== layerId));
    
    // Remove from all node breakdowns
    const newBreakdowns = { ...nodeBreakdowns };
    Object.keys(newBreakdowns).forEach(nodeLabel => {
      newBreakdowns[nodeLabel] = newBreakdowns[nodeLabel].filter(id => id !== layerId);
      if (newBreakdowns[nodeLabel].length === 0) {
        delete newBreakdowns[nodeLabel];
      }
    });
    setNodeBreakdowns(newBreakdowns);
  };

  const handleDragStart = (index) => {
    setDraggedLayer(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedLayer === null || draggedLayer === index) return;

    const newLayers = [...layers];
    const draggedItem = newLayers[draggedLayer];
    const targetItem = newLayers[index];
    
    newLayers.splice(draggedLayer, 1);
    newLayers.splice(index, 0, draggedItem);
    
    setLayers(newLayers);
    
    // Update order in nodeBreakdowns
    const newBreakdowns = { ...nodeBreakdowns };
    Object.keys(newBreakdowns).forEach(nodeLabel => {
      const breakdownsList = newBreakdowns[nodeLabel];
      const draggedIdx = breakdownsList.indexOf(draggedItem.id);
      const targetIdx = breakdownsList.indexOf(targetItem.id);
      
      if (draggedIdx !== -1 && targetIdx !== -1) {
        const temp = [...breakdownsList];
        temp.splice(draggedIdx, 1);
        temp.splice(targetIdx, 0, draggedItem.id);
        newBreakdowns[nodeLabel] = temp;
      }
    });
    setNodeBreakdowns(newBreakdowns);
    
    setDraggedLayer(index);
  };

  const handleDragEnd = () => {
    setDraggedLayer(null);
  };

  const handleMouseDown = (e) => {
    // Only start dragging if clicking on SVG background, not on nodes
    if (e.target.tagName === 'svg' || e.target.tagName === 'rect') {
      e.preventDefault();
      setIsDragging(true);
      setDragMoved(false);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      setDragMoved(true);
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragMoved(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = 'grabbing';
    } else {
      document.body.style.cursor = 'default';
    }
    return () => {
      document.body.style.cursor = 'default';
    };
  }, [isDragging]);

  const handleZoomIn = () => {
    setZoom(Math.min(zoom * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom / 1.2, 0.3));
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 50, y: 50 });
  };

  useEffect(() => {
    // Set initial pan position to center the graph
    if (nodes.length > 0 && pan.x === 0 && pan.y === 0) {
      setPan({ x: 50, y: 50 });
    }
  }, [nodes]);

  const maxCount = edges.length > 0 ? Math.max(...edges.map(e => e.count)) : 1;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes dockSlideUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Flow Analytics</h1>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleResetView}
        >
          <RotateCcw size={16} />
          Reset View
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Source Setup */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Source Period</h3>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Target Period</h3>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>2025</option>
                <option>2024</option>
              </select>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Initial Filter</h3>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={initialFilter}
                onChange={(e) => setInitialFilter(e.target.value)}
              >
                <option value="all">All Members</option>
                <option value="ecy1">ECY1 Only</option>
                <option value="full">Full Members Only</option>
              </select>
            </div>

            {/* Active Layers */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Breakdown Layers</h3>
              <div className="space-y-2 mb-3">
                {layers.map((layer, index) => (
                  <div 
                    key={layer.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-move hover:bg-gray-100 transition-colors"
                  >
                    <GripVertical size={16} className="text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{index + 1}. {layer.name}</div>
                      <div className="text-xs text-gray-600">{layer.count} members across {layer.groups} types</div>
                    </div>
                    <button 
                      onClick={() => removeLayer(layer.id)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      <X size={16} className="text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>

              {layers.length < 3 && nodes.length > 0 && (
                <>
                  <button 
                    onClick={() => {
                      const hasAgeGroup = layers.find(l => l.id === 'ageGroup');
                      const hasProvince = layers.find(l => l.id === 'province');
                      
                      if (!hasAgeGroup) {
                        addLayerToAll('ageGroup', 'Age Group');
                      } else if (!hasProvince) {
                        addLayerToAll('province', 'Province');
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-gray-600 hover:text-blue-600"
                  >
                    <Plus size={16} />
                    Add Layer (to all nodes)
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    💡 This applies the layer to all nodes in the last layer. To add to a specific node, click the node and use the breakdown panel.
                  </p>
                </>
              )}
            </div>

            {/* Suggested Layers */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">💡 Suggested Layers</h3>
              <div className="space-y-2">
                {sampleData.suggestedLayers.map(layer => {
                  const isAdded = layers.find(l => l.id === layer.id);
                  return (
                    <div key={layer.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex-1">
                        <div className="text-sm font-medium flex items-center gap-2">
                          <span>{layer.icon}</span>
                          {layer.name}
                        </div>
                        <div className="text-xs text-gray-600">{layer.reason}</div>
                      </div>
                      <button 
                        onClick={() => addLayerToAll(layer.id, layer.name)}
                        disabled={isAdded}
                        className={`p-1 rounded transition-colors ${
                          isAdded 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-blue-100'
                        }`}
                        title="Add to all nodes in last layer"
                      >
                        {isAdded ? (
                          <span className="text-xs text-green-600">✓ In use</span>
                        ) : (
                          <Plus size={16} className="text-blue-600" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Display Options */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Display</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium mb-2">Edge Labels:</div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="edgeLabel" 
                        value="none"
                        checked={edgeLabelType === 'none'}
                        onChange={(e) => setEdgeLabelType(e.target.value)}
                        className="text-blue-600"
                      />
                      <span className="text-sm">None</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="edgeLabel" 
                        value="count"
                        checked={edgeLabelType === 'count'}
                        onChange={(e) => setEdgeLabelType(e.target.value)}
                        className="text-blue-600"
                      />
                      <span className="text-sm">Count only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="edgeLabel" 
                        value="both"
                        checked={edgeLabelType === 'both'}
                        onChange={(e) => setEdgeLabelType(e.target.value)}
                        className="text-blue-600"
                      />
                      <span className="text-sm">Count + Percentage</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="edgeLabel" 
                        value="percentage"
                        checked={edgeLabelType === 'percentage'}
                        onChange={(e) => setEdgeLabelType(e.target.value)}
                        className="text-blue-600"
                      />
                      <span className="text-sm">Percentage only</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={edgeWidthByVolume}
                      onChange={(e) => setEdgeWidthByVolume(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm">Edge width by volume</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={colorByChange}
                      onChange={(e) => setColorByChange(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm">Color by change type</span>
                  </label>
                </div>

                <div>
                  <label className="text-sm flex items-center gap-2">
                    Hide flows with &lt;
                    <input 
                      type="number" 
                      value={minFlowCount}
                      onChange={(e) => setMinFlowCount(Number(e.target.value))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded"
                    />
                    members
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 relative overflow-hidden">
          <svg
            ref={svgRef}
            className="w-full h-full bg-gray-50"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Background pattern */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#e5e7eb" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* Render edges first */}
              {edges.map(edge => (
                <Edge
                  key={edge.id}
                  edge={edge}
                  nodes={nodes}
                  edgeLabelType={edgeLabelType}
                  edgeWidthByVolume={edgeWidthByVolume}
                  colorByChange={colorByChange}
                  maxCount={maxCount}
                  hoveredEdge={hoveredEdge}
                  setHoveredEdge={setHoveredEdge}
                  pathEdges={pathEdges}
                />
              ))}
              
              {/* Render nodes */}
              {nodes.map(node => (
                <Node
                  key={node.id}
                  node={node}
                  onNodeClick={onNodeClick}
                  hoveredNode={hoveredNode}
                  selectedNode={selectedNode}
                  onMouseEnter={setHoveredNode}
                  onMouseLeave={() => setHoveredNode(null)}
                  pathNodes={pathNodes}
                />
              ))}
            </g>
          </svg>
          
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-100 border-b border-gray-300 transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-100 border-b border-gray-300 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={20} />
            </button>
            <button
              onClick={handleResetView}
              className="p-2 hover:bg-gray-100 transition-colors"
              title="Fit View"
            >
              <Maximize2 size={20} />
            </button>
          </div>
          
          {/* Mini Map */}
          <div className="absolute bottom-4 right-4 w-48 h-32 bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
            <svg className="w-full h-full">
              <rect width="100%" height="100%" fill="#f9fafb" />
              {nodes.map(node => (
                <rect
                  key={node.id}
                  x={node.x * 0.15}
                  y={node.y * 0.15}
                  width="30"
                  height="12"
                  fill="#3b82f6"
                  rx="2"
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Details Panel - Right Slide Out */}
      <div 
        className={`fixed top-0 right-0 h-full bg-white border-l-2 border-gray-300 shadow-2xl transition-transform duration-300 ${
          detailsOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '450px', zIndex: 50 }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('members')}
                className={`px-4 py-2 font-medium transition-colors rounded-lg ${
                  activeTab === 'members' 
                    ? 'text-blue-600 bg-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                👥 Members
              </button>
              <button
                onClick={() => setActiveTab('breakdown')}
                className={`px-4 py-2 font-medium transition-colors rounded-lg ${
                  activeTab === 'breakdown' 
                    ? 'text-blue-600 bg-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📊 Breakdown
              </button>
            </div>
            <button 
              onClick={() => {
                setDetailsOpen(false);
                setSelectedMembers([]); // Clear selection when closing panel
                setActionsExpanded(false); // Collapse actions when closing panel
              }}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">{selectedNode && (
            <>
              {activeTab === 'members' && (
                <div className="relative h-full flex flex-col">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">
                        👥 MEMBERS ({selectedNode.count} records)
                      </h3>
                      {selectedMembers.length > 0 && (
                        <span className="text-sm text-blue-600 font-medium">
                          {selectedMembers.length} of {selectedNode.count} selected
                        </span>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text"
                          placeholder="Search members..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left">
                              <input
                                type="checkbox"
                                checked={selectedMembers.length === selectedNode.count}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    // Generate IDs for all records based on total count
                                    const allIds = Array.from({ length: selectedNode.count }, (_, i) => i + 1);
                                    setSelectedMembers(allIds);
                                  } else {
                                    setSelectedMembers([]);
                                    setActionsExpanded(false);
                                  }
                                }}
                                className="rounded text-blue-600"
                              />
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Join Date</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Previous</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Revenue</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {sampleData.members["ECY2 (2025)"].map(member => (
                            <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3">
                                <input
                                  type="checkbox"
                                  checked={selectedMembers.includes(member.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedMembers([...selectedMembers, member.id]);
                                    } else {
                                      const newSelection = selectedMembers.filter(id => id !== member.id);
                                      setSelectedMembers(newSelection);
                                      if (newSelection.length === 0) {
                                        setActionsExpanded(false);
                                      }
                                    }
                                  }}
                                  className="rounded text-blue-600"
                                />
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">{member.name}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{member.joinDate}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{member.previous}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">${member.revenue}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 text-center mb-24">
                      <button className="px-6 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        Load More
                      </button>
                      <div className="text-sm text-gray-600 mt-2">Showing 20/{selectedNode.count}</div>
                    </div>
                  </div>

                  {/* Dynamic Island - Selection Action Bar */}
                  {selectedMembers.length > 0 && (
                    <div className="fixed bottom-6 z-50"
                         style={{ 
                           left: '50%',
                           transform: 'translateX(-50%)',
                         }}>
                      <div className="flex flex-col items-center gap-2">
                        {/* Action buttons - appear above when expanded */}
                        {actionsExpanded && (
                          <div className="flex flex-col gap-2 mb-2">
                            <button 
                              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all shadow-lg hover:scale-105 text-sm font-medium min-w-[160px]"
                              style={{ animation: 'dockSlideUp 0.25s ease-out forwards' }}
                            >
                              📤 Export
                            </button>
                            <button 
                              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all shadow-lg hover:scale-105 text-sm font-medium min-w-[160px]"
                              style={{ animation: 'dockSlideUp 0.25s ease-out forwards' }}
                            >
                              ✉️ Email
                            </button>
                            <button 
                              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all shadow-lg hover:scale-105 text-sm font-medium min-w-[160px]"
                              style={{ animation: 'dockSlideUp 0.25s ease-out forwards' }}
                            >
                              📋 Add to Campaign
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMembers([]);
                                setActionsExpanded(false);
                              }}
                              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all shadow-lg hover:scale-105 text-sm font-medium min-w-[160px]"
                              style={{ animation: 'dockSlideUp 0.25s ease-out forwards' }}
                            >
                              ✕ Clear Selection
                            </button>
                          </div>
                        )}
                        
                        {/* Main pill - always visible */}
                        <div className="bg-gray-900 text-white rounded-full px-6 py-3 shadow-2xl flex items-center gap-3 cursor-pointer hover:bg-gray-800 transition-all"
                             style={{ animation: 'slideUp 0.3s ease-out forwards' }}
                             onClick={() => setActionsExpanded(!actionsExpanded)}>
                          <span className="font-semibold">{selectedMembers.length} Selected</span>
                          <Zap 
                            size={18} 
                            className={`text-yellow-400 transition-transform duration-300 ${actionsExpanded ? 'rotate-180' : ''}`} 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'breakdown' && (
                <div>
                  <h3 className="text-lg font-bold mb-2">📊 SUGGESTED BREAKDOWNS</h3>
                  <p className="text-gray-600 mb-2">
                    💡 Add a breakdown to see these {selectedNode.count} members in more detail.
                  </p>
                  <p className="text-sm text-blue-600 mb-6 bg-blue-50 p-2 rounded">
                    Note: Adding here only affects <strong>{selectedNode.label}</strong>
                  </p>

                  <div className="space-y-4">
                    {(() => {
                      const nodeBreakdownsList = nodeBreakdowns[selectedNode.originalLabel] || [];
                      const hasProvince = nodeBreakdownsList.includes('province');
                      const hasAgeGroup = nodeBreakdownsList.includes('ageGroup');
                      
                      return (
                        <>
                          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold flex items-center gap-2">
                                  📍 Province
                                </h4>
                                <p className="text-sm text-gray-600">Shows geographic distribution</p>
                              </div>
                              {hasProvince ? (
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded">
                                  ✓ Added
                                </span>
                              ) : (
                                <button 
                                  onClick={() => addLayerToNode(selectedNode.originalLabel, 'province', 'Province')}
                                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                                >
                                  Add
                                </button>
                              )}
                            </div>
                            <div className="text-sm text-gray-700 space-y-1">
                              <div>• Ontario: 156 (45%)</div>
                              <div>• Quebec: 89 (26%)</div>
                              <div>• BC: 67 (19%)</div>
                              <div>• Other: 30 (10%)</div>
                            </div>
                          </div>

                          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold flex items-center gap-2">
                                  📅 Age Group
                                </h4>
                                <p className="text-sm text-gray-600">Shows age distribution</p>
                              </div>
                              {hasAgeGroup ? (
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded">
                                  ✓ Added
                                </span>
                              ) : (
                                <button 
                                  onClick={() => addLayerToNode(selectedNode.originalLabel, 'ageGroup', 'Age Group')}
                                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                                >
                                  Add
                                </button>
                              )}
                            </div>
                            <div className="text-sm text-gray-700">
                              Preview: Majority 25-34 (54%)
                            </div>
                          </div>
                        </>
                      );
                    })()}

                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-semibold mb-3">Other Options:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors">
                          <span className="text-sm">• Revenue Tier</span>
                          <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            Add
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors">
                          <span className="text-sm">• Event Attendance</span>
                          <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}