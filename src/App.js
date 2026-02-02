import { useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

import SlideNode from './components/SlideNode';
import Toolbar from './components/Toolbar';
import { initialNodes } from './components/nodes';

import './styles/app.css';

const nodeTypes = {
  slideNode: SlideNode,
};

const STORAGE_KEY = 'reactflow-slides';
let id = 3;

function App() {
  const storedData = JSON.parse(
    localStorage.getItem(STORAGE_KEY)
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(
    storedData?.nodes || initialNodes
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    storedData?.edges || []
  );

  const onConnect = (params) =>
    setEdges((eds) => addEdge(params, eds));

  const addSlide = () => {
    const newNode = {
      id: String(id++),
      type: 'slideNode',
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 100,
      },
      data: {
        title: `Slide ${id - 1}`,
        text: 'New slide content',
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ nodes, edges })
    );
  }, [nodes, edges]);

  return (
    <div className="app-container">
      <Toolbar onAddSlide={addSlide} />

      <div className="flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background gap={18} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;
