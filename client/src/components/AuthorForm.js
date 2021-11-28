import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { useMutation} from '@apollo/client'
import { getAuthors} from '../graphql-client/queries'
import { addSingleAuthor } from '../graphql-client/mutations'

const AuthorForm = () => {
    const [newAuthor, setNewAuthor] = useState ({
        name: '',
        age: ''
    })
    
    const {name, age} = newAuthor

    const onInputChange = event => {
        setNewAuthor ({
            ...newAuthor,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = event => {
        event.preventDefault()

        addAuthor({
            variables: {name, age: parseInt(age)},
            refetchQueries: [{query: getAuthors}]
        })
        
        setNewAuthor({name: '', age: ''})

        Swal.fire(
            'SUCCESSFUL',
            'You have successfully added a new author',
            'success'
        )
    }
    
    //GQL operation


    const[addAuthor, dataMutation] = useMutation(addSingleAuthor)

    //console.log(dataMutation)
    return (
        <Form onSubmit = {onSubmit}>
            <Form.Group className='invisible'>
                <Form.Control>
                </Form.Control>
            </Form.Group> 
            <Form.Group>
                <Form.Control type='text' placeholder='Author name' name='name' onChange={onInputChange} value={name}>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Control type='number' placeholder='Age' name='age' onChange={onInputChange} value={age}>
                </Form.Control>
            </Form.Group>
                
            <Button className='float-right' variant='info' type='submit'>
                Add Author
            </Button>
        </Form>
    )
}

export default AuthorForm