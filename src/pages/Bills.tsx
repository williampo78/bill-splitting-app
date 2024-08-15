import { useEffect, useState } from 'react';
import { getBillsAPi } from '@/api/bill';
import { useParams,useNavigate } from 'react-router-dom';
import { AiOutlineUsergroupAdd, AiOutlinePlus, AiTwotoneEdit } from 'react-icons/ai';
import { useStore } from '@/stores/index';
interface Bill {
	_id: string;
	item: string;
	groupId: string;
	createdAt: string;
	updatedAt: string;
}
function Bills() {
	const navigate = useNavigate();
	const { setHeaderTitle } = useStore();

	let { code } = useParams();
	const [bills, setBills] = useState<Bill[]>([]);

	useEffect(() => {
		getBills();
	}, []);

	const getBills = async () => {
		const { data } = await getBillsAPi({ code: code as string });
		setBills((data.bills as Bill[]) || []);
		setHeaderTitle(data.headerTitle || '');
	};

	return (
		<div className="max-w-[900px] mx-auto">
			<ul className="flex flex-col gap-2">
				{bills.map((bill, index) => (
					<li
						key={index}
						className="p-3 border-2 border-gray-400 bg-white rounded-md overflow-hidden flex  justify-between items-center"
					>
						<span className="text-lg">{bill.item}</span>
						<button>
							<AiTwotoneEdit className="w-6 h-6 text-gray-400" />
						</button>
					</li>
				))}
			</ul>
			<div className="fixed right-8 bottom-24">
				<button onClick={()=>{
					navigate(`/group/${code}/users`)
				}} className="w-12 h-12 text-white rounded-full bg-sage-500 flex justify-center items-center">
					<AiOutlineUsergroupAdd className="w-8 h-8" />
				</button>
				<button className="mt-2 w-12 h-12 text-white rounded-full bg-sage-300 flex justify-center items-center">
					<AiOutlinePlus className="w-8 h-8" />
				</button>
			</div>
		</div>
	);
}

export default Bills;
