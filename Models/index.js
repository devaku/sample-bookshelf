/**
 * This file will load all the models in the folder
 * and expose them for usage.
 */
const { readdirSync } = require('fs');
const path = require('path');

const model_export = {};

const readTargetDir = (directory) => {
	readdirSync(directory).forEach((file) => {
		if (file == 'index.js') {
			return;
		}

		let model_name = path.parse(file).name;
		let model_file = file;

		model_export[model_name] = require(`./${model_file}`);
		return;
	});
};

readTargetDir('./Models');

module.exports = model_export;
