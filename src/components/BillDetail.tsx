import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Select from 'react-dropdown-select';

function BillDetail() {
	const { pathname } = useLocation();
	const createPage = useRef(pathname.includes('create'));
	const [item, setItem] = useState('');
	const [price, setPrice] = useState('');
	const [date, setDate] = useState(new Date());
	const options = [
		{ id: 1, name: 'John' },
		{ id: 2, name: 'Max' },
		{ id: 3, name: 'Jason' },
	];

	const [selectedUser, setSelectedUser] = useState<{ id: number; name: string }[]>([]);

	const save = () => {
		console.log(date);
	};

	return (
		<div className="flex flex-col gap-3">
			<div>
				<label htmlFor="">品項</label>
				<div className="px-3 py-2 border-2 border-gray-400 bg-white rounded-md overflow-hidden flex justify-between items-center">
					<input
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
				<label htmlFor="">金額</label>
				<div className="px-3 py-2 border-2 border-gray-400 bg-white rounded-md overflow-hidden flex justify-between items-center">
					<input
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
					options={options}
					labelField="name"
					valueField="id"
					onChange={(values) => setSelectedUser(values)}
					values={selectedUser}
					searchBy='name'
				/>
			</div>
			<div>
				<label htmlFor="">分給誰</label>
				<div className="px-3 py-2 border-2 border-gray-400 bg-white rounded-md overflow-hidden flex justify-between items-center">
					<input
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
