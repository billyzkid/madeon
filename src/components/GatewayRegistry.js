import { toArray } from "../scripts/functions";

export default class GatewayRegistry {
  constructor() {
    this._containers = {};
    this._children = {};
  }

  _renderContainer(name) {
    if (!this._containers[name]) {
      return;
    }

    this._containers[name].setState({ children: toArray(this._children[name]) });
  }

  addContainer(name, container) {
    this._containers[name] = container;
    this._renderContainer(name);
  }

  removeContainer(name) {
    this._containers[name] = null;
  }

  addChild(name, child, gatewayId) {
    if (!this._children[name]) {
      this._children[name] = {};
    }

    this._children[name][gatewayId] = child;
    this._renderContainer(name);
  }

  removeChild(name, gatewayId) {
    this.clearChild(name, gatewayId);
    this._renderContainer(name);
  }

  clearChild(name, gatewayId) {
    delete this._children[name][gatewayId];
  }
}