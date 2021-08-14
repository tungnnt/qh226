const axios = require('axios');
const fs = require('fs');
var Jimp = require('jimp');
const ocr = require('./ocr');
const cropImage = require('./crop-image');
const { uuid } = require('uuidv4');
const ora = require('ora');

const _downloadImage = async (epoch) => {
	const url = `https://www.dmt55.com//api/Account/code?code_rand=${epoch}`;

	const path = './image/code.jpg';
	const writer = fs.createWriteStream(path);

	const response = await axios({
		url,
		method: 'get',
		responseType: 'stream',
	});

	response.data.pipe(writer);

	return new Promise((resolve, reject) => {
		writer.on('finish', resolve);
		writer.on('error', reject);
	});
};

const _getEpoch = () => new Date().getTime();

const _processImage = async () => {
	const imageTest = './code.jpg';

	await Jimp.read(imageTest).then(function (image) {
		image
			.color([
				{ apply: 'desaturate', params: [90] },
				{ apply: 'lighten', params: [7] },
			])
			.contrast(1)
			.write('/root/Projects/vlike666/img-opt.png');
	});
};

module.exports = async () => {
	const spinner = ora('Recognizing captcha...').start();

	const imageTest = './image/code.jpg';
	const imageFileName = uuid();

	const epoch = _getEpoch();
	await _downloadImage(epoch);

	await Jimp.read(imageTest).then(async function (image) {
		await image
			.color([
				{ apply: 'desaturate', params: [90] },
				{ apply: 'lighten', params: [7] },
			])
			.contrast(1)
			.write(`./image/${imageFileName}.png`);
	});

	await new Promise((resolve) => setTimeout(resolve, 1000));

	await cropImage(`./image/${imageFileName}.png`);

	const digit1 = await ocr('./image/cropped-image/1.png');
	const digit2 = await ocr('./image/cropped-image/2.png');
	const digit3 = await ocr('./image/cropped-image/3.png');
	const digit4 = await ocr('./image/cropped-image/4.png');

	fs.unlinkSync(`./image/${imageFileName}.png`);

	spinner.stop();

	return {
		code: `${digit1}${digit2}${digit3}${digit4}`,
		epoch: epoch,
	};
};
