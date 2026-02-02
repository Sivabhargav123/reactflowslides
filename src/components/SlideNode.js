import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/slideNode.css';

const SlideNode = ({ data, selected }) => {
  return (
    <div className={`slide-node ${selected ? 'selected' : ''}`}>
      <h4>{data.title}</h4>
      <p>{data.text}</p>

      <Handle
        id="target"
        type="target"
        position={Position.Left}
        isConnectableEnd={true}
      />

      <Handle
        id="source"
        type="source"
        position={Position.Right}
        isConnectableStart={true}
      />
    </div>
  );
};

export default memo(SlideNode);
