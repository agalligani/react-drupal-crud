import React, { Component } from "react";
import { connect } from "react-redux";

class AlertOverlay extends Component {
  _renderAlerts = () => {
    return this.props.alerts.map((alert) => {
      return { alert: alert, key: alert.id };
    });
  };

  render() {
    const { alerts, children, style } = this.props;
    const ALERTS_NOT_DEFINED =
      "AlertsOverlayComponent tried to render but alerts was not defined.";
    const ALERTS_NO_CHILD =
      "AlertsOverlayComponent tried to render but no child was defined.";

    if (!alerts) {
      throw ALERTS_NOT_DEFINED;
    }

    if (!children) {
      throw ALERTS_NO_CHILD;
    }

    return (
      <div className="react-alerts-overlay-component-container">
        {this._renderAlerts()}
      </div>
    );
  }
}

export default connect()(AlertOverlay);
