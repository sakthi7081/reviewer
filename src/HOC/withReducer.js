import React from "react";

const withReducer = (key, reducer) => WrappedComponent => {
  const Extended = (props, context) => {    
    context.store.injectReducer(key, reducer);

    return <WrappedComponent {...props} />;
  };
  return Extended;
};

export { withReducer };
