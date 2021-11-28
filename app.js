const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const cors = require('cors')

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

// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:4000', 'http://localhost:8080', 'momolibrary.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const app = express()
app.use(cors())
server.applyMiddleware({ app })

const PORT = process.env.PORT || 4000

if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
	app.get('*', function(req, res) {
	  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	});
  }

app.listen(PORT, () =>
	console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
)