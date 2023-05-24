import * as React from "react";
import { HeroButtonProps } from "../models/proptypes";

export const HeroButton: React.FC<HeroButtonProps> = (props) => {
  if (props.href.startsWith("http"))
    return (
      <a
        href={props.href}
        target="_blank"
        className="button"
        data-primary={props.primary}
      >
        {props.text}
      </a>
    );

  return (
    <a href={props.href} className="button" data-primary={props.primary}>
      {props.text}
    </a>
  );
};
