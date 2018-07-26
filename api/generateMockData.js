import jsf from 'json-schema-faker';
import fs from 'fs';
import chalk from 'chalk';
import schema from './mockDataSchema';
import loggedInUser from './loggedInUser';

jsf.extend('faker', () => require('faker'));
jsf.resolve(schema).then((result) => {
	const destructured = {
		...result,
		...loggedInUser
	};
	fs.writeFile('./api/db.json', JSON.stringify(destructured), (err) => {
		if (err) {
			return console.log(chalk.red(err));
		}
		console.log(chalk.green('Mock data generated.'));
	});
});
