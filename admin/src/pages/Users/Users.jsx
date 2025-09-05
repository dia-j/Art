import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.css';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch users from backend
	const fetchUsers = async () => {
		try {
			setLoading(true);
			const response = await axios.get('http://localhost:4000/api/user/list');
			if (response.data.success) {
				setUsers(response.data.data);
			} else {
				setError(response.data.message || 'Failed to fetch users');
			}
		} catch (err) {
			setError('Network error');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUsers();
		// Poll every 5 seconds for real-time updates
		const interval = setInterval(fetchUsers, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="users-page">
			<h2>Registered Users</h2>
			{loading && <p>Loading users...</p>}
			{error && <p style={{color:'red'}}>{error}</p>}
			<div className="users-list">
				{users.length > 0 ? (
					<table className="users-table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{users.map(user => (
								<tr key={user._id}>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td style={{ color: user.banned ? '#c00' : '#007b3a', fontWeight: 500 }}>
										{user.banned ? 'Banned' : 'Active'}
									</td>
									<td>
										<button
											className={user.banned ? 'unban-btn' : 'ban-btn'}
											style={{
												padding: '6px 16px',
												borderRadius: '6px',
												border: 'none',
												background: user.banned ? '#007b3a' : '#c00',
												color: '#fff',
												cursor: 'pointer',
												fontWeight: 500
											}}
											onClick={async () => {
												try {
													const response = await axios.post('http://localhost:4000/api/user/ban', {
														userId: user._id,
														banned: !user.banned
													});
													if (response.data.success) {
														fetchUsers();
													} else {
														alert(response.data.message || 'Failed to update user status');
													}
												} catch (err) {
													alert('Network error');
												}
											}}
										>
											{user.banned ? 'Unban' : 'Ban'}
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No users found.</p>
				)}
			</div>
		</div>
	);
};

export default Users;
