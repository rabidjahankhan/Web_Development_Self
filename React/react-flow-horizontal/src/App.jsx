// import { useCallback, useEffect, useState } from "react";
// import {
//   ReactFlow,
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
// } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import dagre from "dagre";

// const nodeWidth = 172;
// const nodeHeight = 36;

// const getLayoutedElements = (nodes, edges, direction = "LR") => {
//   const dagreGraph = new dagre.graphlib.Graph();
//   dagreGraph.setDefaultEdgeLabel(() => ({}));

//   const isHorizontal = direction === "LR";
//   dagreGraph.setGraph({ rankdir: direction });

//   nodes.forEach((node) =>
//     dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
//   );
//   edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));

//   dagre.layout(dagreGraph);

//   nodes.forEach((node) => {
//     const nodeWithPosition = dagreGraph.node(node.id);
//     node.targetPosition = isHorizontal ? "left" : "top";
//     node.sourcePosition = isHorizontal ? "right" : "bottom";
//     node.position = {
//       x: nodeWithPosition.x - nodeWidth / 2,
//       y: nodeWithPosition.y - nodeHeight / 2,
//     };
//   });

//   return { nodes, edges };
// };

// const initialNodes = [
//   { id: "1", data: { label: "Input" }, position: { x: 0, y: 0 } },
//   { id: "2", data: { label: "A" }, position: { x: 0, y: 0 } },
//   { id: "3", data: { label: "B" }, position: { x: 0, y: 0 } },
//   { id: "4", data: { label: "Output" }, position: { x: 0, y: 0 } },
// ];

// const initialEdges = [
//   { id: "e1-2", source: "1", target: "2" },
//   { id: "e1-3", source: "1", target: "3" },
//   { id: "e2-4", source: "2", target: "4" },
//   { id: "e3-4", source: "3", target: "4" },
// ];

// export default function App() {
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [direction, setDirection] = useState("LR");

//   const onLayout = useCallback(
//     (dir) => {
//       const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
//         [...initialNodes],
//         [...initialEdges],
//         dir
//       );
//       setNodes(layoutedNodes);
//       setEdges(layoutedEdges);
//     },
//     [setNodes, setEdges]
//   );

//   useEffect(() => {
//     onLayout(direction);
//   }, [direction, onLayout]);

//   return (
//     <div style={{ width: "100vw", height: "100vh" }}>
//       <div style={{ position: "absolute", left: 10, top: 10, zIndex: 10 }}>
//         <button onClick={() => setDirection("TB")}>Vertical layout</button>
//         <button onClick={() => setDirection("LR")} style={{ marginLeft: 8 }}>
//           Horizontal layout
//         </button>
//       </div>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         fitView
//       >
//         <MiniMap />
//         <Controls />
//         <Background />
//       </ReactFlow>
//     </div>
//   );
// }

import React from 'react';
// Import the new component
import FlowAnalytics from './FlowAnalytics'; 
// You might need to adjust imports within FlowAnalytics.jsx 
// to use .jsx instead of .tsx if your linter complains.

function App() {
  return (
    // The FlowAnalytics component manages its own layout (h-screen, flex, etc.)
    // You may need to remove any wrapping divs or styles from your original App.jsx
    // that conflict with its full-page layout.
    <FlowAnalytics />
  );
}

export default App;
