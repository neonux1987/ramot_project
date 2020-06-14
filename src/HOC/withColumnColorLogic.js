import React from 'react';

export default (OriginalComponent, value = Number, logicalStyle = {
  negative: {
    color: "#ffffff",
    backgroundColor: "rgb(228, 60, 60)"
  },
  positive: {
    color: "#ffffff",
    backgroundColor: "rgb(25, 189, 121)"
  },
  neutral: {
    color: "#000000",
    backgroundColor: "rgb(242, 255, 75)"
  }
}) => {

  let style = {
    color: "initial",
    backgroundColor: "initial"
  }

  if (value < 0) {
    style.color = logicalStyle.negative.color;
    style.backgroundColor = logicalStyle.negative.backgroundColor;
  } else if (value > 0) {
    style.color = logicalStyle.positive.color;
    style.backgroundColor = logicalStyle.positive.backgroundColor;
  } else {
    style.color = logicalStyle.neutral.color;
    style.backgroundColor = logicalStyle.neutral.backgroundColor;
  }

  return props => <OriginalComponent {...props} style={{ ...props.style, ...style }} />;
}