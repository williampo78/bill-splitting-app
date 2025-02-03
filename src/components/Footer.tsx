import {
	AiOutlineUsergroupAdd,
	AiOutlinePlus,
	AiOutlineUnorderedList,
	AiOutlineHome,
} from 'react-icons/ai';
import { BiLogOut } from "react-icons/bi";
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function Footer() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { code } = useParams();

	return (
		<>
			<footer className="px-4 py-1 flex justify-between items-center text-sm text-sage-500 fixed bottom-0 w-full bg-white z-10">
				<>
					<button
						onClick={() => {
							navigate('/');
						}}
						className="flex flex-col items-center"
					>
						<BiLogOut className="w-8 h-8 " />
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
					<button
						onClick={() => {
							navigate(`/group/${code}/bills/create`);
						}}
						className="flex flex-col items-center"
					>
						<AiOutlinePlus className="w-8 h-8" />
						新增項目
					</button>{' '}
				</>
			</footer>
		</>
	);
}

export default Footer;
