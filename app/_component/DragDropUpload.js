import Image from "next/image";
import {useCallback} from "react";
import {useDropzone} from "react-dropzone";

export default function DragDropUpload({
    fileType,
    setFile,
    setError,
    iconSrc,
    setIsFileChange,
}) {
    const onDropAccepted = useCallback(
        (acceptedFiles) => {
            setFile(acceptedFiles[0]);
            setError(null);
            setIsFileChange(true);
        },
        [setFile, setError, setIsFileChange]
    );

    const onDropRejected = useCallback(
        (error) => {
            console.log(error);
            setError(error[0]?.errors[0]?.message);
        },
        [setError]
    );

    const accept =
        fileType === "csv" ? {"text/csv": [".csv"]} : {"text/plain": [".txt"]};

    const {getRootProps, getInputProps} = useDropzone({
        onDropAccepted,
        onDropRejected,
        accept,
    });

    return (
        <div
            className="border-2 border-dashed rounded-2xl h-48 bg-slate-200/50 backdrop-blur-md flex flex-col cursor-pointer text-black hover:font-bold hover:bg-slate-300/50 justify-center items-center gap-3"
            {...getRootProps()}>
            <input {...getInputProps()} />
            <span className="flex gap-2">
                <Image
                    src="/upload.png"
                    width={40}
                    height={40}
                    className="aspect-square"
                    alt="upload"
                />
                <Image
                    src={iconSrc}
                    className="size-10 aspect-square"
                    width={35}
                    height={35}
                    alt="download"
                />
            </span>
            <p className="text-md px-2 text-center">
                Drag &apos;n&apos; drop some files here, or click to select
                files
            </p>
            <p className="text-red-500 text-sm">*{fileType || ""} only</p>
        </div>
    );
}
