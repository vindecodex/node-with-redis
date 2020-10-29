const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const {
	setCache,
	getCache,
	clearCache
} =  require("./cache");

const app = express();
const port = process.env.PORT || 1234;
const url = "https://api.github.com/users/";

app.use(express.json());

app.get("/api/:username", async (req, res) => {
	try {

		const { username } = req.params;
		let data = await getCache(username);

		if (data !== null) {
			return res.json({ data });
		}

		response = await fetch(url + username)
		data = await response.json();

		if(data !== null) {
			await setCache(username, JSON.stringify(data));
			return res.json({ data });
		}

	} catch(e) {
		return res.status(500).json({ error: e });
	}
});

router.delete("/api/:username", (req, res, next) => {
	const { username } = req.params;
	(async()=> {
		let result = await clearCache(username);
		if (result === 1) {
			return res.json({Result: "deleted from redis"});
		}
		return res.json({Result: `redis no record with username ${username}`});
	})();
});

app.listen(port);
