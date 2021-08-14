const axios = require('axios');

const _hashPassword = ({ password }) => {
	const hexcase = 0,
		chrsz = 8;

	function md5_cmn(t, e, n, r, o, i) {
		return safe_add(bit_rol(safe_add(safe_add(e, t), safe_add(r, i)), o), n);
	}

	function bit_rol(t, e) {
		return (t << e) | (t >>> (32 - e));
	}

	function binl2hex(t) {
		for (
			var e = hexcase ? '0123456789ABCDEF' : '0123456789abcdef', n = '', r = 0;
			r < 4 * t.length;
			r++
		)
			n +=
				e.charAt((t[r >> 2] >> ((r % 4) * 8 + 4)) & 15) +
				e.charAt((t[r >> 2] >> ((r % 4) * 8)) & 15);
		return n;
	}

	function str2binl(t) {
		for (
			var e = Array(), n = (1 << chrsz) - 1, r = 0;
			r < t.length * chrsz;
			r += chrsz
		)
			e[r >> 5] |= (t.charCodeAt(r / chrsz) & n) << r % 32;
		return e;
	}

	function md5_ff(t, e, n, r, o, i, a) {
		return md5_cmn((e & n) | (~e & r), t, e, o, i, a);
	}

	function md5_gg(t, e, n, r, o, i, a) {
		return md5_cmn((e & r) | (n & ~r), t, e, o, i, a);
	}

	function md5_hh(t, e, n, r, o, i, a) {
		return md5_cmn(e ^ n ^ r, t, e, o, i, a);
	}

	function md5_ii(t, e, n, r, o, i, a) {
		return md5_cmn(n ^ (e | ~r), t, e, o, i, a);
	}

	function safe_add(t, e) {
		var n = (65535 & t) + (65535 & e);
		return (((t >> 16) + (e >> 16) + (n >> 16)) << 16) | (65535 & n);
	}

	function core_md5(t, e) {
		(t[e >> 5] |= 128 << e % 32), (t[14 + (((e + 64) >>> 9) << 4)] = e);
		for (
			var n = 1732584193, r = -271733879, o = -1732584194, i = 271733878, a = 0;
			a < t.length;
			a += 16
		) {
			var s = n,
				u = r,
				c = o,
				l = i;
			(n = md5_ff(n, r, o, i, t[a + 0], 7, -680876936)),
				(i = md5_ff(i, n, r, o, t[a + 1], 12, -389564586)),
				(o = md5_ff(o, i, n, r, t[a + 2], 17, 606105819)),
				(r = md5_ff(r, o, i, n, t[a + 3], 22, -1044525330)),
				(n = md5_ff(n, r, o, i, t[a + 4], 7, -176418897)),
				(i = md5_ff(i, n, r, o, t[a + 5], 12, 1200080426)),
				(o = md5_ff(o, i, n, r, t[a + 6], 17, -1473231341)),
				(r = md5_ff(r, o, i, n, t[a + 7], 22, -45705983)),
				(n = md5_ff(n, r, o, i, t[a + 8], 7, 1770035416)),
				(i = md5_ff(i, n, r, o, t[a + 9], 12, -1958414417)),
				(o = md5_ff(o, i, n, r, t[a + 10], 17, -42063)),
				(r = md5_ff(r, o, i, n, t[a + 11], 22, -1990404162)),
				(n = md5_ff(n, r, o, i, t[a + 12], 7, 1804603682)),
				(i = md5_ff(i, n, r, o, t[a + 13], 12, -40341101)),
				(o = md5_ff(o, i, n, r, t[a + 14], 17, -1502002290)),
				(n = md5_gg(
					n,
					(r = md5_ff(r, o, i, n, t[a + 15], 22, 1236535329)),
					o,
					i,
					t[a + 1],
					5,
					-165796510
				)),
				(i = md5_gg(i, n, r, o, t[a + 6], 9, -1069501632)),
				(o = md5_gg(o, i, n, r, t[a + 11], 14, 643717713)),
				(r = md5_gg(r, o, i, n, t[a + 0], 20, -373897302)),
				(n = md5_gg(n, r, o, i, t[a + 5], 5, -701558691)),
				(i = md5_gg(i, n, r, o, t[a + 10], 9, 38016083)),
				(o = md5_gg(o, i, n, r, t[a + 15], 14, -660478335)),
				(r = md5_gg(r, o, i, n, t[a + 4], 20, -405537848)),
				(n = md5_gg(n, r, o, i, t[a + 9], 5, 568446438)),
				(i = md5_gg(i, n, r, o, t[a + 14], 9, -1019803690)),
				(o = md5_gg(o, i, n, r, t[a + 3], 14, -187363961)),
				(r = md5_gg(r, o, i, n, t[a + 8], 20, 1163531501)),
				(n = md5_gg(n, r, o, i, t[a + 13], 5, -1444681467)),
				(i = md5_gg(i, n, r, o, t[a + 2], 9, -51403784)),
				(o = md5_gg(o, i, n, r, t[a + 7], 14, 1735328473)),
				(n = md5_hh(
					n,
					(r = md5_gg(r, o, i, n, t[a + 12], 20, -1926607734)),
					o,
					i,
					t[a + 5],
					4,
					-378558
				)),
				(i = md5_hh(i, n, r, o, t[a + 8], 11, -2022574463)),
				(o = md5_hh(o, i, n, r, t[a + 11], 16, 1839030562)),
				(r = md5_hh(r, o, i, n, t[a + 14], 23, -35309556)),
				(n = md5_hh(n, r, o, i, t[a + 1], 4, -1530992060)),
				(i = md5_hh(i, n, r, o, t[a + 4], 11, 1272893353)),
				(o = md5_hh(o, i, n, r, t[a + 7], 16, -155497632)),
				(r = md5_hh(r, o, i, n, t[a + 10], 23, -1094730640)),
				(n = md5_hh(n, r, o, i, t[a + 13], 4, 681279174)),
				(i = md5_hh(i, n, r, o, t[a + 0], 11, -358537222)),
				(o = md5_hh(o, i, n, r, t[a + 3], 16, -722521979)),
				(r = md5_hh(r, o, i, n, t[a + 6], 23, 76029189)),
				(n = md5_hh(n, r, o, i, t[a + 9], 4, -640364487)),
				(i = md5_hh(i, n, r, o, t[a + 12], 11, -421815835)),
				(o = md5_hh(o, i, n, r, t[a + 15], 16, 530742520)),
				(n = md5_ii(
					n,
					(r = md5_hh(r, o, i, n, t[a + 2], 23, -995338651)),
					o,
					i,
					t[a + 0],
					6,
					-198630844
				)),
				(i = md5_ii(i, n, r, o, t[a + 7], 10, 1126891415)),
				(o = md5_ii(o, i, n, r, t[a + 14], 15, -1416354905)),
				(r = md5_ii(r, o, i, n, t[a + 5], 21, -57434055)),
				(n = md5_ii(n, r, o, i, t[a + 12], 6, 1700485571)),
				(i = md5_ii(i, n, r, o, t[a + 3], 10, -1894986606)),
				(o = md5_ii(o, i, n, r, t[a + 10], 15, -1051523)),
				(r = md5_ii(r, o, i, n, t[a + 1], 21, -2054922799)),
				(n = md5_ii(n, r, o, i, t[a + 8], 6, 1873313359)),
				(i = md5_ii(i, n, r, o, t[a + 15], 10, -30611744)),
				(o = md5_ii(o, i, n, r, t[a + 6], 15, -1560198380)),
				(r = md5_ii(r, o, i, n, t[a + 13], 21, 1309151649)),
				(n = md5_ii(n, r, o, i, t[a + 4], 6, -145523070)),
				(i = md5_ii(i, n, r, o, t[a + 11], 10, -1120210379)),
				(o = md5_ii(o, i, n, r, t[a + 2], 15, 718787259)),
				(r = md5_ii(r, o, i, n, t[a + 9], 21, -343485551)),
				(n = safe_add(n, s)),
				(r = safe_add(r, u)),
				(o = safe_add(o, c)),
				(i = safe_add(i, l));
		}
		return Array(n, r, o, i);
	}

	return binl2hex(core_md5(str2binl(password), password.length * chrsz));
};

module.exports = async ({
	userName,
	password,
	phone,
	fullName,
	validCodeIdentity,
	ipHeader,
}) => {
	const headers = {
		Host: 'www.qh226.com',
		'Content-Type': 'application/json;charset=utf-8',
		Origin: 'https://www.qh226.com',
		'x-lang': 'vi',
		'Accept-Encoding': 'gzip, deflate',
		Connection: 'close',
		Accept: 'application/json, text/plain, */*',
		'User-Agent':
			'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
		Referer: 'https://www.qh226.com/mobile/',
		'Accept-Language': 'en-us',
		...ipHeader,
	};

	const data = {
		userName,
		password: _hashPassword({ password }),
		phone,
		fullName,
		validCodeIdentity,
		loginSrc: '1',
	};

	const options = {
		url: 'https://www.qh226.com/api/front/index/register',
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
