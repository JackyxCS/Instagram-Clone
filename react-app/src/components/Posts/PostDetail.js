import React, { useEffect, useState } from "react";
// import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllPosts } from '../../store/posts';
import { fetchComments } from '../../store/comments';
import FeatureImage from './FeatureImage.js'
import CommentsList from '../Comments/CommentsList.js'

import "./posts.css"
import CommentForm from "../Comments/CommentForm";

const PostDetail = () => {

    const dispatch = useDispatch()


    const { postId } = useParams();
    const posts = useSelector(state => state?.posts)
    const comments = useSelector(state => Object.values(state?.comments))
    // console.log(comments)
    const spotComments = comments.filter(comment => Number(comment.post_id) === Number(postId))
    // console.log(spotComments)
    const post = posts[postId];

    useEffect(() => {
        dispatch(fetchComments())
        dispatch(getAllPosts())
    }, [dispatch])

    const [featurePost, setFeaturePost] = useState('')


    useEffect(() => {
        if (featurePost === "" && post) {
            setFeaturePost(post.image_1)
        }
    }, [post, featurePost])


    if (post) {
        return (
            <div className="posts-detail-list-item">

                <FeatureImage image={featurePost} />

                <div className="post-detail-thumbnail-div">
                    <img className="thumbnail-image post-detail-photo1" src={post.image_1} alt="main mission" onClick={() => setFeaturePost(post.image_1)} />
                    {post.image_2 && <img className="thumbnail-image post-detail-photo2" src={post.image_2} alt="mission" onClick={() => setFeaturePost(post.image_2)} />}
                    {post.image_3 && <img className="thumbnail-image post-detail-photo3" src={post.image_3} alt="mission" onClick={() => setFeaturePost(post.image_3)} />}
                    {post.image_4 && <img className="thumbnail-image post-detail-photo4" src={post.image_4} alt="mission" onClick={() => setFeaturePost(post.image_4)} />}
                    {post.image_5 && <img className="thumbnail-image post-detail-photo5" src={post.image_5} alt="mission" onClick={() => setFeaturePost(post.image_5)} />}
                </div>
                {/* show only one heart or the other */}
                <div className="post-detail-likes-div">
                    <i class="fas fa-heart"></i>
                    <i class="far fa-heart"></i>
                    <p className="post-detail-like-count">{post.post_like_user_id_list.length} Likes</p>
                </div>

                <div className="post-detail-created-div">
                    {/* format date */}
                    <p className="post-detail-date">{post.created}</p>
                    {/* add user object to posts slice so we can display username similar to like count */}
                    <p className="post-detail-user">@{post.user_id}</p>
                </div>

                {post.description && <p className="post-detail-description">{post.description}</p>}

                {/* change from coordinates to city or map */}
                <div className="post-detail-map">
                    <p className="post-detail-location">Location: {post.post_lat}, {post.post_lng}</p>
                </div>

                <CommentsList />
                <CommentForm />

            </div>
        );
    } else {
        return null
    }


};

export default PostDetail;
