function Index() {
  return (
    <>
      <div className="h-full flex flex-col justify-center items-center md:w-auto max-w-[620px] mx-auto">
        <h1 className="text-2xl text-center mb-2">請輸入共享碼</h1>
        <div className="h-12 w-full bg-gray-100 rounded-md border-2 border-zinc-400">
          <input
            type="text"
            className="h-full w-full bg-transparent p-2"
            placeholder="共享碼"
          />
        </div>
        <button className="py-2 px-3 rounded-md bg-sage-300 text-white text-lg my-3">
          送出
        </button>
        <p className="text-xl text-center my-3">或</p>
        <button className="py-2 px-3 rounded-md bg-teal-300 text-white text-lg my-3">
          創建新帳本
        </button>
      </div>
    </>
  );
}

export default Index;
