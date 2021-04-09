import React, { useMemo } from "react";

const useTableComponents = () => {

  const components = useMemo(() => {
    return {

      List: React.forwardRef(({ style, children }, listRef) => {
        return (
          <div
            ref={listRef}
            id="tableBody"
            style={{
              ...style
            }}
          >
            {children}
          </div>
        );
      }),
      Item: ({ children, ...props }) => {
        return (
          <div {...props} style={{
            minHeight: "35px",
            pageBreakInside: "avoid"
          }}>
            {children}
          </div>
        );
      }

    };
  }, []);

  return [components]
};

export default useTableComponents;