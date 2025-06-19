import Image from "next/image";
import {CSVLink} from "react-csv";

export default function CSVButton({data}) {
    return (
        <CSVLink
            data={data}
            className={`rounded-full w-full text-white flex gap-3 justify-center items-center hover:bg-blue-600 bg-blue-500 cursor-pointer text-lg font-bold md:w-xs md:text-xl px-4 py-4 mb-2 disabled:cursor-not-allowed disabled:hover:grayscale-50`}>
            <span>
                <Image
                    src="/download.png"
                    className="size-7 md:size-10 aspect-square"
                    width={35}
                    height={35}
                    alt="download"
                />
            </span>
            Download CSV file
        </CSVLink>
    );
}
