import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PhotoGrid from './PhotoGrid';

function User() {
    // const [user, setUser] = useState({});
    // useEffect(() => {
    //     if (!userId) {
    //     return;
    //     }
    //     (async () => {
    //     const response = await fetch(`/api/users/${userId}`);
    //     const user = await response.json();
    //     setUser(user);
    //     })();
    // }, [userId]);

    const { userId }  = useParams();
    const user = useSelector(state => state.session.user);

    if (!user) {
        return null;
    }

    // userId is string and user.id is integer
    if (Number(userId) === Number(user.id)) {
        return (
            <div>
                <h1>{user.username}'s profile page</h1>
                <p>You can only see this personal info it is your page</p>
                <div>
                    <strong>username:</strong> {user.username}
                </div>
                <div>
                    <strong>email:</strong> {user.email}
                </div>
                <h2>Give this PhotoGrid some query props!</h2>
                <PhotoGrid />
            </div>
        );
    } else {
        return (
            <div>
            <h1>{user.username}'s profile page</h1>
            <h2>Give this PhotoGrid some query props!</h2>
            <PhotoGrid />
        </div>
        )

    }

}
export default User;
