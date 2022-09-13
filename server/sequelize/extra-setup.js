const yearModel = require("./models/year.model");

function applyExtraSetup(sequelize) {
    /*
    const { instrument, orchestra } = sequelize.models;

    orchestra.hasMany(instrument);
    instrument.belongsTo(orchestra);
    */

    const { year, classroom, section, session, student, solution, mark, game, player } = sequelize.models;
    console.log(sequelize.models);

    year.hasMany(classroom);
    classroom.belongsTo(year);

    classroom.hasMany(section);
    section.belongsTo(classroom);

    section.hasMany(student);
    student.belongsTo(section);

    section.hasMany(session);
    session.belongsTo(section);

    session.hasMany(solution);
    solution.belongsTo(session)

    student.hasMany(solution);
    solution.belongsTo(student)

    session.hasMany(mark);
    mark.belongsTo(session)

    student.hasMany(mark);
    mark.belongsTo(student)

}

module.exports = { applyExtraSetup };
