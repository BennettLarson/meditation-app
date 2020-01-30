const graphql = require('graphql');
const User = require('./mongo-models/user');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLBoolean,
	GraphQLSchema,
	GraphQLID,
	GraphQLFloat,
	GraphQLList,
	GraphQLNonNull,
} = graphql;

const UserType = new GraphQLObjectType({
	name: 'user',
	fields: () => ({
		id: {
			type: GraphQLID,
		},
		name: {
			type: GraphQLString,
		},
		username: {
			type: GraphQLString,
		},
		password: {
			type: GraphQLString,
		},
		loggedIn: {
			type: GraphQLString,
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: {
				id: {
					type: GraphQLID,
				},
			},
			resolve(parent, args) {
				return User.findById(args.id);
			},
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return User.find({});
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addUser: {
			type: UserType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString),
				},
				username: {
					type: new GraphQLNonNull(GraphQLString),
				},
				password: {
					type: new GraphQLNonNull(GraphQLString),
				},
				loggedIn: {
					type: new GraphQLNonNull(GraphQLBoolean),
				},
			},
			resolve(parent, args) {
				let user = new User({
					name: args.name,
					username: args.username,
					password: args.password,
					loggedIn: args.loggedIn,
				});
				return user.save();
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
