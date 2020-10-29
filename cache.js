const redis = require("async-redis");
const client = redis.createClient(6379);

const expirationTime = 60 * 60;

async function setCache(username, data) {
	try {
		let key = `username=${username}`;
		return await client.set(key, expirationTime, data);
	} catch(e) {
		return e.toString();
	}
}

async function getCache(username) {
	try {
		let key = `username=${username}`;
		let data = await client.get(key);
		return JSON.parse(data);
	} catch(e) {
		return e.toString();
	}
}

async function clearCache(username) {
	try {
		let key = `username=${username}`;
		return await  client.del(key);
	} catch(e) {
		return e.toString();
	}
}

module.exports.setCache = setCache; 
module.exports.getCache = getCache; 
module.exports.clearCache = clearCache;
