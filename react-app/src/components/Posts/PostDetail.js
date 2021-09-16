import React, { useEffect } from "react";
// import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams} from 'react-router-dom';
import { getAllPosts } from '../../store/posts';
import DeletePost from "./DeletePost";
import EditPostModal from "./EditPostModal";
import "./posts.css"

const PostDetail = () => {

    const dispatch = useDispatch()
    const posts = useSelector(state => state?.posts)
    const userId = useSelector(state => state?.session.user.id)
    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    const { postId } = useParams();
    const post = posts[postId];

    const postUser = post?.user_id

    let EditShow
    let DeleteShow
    if(userId == postUser){
        EditShow=(
            <>
            <EditPostModal postId={postId}/>
            </>
        )
        DeleteShow=(
            <>
            <DeletePost postId={postId}/>
            </>
        )

    }else{
        EditShow=(
        <>
        </>
        )
        DeleteShow=(
            <>
            </>
        )
    }

    if (post) {
        return (
            <div className="posts-detail-list-item">
                <img className="post-detail-photo1" src={post.image_1} alt="main mission" />
                {post.image_2 && <img className="post-detail-photo2" src={post.image_2} alt="mission" />}
                {post.image_3 && <img className="post-detail-photo3" src={post?.image_3} alt="mission" />}
                {post.image_4 && <img className="post-detail-photo4" src={post.image_4} alt="mission" />}
                {post.image_5 && <img className="post-detail-photo5" src={post.image_5} alt="mission" />}
                {post.description && <p className="post-detail-description">{post.description}
                {EditShow}
                </p>}

                <p className="post-detail-location">Location: {post.post_lat}, {post.post_lng}</p>
                <p className="post-detail-date">Completed: {post.created}</p>
                <p className="post-detail-user">Created by: {post.userId}</p>

                <p className="post-detail-user"> Would you like to Delete This Mission?
                {DeleteShow}
                </p>
            </div>
        );
    } else {
        return null
    }


};

export default PostDetail;
