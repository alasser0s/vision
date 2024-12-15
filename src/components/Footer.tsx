
const Footer = () => {
  return ( 
    <div className=' w-full h-[250px] bg-[#4A53D1]
'>

  
    <div className=' items-center flex justify-center relative -1/2'>

    <div className=' w-full h-[247px] grid grid-cols-3 text-white divide-x'>
      <div className="flex flex-col items-center pt-10 pr-80 ">
        <h1 className="mb-2 text-[20px]">قوائم</h1>
        <a href="#" className="mb-1">للاعلان</a>
        <a href="#" className="mb-1">ملاحظات</a>
        <a href="#">تواصل مع الفريق</a>
      </div>
      <div className="flex flex-col items-center p-6">
        <h1 className=" text-[56px]">Vision</h1>
        <p className="mb-4">عنوانك للمعرفة</p>

      </div>
      <div className="flex flex-col items-center p-10 pl-[350px]">
        <h1 className="mb-2 text-[20px]">للتواصل</h1>
        <a href="https://instagram.com/the_sarsor" target="_blank" rel="noopener noreferrer">@the_sarsor</a>
      </div>
      <div className="col-span-3 text-center mt-4">
        <p>Copyright 2024 <a href="#" className="underline">team vision</a>. All Rights Reserved. Use of the site is governed by our <a href="#" className="underline">Terms of Use</a> and <a href="#" className="underline">Privacy Policy</a>.</p>
      </div>
    </div>
    </div>
  </div>
  );
};

export default Footer;