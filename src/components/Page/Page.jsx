import { Slide } from "@material-ui/core";
import React from "react";

const Page = (props) => {
  return (
    <Slide
      direction="up"
      style={{ margin: "15px" }}
      in={true}
      mountOnEnter
      unmountOnExit
      timeout={300}
    >
      <div>{props.children}</div>
    </Slide>
  );
};

export default Page;
