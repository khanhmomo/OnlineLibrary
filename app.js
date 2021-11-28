const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require("path");

// Load schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

// Load db methods
const mongoDataMethods = require('./data/db')

// Connect to MongoDB
const connectDB = async () => {
	try {
		await mongoose.connect('mongodb+srv://admin:admin@cluster0.ruqba.mongodb.net/Cluster0?retryWrites=true&w=majority')

		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

connectDB()

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => ({ mongoDataMethods })
})


const app = express()
app.use(cors())
server.applyMiddleware({ app })

const PORT = process.env.PORT || 4000

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.listen(PORT, () =>
	console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
)