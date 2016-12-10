var assert = require("power-assert");
var parseTree = require("../../../lib/renderer/src/helper/parse_tree");

describe("renderer/src/helper/parse_tree", function() {
  it("should create tree from categories", function() {
    var category = [
      "test1",
      "test2",
    ];
    assert.deepEqual(parseTree(category), {
      'test1': {
        'path': 'test1',
        'name': 'test1',
        'depth': 0,
      },
      'test2': {
        'path': 'test2',
        'name': 'test2',
        'depth': 0,
      },
    });
  });

  it("should create tree from nested categories", function() {
    var category = [
      "test",
      "test/module1/hoge",
      "test/module2/hoge",
    ];
    assert.deepEqual(parseTree(category), {
      'test': {
        'path': 'test',
        'name': 'test',
        'depth': 0,
        'children': {
          'module1': {
            'name': 'module1',
            'depth': 1,
            'children': {
              'hoge': {
                'path': 'test/module1/hoge',
                'name': 'hoge',
                'depth': 2
              }
            }
          },
          'module2': {
            'name': 'module2',
            'depth': 1,
            'children': {
              'hoge': {
                'path': 'test/module2/hoge',
                'name': 'hoge',
                'depth': 2
              },
            },
          },
        },
      }
    });
  });
});
