import doT from 'dot';

import compiler from './compiler.js';

test('Transforms a plain string', async () => {
  const stats = await compiler('fixtures/string.dot');
  const output = stats.toJson().modules[0].source;
  expect(output).toBe(`export default ${doT.template('string')}`);
});
