const sequelize = require("../sequelize");
const { pickRandom, randomDate } = require("./helpers/random");

async function reset() {
    console.log(
        "Will rewrite the SQLite example database, adding some dummy data."
    );

    await sequelize.sync({ force: true });

    await sequelize.models.user.bulkCreate([
        { username: "jack-sparrow" },
        { username: "white-beard" },
        { username: "black-beard" },
        { username: "brown-beard" },
    ]);

    await sequelize.models.orchestra.bulkCreate([
        { name: "Jalisco Philharmonic" },
        { name: "Symphony No. 4" },
        { name: "Symphony No. 8" },
    ]);

    year = await sequelize.models.year.create({
        year: "2078",
    });

    // await sequelize.models.classroom.bulkCreate([
    const classList = [
        { id: 1, className: "I" },
        { id: 2, className: "II" },
        { id: 3, className: "III" },
        { id: 4, className: "IV" },
        { id: 5, className: "V" },
        { id: 6, className: "VI" },
        { id: 7, className: "VII" },
        { id: 8, className: "VIII" },
        { id: 9, className: "IX" },
        { id: 10, className: "X" },
    ];

    classList.forEach(async (classroom) => {
        await year.createClassroom(classroom);
    });

    for (const classroom of await sequelize.models.classroom.findAll()) {
        const sections = ["A1", "A2", "A3", "A4"];
        sections.forEach(async (sec) => {
            await classroom.createSection({
                name: sec,
            });
        });
    }

    // Let's create random instruments for each orchestra
    /*
    for (const orchestra of await sequelize.models.orchestra.findAll()) {
        for (let i = 0; i < 10; i++) {
            const type = pickRandom([
                "violin",
                "trombone",
                "flute",
                "harp",
                "trumpet",
                "piano",
                "guitar",
                "pipe organ",
            ]);

            await orchestra.createInstrument({
                type: type,
                purchaseDate: randomDate(),
            });

            // The following would be equivalent in this case:
            // await sequelize.models.instrument.create({
            // type: type,
            // purchaseDate: randomDate(),
            // orchestraId: orchestra.id
            // });
        }
    }
    */

    console.log("Done!");
}

reset();
