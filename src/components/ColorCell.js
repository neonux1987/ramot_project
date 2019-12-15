
const styles = {
  negative: "#ff3333",
  neutral: "yellow",
  positive: "rgb(5, 185, 5)",
  fontColor: "#fff"
}

export default (props) => {

  let bg = "";
  let newFontColor = "";
  if (props.colored) {
    let num = Number.parseFloat(props.number);
    if (num < 0) {
      newFontColor = styles.fontColor;
      bg = styles.negative;
    } else if (num > 0) {
      newFontColor = styles.fontColor;
      bg = styles.positive;
    } else {
      bg = styles.neutral;
    }
  }

  return (
    props.children(bg, newFontColor)
  );

}