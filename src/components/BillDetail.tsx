import { useState, useRef, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { useStore } from '@/stores/index';

function BillDetail() {
	const { users, groupInfo } = useStore();

	const { pathname } = useLocation();
	const createPage = useRef(pathname.includes('create'));
	const [item, setItem] = useState('');
	const [price, setPrice] = useState('');
	const [date, setDate] = useState(new Date());

	const [paidBy, setPaidBy] = useState<any>(null);
	const [sharedBy, setSharedBy] = useState<{ _id: string; name: string }[]>([]);

	console.log('paidBy', paidBy);
	const submitData = useMemo(() => {
		return {
			groupId: groupInfo._id,
			item: item,
			price: price,
			// paidBy: paidBy[0]?._id || '',
		};
	}, [item, price, paidBy]);

	const save = () => {
		console.log(submitData);
	};

	return (
		<div className="flex flex-col gap-3">
			<div>
				<label htmlFor="item">品項</label>
				<div className="px-3 py-2 border-2 border-gray-400 bg-white rounded-md overflow-hidden flex justify-between items-center">
					<input
						id="item"
						className="flex-1"
						type="text"
						value={item}
						onChange={(e) => {
							setItem(e.target.value);
						}}
					/>
				</div>
			</div>
			<div>
				<label htmlFor="price">金額</label>
				<div className="px-3 py-2 border-2 border-gray-400 bg-white rounded-md overflow-hidden flex justify-between items-center">
					<input
						id="price"
						className="flex-1"
						type="number"
						min={0}
						value={price}
						onChange={(e) => {
							setPrice(e.target.value);
						}}
					/>
				</div>
			</div>
			<div>
				<label htmlFor="">誰出錢</label>
				<Select
					className="w-full bg-white !border-2 !border-gray-400 !rounded-md h-12 !px-2"
					defaultValue={paidBy}
					onChange={setPaidBy}
					options={users}
				/>
				{/* <Select
					className="w-full bg-white !border-2 !border-gray-400 !rounded-md h-12 !px-2"
					options={users}
					labelField="name"
					valueField="_id"
					onChange={setPaidBy}
					values={paidBy}
					searchBy="name"
				/> */}
			</div>
			<div>
				<label htmlFor="sharedBy">分給誰</label>
				{/* <div className="px-3 py-2 border-2 border-gray-400 bg-white rounded-md overflow-hidden flex justify-between items-center">
					<input
						className="flex-1"
						type="text"
						value={item}
						onChange={(e) => {
							setItem(e.target.value);
						}}
					/>
				</div> */}
				<Select
					className="w-full bg-white !border-2 !border-gray-400 !rounded-md h-12 !px-2"
					options={users}
					labelField="name"
					valueField="_id"
					onChange={(values) => setSharedBy(values)}
					values={paidBy}
					searchBy="name"
					multi
				/>
			</div>
			<div>
				<label htmlFor="">日期</label>
				<div className="px-3 py-2 border-2 border-gray-400 bg-white rounded-md overflow-hidden flex justify-between items-center">
					<DatePicker selected={date} dateFormat="yyyy-MM-dd" onChange={(date) => setDate(date!)} />
				</div>
			</div>
			<div className="flex justify-center mt-4">
				<button
					onClick={() => {
						save();
					}}
					className="btn bg-sage-300"
				>
					{createPage.current ? '新增' : '儲存'}
				</button>
			</div>
		</div>
	);
}

export default BillDetail;
