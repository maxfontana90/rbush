const rbush = require('rbush');

class RBush extends rbush {
  _contains(b, a) {
    return a.minX <= b.minX &&
      a.minY <= b.minY &&
      b.maxX <= a.maxX &&
      b.maxY <= a.maxY;
  }

  _intersects(a, b) {
    return b.minX <= a.maxX &&
      b.minY <= a.maxY &&
      b.maxX >= a.minX &&
      b.maxY >= a.minY;
  }

  searchAll(bbox) {
    let node = this.data;
    const result = {
      intersects: [],
      contains: [],
    };

    if (!this._intersects(bbox, node)) return result;

    const toBBox = this.toBBox;

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const childBBox = node.leaf ? toBBox(child) : child;

      if (this._intersects(bbox, childBBox)) {
        if (this._contains(bbox, childBBox)) {
          result.contains.push(bbox);
        } else {
          result.intersects.push(bbox);
        }
      }
    }

    return result;
  }
}

module.exports = RBush;
