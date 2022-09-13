const sequelize = require("../../sequelize");
const { models } = require("../../sequelize");
const { getIdParam } = require("../helpers");

async function getAll(req, res) {
    const data = await sequelize.query(
        `
with tbl as (        
	select p.id, p.name, p.grp,
		sum(
			case
				when (g.p1id = p.id and p1score = 1) or (g.p2id = p.id and p2score = 1) then 1
				else 0
			end		
		) as win,
		sum(
			case
				when (g.p1id = p.id and p2score = 1) or (g.p2id = p.id and p1score = 1) then 1
				else 0
			end
		) as loss
	from players p
	left outer join games g
		on g.p1id = p.id
		or g.p2id = p.id
	group by p.id, p.name, p.grp
)
select * from tbl
order by win - loss desc, id asc;
    `,
        {
            type: sequelize.QueryTypes.SELECT,
        }
    );
    res.status(200).json(data);
}

module.exports = {
	getAll
};
