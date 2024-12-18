const Footer = () => {
  return (
    <div className='w-full bg-[#4A53D1]'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 text-white py-8 gap-8'>
          {/* Lists Section */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h1 className="text-xl md:text-2xl mb-4">قوائم</h1>
            <a href="#" className="hover:text-gray-200 transition-colors">للاعلان</a>
            <a href="#" className="hover:text-gray-200 transition-colors">ملاحظات</a>
            <a href="#" className="hover:text-gray-200 transition-colors">تواصل مع الفريق</a>
          </div>

          {/* Vision Section */}
          <div className="flex flex-col items-center text-center order-first md:order-none">
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-2">Vision</h1>
            <p className="text-lg">عنوانك للمعرفة</p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-end space-y-2">
            <h1 className="text-xl md:text-2xl mb-4">للتواصل</h1>
            <a 
              href="https://instagram.com/sono.rar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-colors"
            >
              @sono.rar
            </a>
          </div>

          {/* Copyright Section */}
          <div className="col-span-1 md:col-span-3 text-center mt-8 text-sm border-t border-white/20 pt-6">
            <p className="px-4">
              Copyright 2024 {' '}
              <a href="#" className="underline hover:text-gray-200">team vision</a>
              . All Rights Reserved. Use of the site is governed by our {' '}
              <a href="#" className="underline hover:text-gray-200">Terms of Use</a>
              {' '} and {' '}
              <a href="#" className="underline hover:text-gray-200">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;