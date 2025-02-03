import { useEffect, useState } from 'react';
import { updateGroupUsersApi, getGroupUsersApi } from '@/api/group';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useStore } from '@/stores/index';
import { toast } from 'react-toastify';

function Users() {
	const { setHeaderTitle, users, setUsers, groupInfo } = useStore();

	const [copiedUsers, setCopiedUsers] = useState(users?.length ? users : [{ name: '' }]);

	useEffect(() => {
		setHeaderTitle('編輯成員');
	}, []);

	const updateUsers = async () => {
		const everyUserHasName = copiedUsers.every((user) => user.name);
		if (!everyUserHasName) {
			toast.error('請填寫所有成員名稱');
			return;
		}
		try {
			await updateGroupUsersApi(groupInfo._id, { users: copiedUsers });
			const { data } = await getGroupUsersApi(groupInfo._id);
			setUsers(data);
			toast.success('群組成員已更新');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="max-w-[900px] mx-auto">
			<ul className="flex flex-col gap-2">
				{copiedUsers.map((user, index) => (
					<li
						key={index}
						className="px-3 py-2 border-2 border-gray-400 bg-white rounded-md overflow-hidden flex justify-between items-center"
					>
						<input
							className="flex-1"
							type="text"
							value={user.name}
							onChange={(e) => {
								const _users = [...copiedUsers];
								_users[index].name = e.target.value;
								setCopiedUsers(_users);
							}}
						/>
						{copiedUsers.length > 1 && (
							<button
								onClick={() => {
									const _users = [...copiedUsers];
									setCopiedUsers(_users.filter((_, i) => i !== index));
								}}
								className="btn bg-red-600 "
							>
								<FaRegTrashAlt />
							</button>
						)}
					</li>
				))}
			</ul>
			<div className="flex justify-center mt-6 gap-2">
				<button
					onClick={() => {
						const _users = [...copiedUsers];

						if (_users.at(-1)?.name) {
							_users.push({ name: '' });
							setCopiedUsers(_users);
						}
					}}
					className="btn bg-teal-300"
				>
					增加成員
				</button>
				<button
					onClick={() => {
						updateUsers();
					}}
					className="btn bg-sage-300 "
				>
					儲存
				</button>
			</div>
		</div>
	);
}

export default Users;
