

import React from 'react'

function UserTableRow({ fullname, email, followers, following, totalFeeds, totalBlogs}) {
    return (
        <tr>
            <td>{fullname}</td>
            <td>{email}</td>
            <td>{followers}</td>
            <td>{following}</td>
            <td>{totalFeeds}</td>
            <td>{totalBlogs}</td>
        </tr>
    );
}

export default UserTableRow;
