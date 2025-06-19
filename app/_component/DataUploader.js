"use client";

import Image from "next/image";
import Papa from "papaparse";
import {useEffect, useState} from "react";
import io from "socket.io-client"; // Import socket.io-client
import CheckAnimation from "./CheckAnimation";
import CSVButton from "./CSVButton";
import DragDropUpload from "./DragDropUpload";
import ProgressBar from "./ProgressBar";
import ReportLog from "./ReportLog";

let socket;

const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function DataUploader() {
    const [csvFile, setCsvFile] = useState(null);
    const [textFile, setTextFile] = useState(null);

    const [csvError, setCsvError] = useState(null);
    const [textError, setTextError] = useState(null);

    //Statuses: fetching resume, matching with job description, converting to csv, completed
    //StatusProgress: in progress, completed
    const [isLoading, setIsLoading] = useState({
        state: false,
        status: "",
        report: "",
    });
    const [isCompleted, setIsCompleted] = useState(false);

    const [finalProcessedData, setFinalProcessedData] = useState(null);

    /**
     * useEffect Hook for Socket.IO Connection and Event Listeners
     * Establishes and manages the WebSocket connection.
     */
    useEffect(() => {
        // Initialize Socket.IO connection only once when the component mounts
        // If 'socket' is already defined, it means connection was established.
        if (!socket) {
            // Connects to the same host/port that served the page (e.g., http://localhost:3000)
            socket = io(BACKEND_URL);

            socket.on("connect", () => {
                console.log("Connected to backend socket successfully!");
            });

            // Listener for real-time progress updates from the backend
            socket.on("processingUpdate", (data) => {
                setIsLoading((prev) => ({
                    ...prev,
                    status: data.status || prev.status,
                    report: data.report || prev.report,
                }));
            });

            // Listener for processing completion and final data from the backend
            socket.on("processingComplete", async (data) => {
                console.log(data.finalData);
                setIsLoading((prev) => ({
                    state: false,
                    status: "completed",
                    report: data.report || prev.report,
                })); // Stop loading, set final status
                setIsCompleted(true); // Mark as completed
                setFinalProcessedData(data.finalData); // Store the final processed data
            });

            // Listener for errors from the backend
            socket.on("processingError", (error) => {
                console.error("Backend processing error:", error.message);
                setIsLoading({state: false, report: `Error: ${error.message}`}); // Display error
                setIsCompleted(false); // Ensure completion state is false on error
                setFinalProcessedData(null);
            });
        }

        // Cleanup function: Disconnect socket when component unmounts
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    async function handleDataUpload(parsedCsv, parsedTxt) {
        if (!socket || !socket.connected) {
            console.error(
                "Socket not initialized or not connected. Please check server status."
            );
            setIsLoading({
                state: false,
                status: "Error: Server not connected.",
            });
            return;
        }

        setIsLoading({
            state: true,
            status: "uploading data",
            report: "Uploading data to server...",
        });
        setFinalProcessedData(null); // Clear previous results
        setIsCompleted(false); // Reset completion status

        // Emit the 'startProcessing' event to the backend with the parsed data
        socket.emit("startProcessing", {
            csvData: parsedCsv,
            txtData: parsedTxt,
        });
    }

    function handleParse() {
        if (!csvFile || !textFile) {
            setCsvError(csvFile ? null : "Please upload a CSV file.");
            setTextError(textFile ? null : "Please upload a text file.");
            return;
        }

        setIsLoading({state: true, report: "Parsing files locally..."});
        setIsCompleted(false);

        let parsedCsvResult = null;
        let parsedTxtResult = null;
        let parseCompleteCount = 0;

        const checkAndUpload = () => {
            parseCompleteCount++;
            if (parseCompleteCount === 2) {
                handleDataUpload(parsedCsvResult, parsedTxtResult);
            }
        };

        Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                parsedCsvResult = results.data;
                checkAndUpload();
            },
            error: (err) => {
                setCsvError("Error parsing CSV: " + err.message);
                setIsLoading({state: false, report: "CSV parsing error."});
            },
        });

        const reader = new FileReader();
        reader.onload = (event) => {
            const results = event.target.result;
            parsedTxtResult = results;
            checkAndUpload();
        };
        reader.onerror = (err) => {
            setTextError("Error reading text file: " + err.message);
            setIsLoading({state: false, report: "Text file reading error."});
        };
        reader.readAsText(textFile);
    }

    return (
        <div className="min-h-96 px-3 py-10 md:px-5 w-full gap-4 flex flex-col">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
                Start by uploading data here
            </h2>

            <div className="grid grid-rows-2 gap-6 md:grid-rows-none md:grid-cols-2 p-3 md:px-5 md:py-6 rounded-xl border border-slate-300">
                <div className="flex flex-col gap-3 ">
                    <p className="font-bold text-xl md:text-2xl">
                        Upload Resume Details
                    </p>
                    <DragDropUpload
                        fileType="csv"
                        setFile={setCsvFile}
                        setError={setCsvError}
                        iconSrc="/csv.png"
                    />
                    <div>
                        <span className="font-bold">Preview : </span>
                        <span className={csvFile && "text-green-500"}>
                            {!csvError &&
                                (csvFile?.name || "No file uploaded yet")}
                        </span>
                        {csvError && (
                            <span className={"text-red-500"}>
                                {csvError ||
                                    "Some error occured. Reupload file"}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-3 ">
                    <p className="font-bold text-xl md:text-2xl">
                        Upload Job Description
                    </p>
                    <DragDropUpload
                        fileType="text"
                        setFile={setTextFile}
                        setError={setTextError}
                        iconSrc="/txt.png"
                    />
                    <div>
                        <span className="font-bold">Preview : </span>
                        <span className={textFile && "text-green-500"}>
                            {!textError &&
                                (textFile?.name || "No file uploaded yet")}
                        </span>
                        {textError && (
                            <span className={"text-red-500"}>
                                {textError ||
                                    "Some error occured. Reupload file"}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full md:flex-row">
                <div className="flex-2/5">
                    <div className="mt-4 flex flex-col gap-2 items-center md:items-start">
                        <button
                            type="submit"
                            onClick={handleParse}
                            disabled={
                                isCompleted ||
                                !csvFile ||
                                !textFile ||
                                isLoading.state
                            }
                            className={`rounded-full w-full text-white flex gap-3 justify-center items-center hover:bg-blue-600 bg-blue-500 cursor-pointer text-lg font-bold md:w-xs md:text-xl px-4 py-4 mb-2 disabled:cursor-not-allowed disabled:hover:grayscale-75 ${
                                isLoading.state ? "cursor-progress" : ""
                            }`}>
                            {isLoading.state ? (
                                <>
                                    <div className="loader_process"></div>
                                    Processing...
                                </>
                            ) : isCompleted ? (
                                <>
                                    <span>
                                        <CheckAnimation classData="size-7" />
                                    </span>
                                    Completed
                                </>
                            ) : (
                                <>
                                    <span>
                                        <Image
                                            src="/play.png"
                                            width={30}
                                            height={30}
                                            alt="play"
                                        />
                                    </span>
                                    Start Processing
                                </>
                            )}
                        </button>
                        <p>Estimated time: 10 seconds</p>
                    </div>

                    <>
                        {(isLoading.state || isCompleted) && (
                            <ProgressBar
                                status={isLoading.status}
                                state={isLoading.state}
                            />
                        )}
                    </>

                    {isCompleted && <CSVButton data={finalProcessedData} />}
                </div>

                <>
                    {(isLoading.state || isCompleted) && (
                        <ReportLog data={isLoading.report} />
                    )}
                </>
            </div>
        </div>
    );
}
