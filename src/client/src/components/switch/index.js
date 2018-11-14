const Switch = ({ children }) => {
  const nodesToRender = [];

  children.forEach((node) => {
    if (node.props.showIf) {
      nodesToRender.push(node);
    }
  });

  return nodesToRender;
};

export default Switch;
