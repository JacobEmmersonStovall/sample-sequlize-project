const Sequelize = require("sequelize");

const sequelize = new Sequelize("test", "root", undefined, {
	host: "localhost",
	dialect: "mysql"
});

const User = sequelize.import(__dirname + "/models/User");
const Group = sequelize.import(__dirname + "/models/Group")
const Event = sequelize.import(__dirname + "/models/Event")

Group.hasMany(Event);
Event.belongsTo(Group);

User.belongsToMany(Group, {through: 'GroupAffiliations'});
Group.belongsToMany(User, {through: 'GroupAffiliations'});

async function processData(){
	await sequelize.sync({force: true});
	console.log("Database sync'd");
	var jacobstovall = await User.create({firstname: "Jacob", lastname: "Stovall"});
	var tonydanza = await User.create({firstname: "Tony", lastname: "Danza"});
	console.log("Users created");
	var coolGroup = await Group.create({
		name: "Group of Cool People", 
		description: "We all cool",
	});
	var extraGroup = await Group.create({
		name: "Group of Extra People", 
		description: "We all extra",
	});
	console.log("Groups added");
	await coolGroup.addUser(jacobstovall);
	await coolGroup.addUser(tonydanza);
	await extraGroup.addUser(jacobstovall);
	var coolEvent = await Event.create({
		name: "Cool event",
		description: "Cool event for cool people",
		start: "2021-11-15 12:00:00",
		end: "2021-11-15 17:00:00",
		meetingGroupId: coolGroup.id
	});
	console.log("Event Created");
	console.log("Done!!!!");
};

processData();