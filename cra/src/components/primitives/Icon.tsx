import React from "react";

function Icon({ name, size = "24px", ...rest }) {
  return <i style={{ fontSize: size }} {...rest} className={`ion-md-${name} ion-ios-${name}`} />;
}

export default React.memo(Icon);
