import React, { useEffect } from 'react'
import listItem from './ListItem'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersAsync } from '../redux/usersSlice';

const UserList = () => {
    const dispatch = useDispatch();
    const { users, status } = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(fetchUsersAsync());
    }, [dispatch]);

    console.log('users', users)

    return (
        <div>
            <div className='text-4xl font-bold'>Users</div>
            <div className="my-7 grid grid-cols-4 gap-2">
                {
                    status === 'loading' && <div>Loading...</div>
                }
                {
                    users?.map((user) => (
                        <listItem key={user.id} user={user} />
                    ))
                }
            </div>
        </div>
    )
}

export default UserList