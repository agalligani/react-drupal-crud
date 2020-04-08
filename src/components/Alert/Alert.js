import React, { Component } from "react";
import { connect } from "react-redux";

class Alert extends Component {
  _removeAlert = (alert) => {
    this.props.dispatch({
      type: "REMOVE_ALERT",
      payload: alert,
    });
  };

  render() {
    return (
      <div className={alert.style} key={alert.id} onClick={this._removeAlert}>
        <div className="flex">
          <div>{alert.text}</div>
          <div className="settings-action">
            <i className="fa fa-close"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Alert);
