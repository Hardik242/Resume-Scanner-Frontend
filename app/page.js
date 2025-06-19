import Image from "next/image";
import DataUploader from "./_component/DataUploader";
export default function Home() {
    return (
        <>
            <div className="relative h-fit">
                <main className="px-3 py-4 bg-blue-600 flex flex-col items-center gap-3 md:gap-4 md:grid md:grid-cols-2 md:items-start h-fit">
                    <div className="text-white flex flex-col gap-3 md:gap-5 md:px-5 md:pt-14">
                        <h2 className="text-2xl md:text-3xl font-extrabold">
                            AI-Powered Precision for Perfect Matches
                        </h2>
                        <p className="text-lg md:text-xl ">
                            Swiftly analyze resumes, identify top talent, and
                            build your dream team with unparalleled accuracy.
                            Our AI agent delves deep beyond keywords, revealing
                            hidden skills and aligning candidates precisely with
                            your unique role requirements.
                        </p>
                    </div>
                    <div className="md:justify-self-center h-fit">
                        <Image
                            src="/ManCoding.png"
                            className="aspect-square size-64 md:size-[350px] lg:size-[480px]"
                            width={300}
                            height={300}
                            alt="coding"
                        />
                    </div>
                </main>
                <div className="h-[100px] bg-blue-600"></div>
                <div className="custom-shape-divider-bottom-1750244519">
                    <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none">
                        <path
                            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                            className="shape-fill"></path>
                    </svg>
                </div>
            </div>

            <DataUploader />
        </>
    );
}
