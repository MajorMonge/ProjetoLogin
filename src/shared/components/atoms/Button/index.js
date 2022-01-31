import { Link } from "react-router-dom";
import "./Button.css";

export default function Button(props) {
  let button;
  if (props.to === undefined || props.to === "") {
    button = <button {...props}>{props.children}</button>;
  } else {
    button = <Link {...props}>{props.children}</Link>;
  }

  return (
    <div
      className={`app-button ${props.buttonstyle} ${
        props.disabled === true ? "mute" : ""
      }`}
    >
      {button}
    </div>
  );
}
