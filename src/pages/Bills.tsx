import { useEffect, useState } from 'react';
import { getBillsAPi } from '@/api/bill';
import { useParams } from 'react-router-dom';
import { AiOutlineUsergroupAdd,AiOutlinePlus  } from 'react-icons/ai';
interface Bill {
	_id: string;
	item: string;
	groupId: string;
	createdAt: string;
	updatedAt: string;
}
function Bills() {
	let { code } = useParams();
	const [bills, setBills] = useState<Bill[]>([]);

	useEffect(() => {
		console.log(123456);

		getBills();
	}, []);

	const getBills = async () => {
		const { data } = await getBillsAPi({ code: code as string });
		setBills((data.bills as Bill[]) || []);
		console.log(bills);
	};

	return (
		<div className='max-w-[900px] mx-auto'>
			<ul className="flex flex-col gap-2">
				{bills.map((bill, index) => (
					<li
						key={index}
						className="py-3 px-2 border-2 border-gray-400 bg-white rounded-md overflow-hidden"
					>
						{bill.item}
					</li>
				))}
			</ul>
			<div className="fixed right-8 bottom-24">
				<button className="w-12 h-12 text-white rounded-full bg-sage-500 flex justify-center items-center">
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
