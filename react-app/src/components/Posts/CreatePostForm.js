import {  useEffect, useState } from 'react';

import { useSelector, useDispatch} from 'react-redux';
import { createPost, uploadPhoto } from '../../store/posts';

const CreatePostForm = () => {
    const dispatch = useDispatch()
    const user_id = useSelector(state => state.session.user.id)
    const currentMission = useSelector(state => Object.values(state.missionsReducer))
    const post_lat= currentMission[0].mission_lat
    const post_lng= currentMission[0].mission_lng
    const [image_1, setImage_1] = useState("")
    const [image_2, setImage_2] = useState()
    const [image_3, setImage_3] = useState()
    const [image_4, setImage_4] = useState()
    const [image_5, setImage_5] = useState()
    const [description, setDescription] = useState('')
    const [validationErrors,setValidationErrors] = useState([])
    console.log(user_id,`<<<<<<<USER_ID`)
    console.log(post_lat,`<<<<<<<CURRENT_MISSION!!`)

    const uploadFiles = e => {
        console.log(e.target.files[0],"<<<<<FILESSSSS")
        setImage_1(e.target.files[0])
        // setImage_2(e.target.files[0])
        // setImage_3(e.target.files[0])
        // setImage_4(e.target.files[0])
        // setImage_5(e.target.files[0])
    }

    const updateDescription = (e) => setDescription (e.target.value)

    useEffect(()=>{

        const errors = []

        if(!image_1)errors.push("Please include at least one photo")
        if(description.length< 0)errors.push("Description can not be Empty")
        setValidationErrors(errors)
    },[image_1, description])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const payload = {
            user_id,
            image_1,
            post_lat,
            post_lng,
            description
        }
        console.log(payload,`<<<<<<<PAYLOAD`)
        await dispatch(createPost(payload))
    }
    return(
        <>
        <div className="modal-wrapper-div">
            <form className="form-div" onSubmit={handleSubmit}>
                <div className="form-errors">
                {validationErrors.map((error, int) => (<div key={int}>{error}</div>))}
        </div>
            <input
            className='form-input'
            type='file'
            name='image_1'
            onChange={uploadFiles}
            />

            <textarea
            className='form-input'
            name='description'
            onChange={updateDescription}/>

            <button className="primary-button form-submit" type='submit'>Post Mission</button>

            </form>
        </div>

        </>
    )
}

export default CreatePostForm
