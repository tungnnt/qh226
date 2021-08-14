const getValidateCode = require('./api/get-validate-code');
const register = require('./api/register');
const {
	randomPhone,
	randomFirstName,
	randomName,
	normalizeName,
	randomDate,
	randomIPHeader,
} = require('./helper/random');
const fs = require('fs');

setImmediate(async () => {
	while (true) {
		try {
			const ipHeader = randomIPHeader();

			let response = await getValidateCode({ ipHeader });

			const {
				t: { identity: validCodeIdentity },
			} = response;

			const phone = randomPhone();

			const password = 'Pa55w0rds';

			const name = randomName();

			const fullName = normalizeName(
				randomFirstName() + ' ' + name,
				' ',
				false
			).toUpperCase();

			const userName = (
				normalizeName(name).trim() + randomDate().replace(/\//gim, '')
			).slice(0, 15);

			response = await register({
				userName,
				password,
				phone,
				fullName,
				validCodeIdentity,
				ipHeader,
			});

			const {
				t: { token, loginIp, userId },
			} = response;

			if (response && response.success) {
				console.log({ token, loginIp });

				fs.appendFileSync(
					'accounts.txt',
					`${userName}|${token}|${loginIp}|${userId}|${fullName}|${phone}\n`
				);
			}
		} catch (error) {
			console.log(error);

			continue;
		}
	}
});
