import {
	AiOutlineUsergroupAdd,
	AiOutlinePlus,
	AiOutlineUnorderedList,
	AiOutlineHome,
} from 'react-icons/ai';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function Footer() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { code } = useParams();

	return (
		<>
			{pathname !== '/' && (
				<footer className="px-4 py-1 flex justify-between items-center text-sm text-sage-500 fixed bottom-0 w-full bg-white">
					<>
						<button
							onClick={() => {
								navigate('/');
							}}
							className="flex flex-col items-center"
						>
							<AiOutlineHome className="w-8 h-8 " />
							返回首頁
						</button>
						<button
							onClick={() => {
								navigate(`/group/${code}/bills`);
							}}
							className="flex flex-col items-center"
						>
							<AiOutlineUnorderedList className="w-8 h-8 " />
							帳務列表
						</button>
						<button
							onClick={() => {
								navigate(`/group/${code}/users`);
							}}
							className="flex flex-col items-center"
						>
							<AiOutlineUsergroupAdd className="w-8 h-8 " />
							編輯成員
						</button>
						<button className="flex flex-col items-center">
							<AiOutlinePlus className="w-8 h-8" />
							新增帳本
						</button>{' '}
					</>
				</footer>
			)}
		</>
	);
}

export default Footer;
