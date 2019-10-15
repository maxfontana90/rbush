const RBush = require('./rbush');

describe('RBush', () => {
  let tree;

  beforeEach(() => {
    tree = new RBush();
  });

  it('should detect the selected range intersects an existent redaction', () => {
    tree.load([
      // A1:D1
      {
        minX: 1,
        minY: 1,
        maxX: 4,
        maxY: 1,
      },
    ]);

    const result = tree.searchAll({
      // D1:D4
      minX: 4,
      minY: 1,
      maxX: 4,
      maxY: 4,
    });

    expect(result.intersects).to.have.length(1);
    expect(result.contains).to.have.length(0);
  });

  it('should detect the selected range doesnt intersect a contiguous redaction', () => {
    tree.load([
      // A1:D1
      {
        minX: 1,
        minY: 1,
        maxX: 4,
        maxY: 1,
      },
    ]);

    const result = tree.searchAll({
      // A2:D2
      minX: 1,
      minY: 2,
      maxX: 4,
      maxY: 2,
    });

    expect(result.intersects).to.have.length(0);
    expect(result.contains).to.have.length(0);
  });

  it('should detect the selected cell doesnt intersect an existent redaction', () => {
    tree.load([
      // A1:D1
      {
        minX: 1,
        minY: 1,
        maxX: 4,
        maxY: 1,
      },
    ]);

    const result = tree.searchAll({
      // E5
      minX: 5,
      minY: 5,
      maxX: 5,
      maxY: 5,
    });

    expect(result.intersects).to.have.length(0);
    expect(result.contains).to.have.length(0);
  });

  it('should detect the selected range is contained by an existent redaction', () => {
    tree.load([
      // A1:D4
      {
        minX: 1,
        minY: 1,
        maxX: 4,
        maxY: 4,
      },
    ]);

    const result = tree.searchAll({
      // B2:C3
      minX: 2,
      minY: 2,
      maxX: 3,
      maxY: 3,
    });

    expect(result.intersects).to.have.length(0);
    expect(result.contains).to.have.length(1);
  });

  it('should detect the selected range is equal to an existent redaction', () => {
    tree.load([
      // A1:D4
      {
        minX: 1,
        minY: 1,
        maxX: 4,
        maxY: 4,
      },
    ]);

    const result = tree.searchAll({
      // B2:C3
      minX: 1,
      minY: 1,
      maxX: 4,
      maxY: 4,
    });

  });

  it('should detect a selected cell is contained in an existent redaction', () => {
    tree.load([
      // A1:D4
      {
        minX: 1,
        minY: 1,
        maxX: 4,
        maxY: 4,
      },
    ]);

    const result = tree.searchAll({
      // A1
      minX: 1,
      minY: 1,
      maxX: 1,
      maxY: 1,
    });

    expect(result.intersects).to.have.length(0);
    expect(result.contains).to.have.length(1);
  });
});
