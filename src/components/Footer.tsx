import Parallax from "@/components/Parallax";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-navy-700 bg-navy-950"
    >
      <Parallax
        speed={0.05}
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 font-mono text-sm">
          <span className="text-slate-500">Zenn(書籍・技術記事)</span>
          <a
            href="https://zenn.dev/ekusibhrm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            zenn.dev/ekusibhrm ↗
          </a>
        </div>

        <div className="flex flex-col gap-2 font-mono text-sm sm:items-end">
          <span className="text-slate-500">連絡先</span>
          <a
            href="https://github.com/ekusibhrm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            GitHub経由でご連絡ください ↗
          </a>
        </div>
      </div>

      <div className="border-t border-navy-800 px-6 pb-28 pt-5 text-left text-xs text-slate-600 xl:pb-5 xl:text-center">
        © {year}{" "}Hiromu — Built with Next.js &amp; Tailwind CSS
      </div>
    </footer>
  );
}
