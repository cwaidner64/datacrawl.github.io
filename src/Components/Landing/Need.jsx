export default function Need(props) {
    const resolvedImagePath =
        typeof props.img === "string" && !/^(?:[a-z]+:)?\/\//i.test(props.img)
            ? `${import.meta.env.BASE_URL}${props.img.replace(/^\//, "")}`
            : props.img;

    return (
        <span className="flex flex-col items-center justify-center p-2 min-w-[140px]">
            <div
                className=" rounded-full p-4 sm:p-5 mb-4 sm:mb-5 hover:cursor-pointer hover:scale-[1.1] duration-500"
                style={{
                    background: 'linear-gradient(122.34deg, #1B1B1B 56.98%, #818181 264.45%)',
                }}>
                <img src={resolvedImagePath} className="w-10 sm:w-12" />
            </div>
            <p className="text-[#878787] text-sm sm:text-md text-center font-[Heebo] font-bold tracking-wide">{props.text}</p>
        </span>
    )
}
