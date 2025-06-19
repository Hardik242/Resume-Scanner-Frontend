import {memo} from "react";
import ProgressStatus from "./ProgressStatus";

const statusOrder = [
    "uploading data",
    "analysing all resume",
    "converting to csv",
    "completed",
];

const ProgressBar = memo(function ProgressBar({status: currStatus, state}) {
    const isCompleted = !state;

    const currStatusIndex = statusOrder.indexOf(currStatus);

    return (
        <div className="py-3 text-xl">
            {statusOrder.map((status, index) => {
                if (index <= currStatusIndex) {
                    const inProgress = index === currStatusIndex ? true : false;

                    return (
                        <ProgressStatus
                            key={status}
                            status={status}
                            inProgress={inProgress}
                            isCompleted={isCompleted}
                        />
                    );
                }
            })}
        </div>
    );
});

export default ProgressBar;
