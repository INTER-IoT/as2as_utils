/* eslint-disable no-underscore-dangle */

const readLine = require('readline');
const fs = require('fs');

const simus = {};

class PositionSimu {
  constructor(positionConfig) {
    this.callbacks = {};
    this.index = -1;
    this.file = positionConfig.file;
    this.positions = [];
  }
  configure(positionConfig, cb) {
    this.file = positionConfig.file;
    this.index = -1;
    this.positions = [];
    this._parseFile(cb);
  }
  on(event, cb) {
    this.callbacks[event] = cb;
  }
  start(cb) {
    this._scheduleNextPosition();
    cb(null);
  }
  stop(cb) {
    clearTimeout(this.timer);
    this.index = -1;
    cb();
  }
  pause(cb) {
    clearTimeout(this.timer);
    cb();
  }
  _scheduleNextPosition() {
    this.index += 1;
    if (this.index >= this.positions.length) this.index = 0;
    // TODO: Remove next FAIL-SAFE line and do proper checks
    const position = this.positions[this.index] || null;
    this.timer = setTimeout(() => {
      if (this.callbacks.position && position !== null) this.callbacks.position(position);
      this._scheduleNextPosition();
    }, position.ts || 500);
  }
  _parseFile(cb) {
    const onerror = (err) => {
      this.index = -1;
      this.positions = [];
      cb(err);
    };
    const stream = fs.createReadStream(this.file);
    stream.on('error', onerror);
    const lineReader = readLine.createInterface({ input: stream });

    lineReader.on('line', (line) => {
      try {
        const pos = {};
        pos.data = {};
        let data = null;
        // eslint-disable-next-line no-useless-escape
        [, pos.lat, pos.lon, pos.ts, data] = line.match(/^([\d\.\-]+)\s([\d\.\-]+)\s(\d+)\s?((?:[\w\d]+=[\w\d]+\s?)*)$/);
        if (data !== undefined && data !== '') {
          data.trim().split(' ').forEach((property) => {
            const [key, value] = property.split('=');
            if (key !== undefined && value !== undefined) pos.data[key] = value;
          });
        }
        this.positions.push(pos);
      } catch (e) {
        console.log(e);
      }
    });
    lineReader.on('close', () => cb(null));
  }
}

module.exports = RED => ({
  getSimu: config => simus[RED.nodes.getNode(config.positionConfig).uuid],
  initOrUpdate: (positionConfig, cb) => {
    simus[positionConfig.uuid] = simus[positionConfig.uuid] || new PositionSimu(positionConfig);
    simus[positionConfig.uuid].configure(positionConfig, cb);
  },
});
