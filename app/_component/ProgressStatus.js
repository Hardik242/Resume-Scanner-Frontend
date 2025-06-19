import Image from "next/image";
import CheckAnimation from "./CheckAnimation";

export default function ProgressStatus({status = "", inProgress, isCompleted}) {
    if (isCompleted) {
        inProgress = false;
    }
    return (
        <div className="flex gap-2 items-center relative py-2">
            <span
                className={`loader_spinner ${
                    !inProgress ? "!hidden" : ""
                }`}></span>
            <span className={`hidden ${!inProgress && "!inline"}`}>
                <CheckAnimation classData="size-7" />
            </span>

            <p>
                {status
                    ?.split(" ")
                    .map(
                        (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1) + " "
                    )}
            </p>
            <p className="text-red-400 hidden">Error</p>
        </div>
    );
}
