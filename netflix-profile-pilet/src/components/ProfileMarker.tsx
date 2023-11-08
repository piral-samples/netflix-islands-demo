import * as React from "react";

const Component = () => {
  const [count, setCount] = React.useState(0);

  return (
    <p style={{ marginTop: "7rem" }} onClick={() => setCount((c) => c + 1)}>
      Hello from profile {count}!
    </p>
  );
};

export default Component;
