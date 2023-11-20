import React, { useEffect, useState } from 'react'
// import DashboardTable from './DashboardTable'
import UserTableRow from './UserTableRow';
import Spinner from './Spinner'


function CustomersTableEl() {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        async function fetchAllUsers() {
            setIsLoading(true);
            const response = await fetch('https://api.tajify.com/api/users')
            const data = await response.json()
            setUsers(data.data.users);
            setIsLoading(false);
        }
        fetchAllUsers();

        
    }, []);

  return (
    <table>
        <thead>
            <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Followers</th>
                <th>Following</th>
                <th>Total Feeds</th>
                <th>Total Blogs</th>
            </tr>
        </thead>

        <tbody>
            {
                isLoading ? (<Spinner />) :
                (users.map(user => (
                    <UserTableRow fullname={user.fullName || user.username} email={user.email} followers={user.followers.length} following={user.following.length} totalBlogs={'-'} totalFeeds={'-'} />
                )))
            }
        </tbody>
    </table>
  )
}

export default CustomersTableEl;
