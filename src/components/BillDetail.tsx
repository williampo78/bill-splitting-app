import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function BillDetail() {
	const { pathname } = useLocation();
	const createPage = useRef(pathname.includes('create'));
	const [item, setItem] = useState('');
    const [price,setPrice] = useState('');

	return (
		<>
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
				<label htmlFor="">時間</label>
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
			<div className="flex justify-center mt-4">
				<button className="btn bg-sage-300">{createPage.current ? '新增' : '儲存'}</button>
			</div>
		</>
	);
}

export default BillDetail;
