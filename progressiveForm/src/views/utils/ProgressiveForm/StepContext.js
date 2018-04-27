import React from 'react';

export const StepContext = React.createContext();
export const withStepContext = (WrappedComponent) => {
  const Wrapper = (props) => (
    <StepContext.Consumer>
      {(contextProps) => {
        return <WrappedComponent {...props} {...contextProps} />;
      }}
    </StepContext.Consumer>
  );
  Wrapper.displayName = `withStepContext(${WrappedComponent.displayName || WrappedComponent.name})`;

  return Wrapper;
};
