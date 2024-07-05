import path from 'path';
import moduleAlias from 'module-alias';

/**
 * Determines the base path for the alias depending on the environment.
 * If the NODE_ENV is 'production', it uses the 'build' directory,
 * otherwise it defaults to the 'src/' directory.
 *
 * @type {string}
 */
const basePath = process.env.NODE_ENV === 'production' ? 'build' : 'src/';

/**
 * Adds an alias '@' that resolves to the determined base path.
 * This allows for simplified module imports using the '@' alias.
 *
 * Example:
 * import someModule from '@/someModule';
 *
 * This will resolve to 'build/someModule' in production and 'src/someModule' in development.
 */
moduleAlias.addAlias('@', path.join(__dirname, '../../', basePath));
