import * as React from "react";

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Advanced Marker</h3>
      <p>
        This example uses the <code>&lt;AdvancedMarker&gt;</code> component with
        custom hover and click states.
      </p>

      <p>
        By integrating content in the marker that would traditionally be shown
        in an info window, we can create a smooth and engaging user experience.
      </p>

    </div>
  );
}

export default React.memo(ControlPanel);
