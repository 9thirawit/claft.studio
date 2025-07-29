import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center">
        <div className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-center">
          <p className="mb-2 tracking-[-.01em]">
            claft.studio
          </p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <div className="font-mono list-inside list-decimal text-xs/4 text-center sm:text-center">
          <p className="mb-2 tracking-[-.01em]">{"we are hand-crafted software studio"}</p>
        </div>
      </footer>
    </div>
  );
}
