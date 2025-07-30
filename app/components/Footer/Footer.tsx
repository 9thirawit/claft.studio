export default function Footer() {
    const sendEmail = () => {
        const email = 'thirawit@claft.studio';
        window.location.href = `mailto:${email}`;
    };

    return (
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center ">
            <div className="font-mono list-inside list-decimal text-xs/4 text-center sm:text-center">
                <p className="mb-2 tracking-[-.01em]">&quot;we are hand-crafted software studio&quot;</p>
                <p className="mb-2 tracking-[-.01em] pointer"
                    onClick={sendEmail}
                >
                    thirawit@claft.studio
                </p>
            </div>
        </footer>
    );
}