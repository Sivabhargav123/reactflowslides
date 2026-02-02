const Toolbar = ({ onAddSlide }) => {
  return (
    <div className="toolbar">
      <button onClick={onAddSlide}>➕ Add Slide</button>
    </div>
  );
};

export default Toolbar;
