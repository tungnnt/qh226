const axios = require('axios');

module.exports = async ({ ipHeader }) => {
	const headers = {
		authority: 'www.qh226.com',
		accept: 'application/json, text/javascript, */*; q=0.01',
		'x-requested-with': 'XMLHttpRequest',
		'x-lang': 'vi',
		'user-agent':
			'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
		'content-type': 'application/json;charset=UTF-8',
		origin: 'https://www.qh226.com',
		'sec-fetch-site': 'same-origin',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		referer: 'https://www.qh226.com/home/index.html',
		'accept-language': 'en-US,en;q=0.9,vi;q=0.8,zh-CN;q=0.7,zh;q=0.6',
		...ipHeader,
	};

	const data = {};

	const options = {
		url: 'https://www.qh226.com/api/front/index/getvalidatecode',
		method: 'POST',
	};

	const response = await axios({
		method: options.method || 'GET',
		url: options.url,
		headers,
		data,
	});

	return response.data;
};
