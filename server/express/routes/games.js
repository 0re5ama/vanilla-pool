const sequelize = require("../../sequelize");
const { models } = require("../../sequelize");
const { getIdParam } = require("../helpers");

async function getAll(req, res) {
    const data = await sequelize.query(
        `
		select g.id, g.game_date,
			g.p1id, p1.name as p1name, g.p1score,
			g.p2id, p2.name as p2name, g.p2score
        from games g
        join players p1
        	on g.p1id = p1.id
        join players p2
        	on g.p2id = p2.id;
    `,
        {
            type: sequelize.QueryTypes.SELECT,
        }
    );
    res.status(200).json(data);
}

async function reset(req, res) {
    const id = getIdParam(req);
    const data = await sequelize.query(
        `
		update games
		set p1score = 0,
		p2score = 0
		where id = ?;
    `,
        {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT,
        }
    );
	console.log(data);
    res.status(200).json(data);
}

async function win2(req, res) {
    const id = getIdParam(req);
    const data = await sequelize.query(
        `
		update games
		set p1score = 0,
		p2score = 1
		where id = ?;
    `,
        {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT,
        }
    );
	console.log(data);
    res.status(200).json(data);
}

async function win1(req, res) {
    const id = getIdParam(req);
    const data = await sequelize.query(
        `
		update games
		set p1score = 1,
		p2score = 0
		where id = ?;
    `,
        {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT,
        }
    );
	console.log(data);
    res.status(200).json(data);
}

async function update(req, res) {
	const id = getIdParam(req);

	const game_date = req?.body?.game_date.toString();
    const data = await sequelize.query(
        `
		update games
		set game_date = ?
		where id = ?;
    `,
        {
            replacements: [game_date, id],
            type: sequelize.QueryTypes.SELECT,
        }
    );
	res.status(200).end('{"success": true, "message": "success"}');
};

async function getById(req, res) {
    const id = getIdParam(req);
    const instrument = await models.instrument.findByPk(id);
    if (instrument) {
        res.status(200).json(instrument);
    } else {
        res.status(404).send("404 - Not found");
    }
}

module.exports = {
	getAll,
	win1,
	win2,
	reset,
	update,
};
