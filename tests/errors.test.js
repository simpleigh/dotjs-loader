import compiler from './compiler.js';

describe('error handling', () => {

  it('handles errors gracefully', () => {
    return compiler('error').then(stats => {
      stats = stats.toJson();
      expect(stats.errors.length).toBe(1);
      expect(stats.warnings.length).toBe(0);
      expect(stats.modules[0].built).toBe(true);
      expect(stats.modules[0].errors).toBe(1);
      expect(stats.modules[0].failed).toBe(true);
      expect(stats.modules[0].warnings).toBe(0);
    }).catch((e) => {
      fail();
      throw e;
    });
  });

});
