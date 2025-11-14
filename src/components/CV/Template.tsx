import React from "react";

export default function ResumeTemplate() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-[Vazirmatn] flex flex-col items-center py-12 px-4">
      {/* Header */}
      <header className="w-full max-w-3xl text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">نام شما</h1>
        <p className="text-gray-500">توسعه‌دهنده فرانت‌اند | طراح رابط کاربری</p>
      </header>

      {/* Info Section */}
      <section className="w-full max-w-3xl bg-white shadow-sm rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">اطلاعات شخصی</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p><span className="font-medium">📧 ایمیل:</span> example@email.com</p>
          <p><span className="font-medium">📞 شماره تماس:</span> 09123456789</p>
          <p><span className="font-medium">📍 شهر:</span> تهران</p>
          <p><span className="font-medium">💼 وضعیت شغلی:</span> فریلنسر</p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="w-full max-w-3xl bg-white shadow-sm rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">مهارت‌ها</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-100 px-3 py-2 rounded-xl text-center">Next.js</div>
          <div className="bg-gray-100 px-3 py-2 rounded-xl text-center">React.js</div>
          <div className="bg-gray-100 px-3 py-2 rounded-xl text-center">Tailwind CSS</div>
          <div className="bg-gray-100 px-3 py-2 rounded-xl text-center">TypeScript</div>
          <div className="bg-gray-100 px-3 py-2 rounded-xl text-center">Node.js</div>
          <div className="bg-gray-100 px-3 py-2 rounded-xl text-center">MongoDB</div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="w-full max-w-3xl bg-white shadow-sm rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">تجربیات کاری</h2>
        <ul className="space-y-4 text-sm">
          <li>
            <h3 className="font-medium">طراح رابط کاربری در Zonitech</h3>
            <p className="text-gray-500 text-sm">1402 - اکنون</p>
            <p className="mt-1 text-gray-700">طراحی صفحات وب واکنش‌گرا با تمرکز بر تجربه کاربری و سرعت بالا.</p>
          </li>
          <li>
            <h3 className="font-medium">توسعه‌دهنده فرانت‌اند آزاد</h3>
            <p className="text-gray-500 text-sm">1401 - 1402</p>
            <p className="mt-1 text-gray-700">ساخت پروژه‌های شخصی و همکاری در پروژه‌های تیمی.</p>
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="text-gray-400 text-xs mt-8">
        © {new Date().getFullYear()} نام شما - تمامی حقوق محفوظ است.
      </footer>
    </div>
  );
}
