const  resolvers = {
    // QUERY
    Query: {
		books: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllBooks(),
		book: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getBookByID(id),

		authors: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllAuthors(),
		author: async (parent, { id }, { mongoDataMethods }) =>
			await mongoDataMethods.getAuthorByID(id)
	},

	Book: {
		author: async ({ authorID }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAuthorByID(authorID)
	},

	Author: {
		books: async ({ id }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllBooks({ authorID: id })
	},

    //MUTATION
    Mutation: {
        createAuthor: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.createAuthor(args),
        createBook: async (parent, args, {mongoDataMethods}) => await mongoDataMethods.createBook(args)
    }
}

module.exports = resolvers