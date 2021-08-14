const axios = require('axios');

module.exports = async ({ redenpID, ipHedear, token }) => {
	const config = {
		method: 'get',
		url: 'https://www.qh226.com/api/front/redenp/rain/grab/' + redenpID,
		headers: {
			'x-session-token': token,
		},
		...ipHedear,
	};

	const response = await axios(config);

	return response.data;
};
