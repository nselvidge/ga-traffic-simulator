/* run commander component
 * To use add require('../cmds/run.js')(program) to your commander.js based node executable before program.parse
 */
'use strict';
const run = require('../library/run.js');

module.exports = function(program) {

	program
		.command('run <configPath>')
		.version('0.0.0')
		.description('Runs Traffic through your GA account')
		.action(run);

};
