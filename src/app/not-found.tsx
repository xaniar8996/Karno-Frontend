
export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex items-center justify-center px-6">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm" dir="rtl">
        <p className="text-xs font-semibold tracking-[0.3em] text-red-300/80 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_0_6px_rgba(16,185,129,0.2)]" />
          ۴۰۴
        </p>

        <div className="mt-6 space-y-3">
          <h1 className="text-2xl font-semibold text-white">اینجا خبری نیست!</h1>
          <p className="text-sm leading-7 text-slate-300">
            صفحه‌ای که دنبالش بودی پیدا نشد. شاید جابه‌جا شده یا آدرس را اشتباه
            وارد کردی. بیا برگردیم به مسیر درست.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="/"
            className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
          >
            صفحه اصلی
          </a>
        </div>
      </section>
    </main>
  );
}