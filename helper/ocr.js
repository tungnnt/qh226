const { createWorker } = require('tesseract.js');
const getValidateCode = require('../api/get-validate-code');
const { randomIPHeader } = require('./random');
const { uuid } = require('uuidv4');
const fs = require('fs');

const worker = createWorker();

const _readCaptcha = async (path) => {
	await worker.load();

	await worker.loadLanguage('eng');

	await worker.initialize('eng');

	await worker.setParameters({
		tessedit_char_whitelist: '0123456789',
	});

	const {
		data: { text },
	} = await worker.recognize(path);

	return text.replace(/[\D]/gi, '');
};

module.exports = async () => {
	const path = `image/${uuid()}.png`;

	const ipHeader = randomIPHeader();

	const response = await getValidateCode({ ipHeader });

	const {
		t: { identity: validCodeIdentity, img },
	} = response;

	fs.writeFileSync(path, img, 'base64');

	const captcha = await _readCaptcha(path);

	fs.unlinkSync(path);

	return { captcha, validCodeIdentity };
};
