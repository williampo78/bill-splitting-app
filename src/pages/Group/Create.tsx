import { useNavigate } from "react-router-dom";

function GroupCreate() {
	const navigate = useNavigate();
	return (
		<>
			<div className="h-full flex flex-col justify-center items-center md:w-auto max-w-[620px] mx-auto">
				<h1 className="text-2xl text-center mb-2">創建帳本</h1>
				<div className="h-12 w-full bg-gray-100 rounded-md border-2 border-zinc-400">
					<input type="text" className="h-full w-full bg-transparent p-2" placeholder="請輸入帳本名稱" />
				</div>
				<div className="flex gap-2 mt-2">
					<button onClick={()=>{
						navigate('/')
					}} className="py-2 px-3 rounded-md bg-gray-500 text-white text-lg my-3">取消</button>
					<button className="py-2 px-3 rounded-md bg-sage-300 text-white text-lg my-3">送出</button>
				</div>
			</div>
		</>
	);
}

export default GroupCreate;
