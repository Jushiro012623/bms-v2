import { HashLoader } from "react-spinners";
import LoadingBar from "react-top-loading-bar";
import { useRef, useEffect } from "react";

const Loader = () => {
    const topBarRef = useRef<any>(null);
    useEffect(() => {
        topBarRef.current.continuousStart();
        const barTimer = setTimeout(() => {
            topBarRef.current.complete();
        }, 3000);
        return () => clearTimeout(barTimer);
    }, []);

    return (
        <div className="flex flex-col justify-center items-center fixed top-0 left-0 z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
            {/* Top Loading Bar */}
            <LoadingBar color="#6075e2" ref={topBarRef} shadow={true} />

            {/* Spinner */}
            <HashLoader color="#6075e2" size={60} />
        </div>
    );
};

export default Loader;
