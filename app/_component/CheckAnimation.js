import Image from "next/image";

export default function CheckAnimation({classData = ""}) {
    return (
        <Image
            src="/check.png"
            width={30}
            height={30}
            alt="check"
            className={classData}
        />
    );
}
