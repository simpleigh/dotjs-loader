import { readFileSync } from 'fs';

import doT from 'dot';

import compiler from './compiler.js';

[
  'arrays',
  'conditionals',
  'encode',
  'evaluation',
  'interpolation',
  'partials',
].forEach(fixture => {

  describe(`"${fixture}" fixture`, () => {

    it('compiles without errors or warning', () => {
      return compiler(fixture).then(stats => {
        stats = stats.toJson();
        expect(stats.errors.length).toBe(0);
        expect(stats.warnings.length).toBe(0);
        expect(stats.modules[0].built).toBe(true);
        expect(stats.modules[0].errors).toBe(0);
        expect(stats.modules[0].failed).toBe(false);
        expect(stats.modules[0].warnings).toBe(0);
      });
    });

    it('compiles to the expected output', () => {
      const source = readFileSync(`./tests/fixtures/${fixture}.dot`);
      return compiler(fixture).then(stats => {
        const output = stats.toJson({ source: true }).modules[0].source;
        expect(output).toBe(`export default ${doT.template(source)}`);
      });
    });

  });

});
