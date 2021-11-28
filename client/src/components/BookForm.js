import React, {useState} from 'react'
import Swal from 'sweetalert2'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import {useQuery, useMutation} from '@apollo/client'
import { getAuthors, getBooks } from '../graphql-client/queries'
import { addSingleBook } from '../graphql-client/mutations'

const BookForm = () => {
    const [newBook, setNewBook] = useState ({
        name: '',
        genre: '',
        authorID: ''
    })
    
    const {name, genre, authorID} = newBook

    const onInputChange = event => {
        setNewBook ({
            ...newBook,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = event => {
        event.preventDefault()

        addBook({
            variables: {name, genre, authorID},
            refetchQueries: [{query: getBooks}]
        })
        
        setNewBook({name: '', genre: '', authorID: ''})

        Swal.fire(
            'SUCCESSFUL',
            'You have successfully added a new book',
            'success'
        )
    }
    
    //GQL operation
    const {loading, error, data} = useQuery(getAuthors)

    const[addBook, dataMutation] = useMutation(addSingleBook)

    //console.log(dataMutation)
    return(
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Control type='text' placeholder='Book name' name='name' onChange={onInputChange} value={name}>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Control type='text' placeholder='Book genre' name='genre' onChange={onInputChange} value={genre}>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                        
                {loading ? (
                    <p>Loading author</p>
                ) : (    
                    <Form.Control as='select' name='authorID' onChange={onInputChange} value={authorID}>
                        <option value='' disabled>Select author</option>
                        {data.authors.map(author => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </Form.Control>
                )}
            </Form.Group>
            <Button className='float-right' variant='info' type='submit'>
                Add Book
            </Button>
        </Form>
    )
}

export default BookForm