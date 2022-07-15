import ReactDOM from "react-dom";
import APPInitializer from "./APPInitializer";
import * as serviceWorker from "./serviceWorker";

//after the reducers injected, render the app
ReactDOM.render(<APPInitializer />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
