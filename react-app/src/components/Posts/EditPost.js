import {  useEffect, useState } from 'react';

import {  useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editPost} from '../../store/posts';

const EditPost = ({postId}) =>{

    const dispatch = useDispatch()
    const history = useHistory()
    const [description, setDescription] = useState('')
    const [validationErrors,setValidationErrors] = useState([])
    const updateDescription = (e) => setDescription (e.target.value)

    useEffect(()=>{

        const errors = []


        if(description.length == 0)errors.push("Description can not be Empty")
        setValidationErrors(errors)
    },[ description])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const payload = {
            post_id:postId,
            description

        }
        console.log(payload,`<<<<<<<PAYLOAD_EDIT`)
        await dispatch(editPost(payload))

        history.push(`/posts/${postId}`)


    }
    return(
        <>
        <div>
            <form  onSubmit={handleSubmit}>
                <div className="form-errors">
                {validationErrors.map((error, int) => (<div key={int}>{error}</div>))}
        </div>
        <textarea
            className='form-input'
            name='description'
            onChange={updateDescription}/>

            <button className="primary-button form-submit" type='submit'>Done</button>

            </form>
        </div>

        </>
    )
}

export default EditPost
