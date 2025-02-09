import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { showGroupApi } from '@/api/group';
import { useStore } from '@/stores/index';

function Index() {
	const { setHeaderTitle, setGroupInfo, setUsers, getGroupInfo } = useStore();

	const navigate = useNavigate();
	const [code, setCode] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		setHeaderTitle('');
	}, []);

	const searchGroup = async () => {
		if (code) {
			setErrorMessage('');
			try {
				await getGroupInfo(code);
				navigate(`/group/${code}/bills`);
			} catch (error: any) {
				setErrorMessage(error.message);
			}
			// try {
			// 	const { data } = await showGroupApi({ code });
			// 	setGroupInfo(data);
			// 	setUsers(data.users);
			// 	const message = error.response?.data?.error || '';
			// 	setErrorMessage(message);
			// }
		}
	};
	return (
		<>
			<div className="flex flex-col justify-center items-center md:w-auto max-w-[620px] mt-10 mx-auto">
				<h1 className="text-2xl text-center mb-2">請輸入群組代碼</h1>
				<div className="h-12 w-full bg-gray-100 rounded-md border-2 border-zinc-400">
					<input
						value={code}
						onChange={(e) => {
							setCode(e.target.value);
						}}
						type="text"
						className="h-full w-full bg-transparent p-2"
						placeholder="代碼"
					/>
				</div>
				<button
					onClick={() => {
						searchGroup();
					}}
					className="py-2 px-3 rounded-md bg-sage-300 text-white text-lg my-3"
				>
					送出
				</button>
				{errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
				<p className="text-xl text-center">或</p>
				<button
					onClick={() => {
						navigate('/group/create');
					}}
					className="py-2 px-3 rounded-md bg-teal-300 text-white text-lg mt-3"
				>
					創建群組
				</button>
			</div>
		</>
	);
}

export default Index;
