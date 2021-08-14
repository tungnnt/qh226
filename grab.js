const fs = require('fs');
const grab = require('./api/grab');

const file = 'accounts.txt';

const _getTokenFromFile = () => {
	const lines = fs.readFileSync(file).toString().split('\n');

	return lines
		.map((line) => {
			const [userName, token, ip] = line.split('|');

			return { userName, token, ip };
		})
		.filter((info) => info.token);
};

const _generateIpHeader = ({ ip }) => ({
	'X-Originating-IP': ip,
	'X-Forwarded-For': ip,
	'X-Remote-IP': ip,
	'X-Remote-Addr': ip,
});

setImmediate(async () => {
	const redenpID = '30310';

	const accountsInfo = _getTokenFromFile();

	for (const account of accountsInfo) {
		try {
			console.log(account);

			const { token, ip } = account;

			const ipHeader = _generateIpHeader({ ip });

			const response = await grab({ redenpID, ipHeader, token });

			console.log(response);
		} catch (error) {
			console.log(error.message || error);

			continue;
		}
	}
});
