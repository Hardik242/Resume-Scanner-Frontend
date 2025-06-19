import {useEffect, useState} from "react";

export default function ReportLog({data}) {
    const [dataArray, setDataArray] = useState([]);

    useEffect(() => {
        if (data) setDataArray((prevData) => [data, ...prevData]);
    }, [data]);

    return (
        <div className="border w-full bg-blue-100/60 max-h-[400px] font-bold rounded-md p-2 flex flex-col gap-2 relative">
            <p className="absolute top-0 left-0 p-3 text-lg w-full text-white bg-zinc-800/30 backdrop-blur-sm">
                Detailed Log:
            </p>
            <div className="overflow-y-auto no-scrollbar flex flex-col-reverse py-10">
                {dataArray.map((data, i) => (
                    <div key={i} className="flex gap-2">
                        <span>$=&gt;</span>
                        <p className="break-all">{data}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
