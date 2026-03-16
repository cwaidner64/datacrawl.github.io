import { useEffect } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export default function SpiderWireAnimation() {
    useEffect(() => {
        const wireCount = 12;

        function launchSpark(sparkId) {
            const wireIndex = Math.floor(Math.random() * wireCount) + 1;;
            const duration = 3 + Math.random() * 2;

            // Define which wires should stop early
            const earlyStopWires = [1, 2, 3, 7, 9, 10, 12]; // <- customize this
            const shouldStopEarly = earlyStopWires.includes(wireIndex);
            const stopAtProgress = 0.60;

            gsap.set(`#${sparkId}`, { opacity: 1, x: 500, y: 500 });

            const tween = gsap.to(`#${sparkId}`, {
                duration,
                // opacity: 1, // Make the spark visible when the animation starts
                // immediateRender: false, // Prevent GSAP from applying opacity: 1 immediately
                ease: "none",
                transformOrigin: "50% 50%",
                motionPath: {
                    path: `#wire${wireIndex}`,
                    align: `#wire${wireIndex}`,
                    autoRotate: false,
                    alignOrigin: [0.5, 0.5]
                },
                onUpdate: function () {
                    if (shouldStopEarly && this.progress() >= stopAtProgress) {
                        this.kill();
                        gsap.set(`#${sparkId}`, { opacity: 0 });
                        setTimeout(() => launchSpark(sparkId), 2000);
                    }
                },
                onComplete: () => {
                    if (!shouldStopEarly) {
                        gsap.set(`#${sparkId}`, { opacity: 0 });
                        setTimeout(() => launchSpark(sparkId), 2000);
                    }
                }
            });
        }

        const timeout1 = setTimeout(() => launchSpark("spark1"), 0);
        const timeout2 = setTimeout(() => launchSpark("spark2"), 1000 + Math.random() * 1000);
        const timeout3 = setTimeout(() => launchSpark("spark3"), 2000 + Math.random() * 1000);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    }, []);

    return (
        <svg width="1158" height="790" viewBox="0 0 1158 790"
            className="w-full h-full pointer-events-none z-10"
            fill="none" xmlns="http://www.w3.org/2000/svg">

            {/* Paths duplicate */}

            <path id="wire1" d="M684 272.759L772.318 184.441V125.35L826.961 70.7075" stroke="transparent" />
            <path id="wire2" d="M706 462.68H793.047L807.026 448.701H868.022L913.134 403.589H980.485" stroke="transparent" />
            <path id="wire3" d="M686.503 604.529V622.319L760.207 696.024H826.287L868.857 738.594" stroke="transparent" />
            <path id="wire4" d="M573.859 551.238V629.39L642.481 698.011V752.019" stroke="transparent" />
            <path id="wire5" d="M542.726 529V659.253L517.311 684.668V730.416L483 764.726" stroke="transparent" />
            <path id="wire6" d="M475.224 588V638.83L385 729.055V767.813" stroke="transparent" />
            <path id="wire7" d="M422.821 520.023H217.593L178.2 559.417H141.983L103.225 520.023" stroke="transparent" />
            <path id="wire8" d="M448.792 426.142H404.315L228.95 250.776" stroke="transparent" />
            <path id="wire9" d="M392.878 415.975L356.661 452.192H234.033L190.827 408.986H79" stroke="transparent" />
            <path id="wire10" d="M458.892 268.419V256.347L348.336 128H213" stroke="transparent" />
            <path id="wire11" d="M577 295.452V85.7764L608.915 67.3503" stroke="transparent" />
            <path id="wire12" d="M553.583 286.954V114.766L466.275 22H365" stroke="transparent" />

            {/* Sparks */}
            <circle id="spark1" className="spark fill-[#575757] [filter:drop-shadow(0_0_6px_#575757)]" r="3" cx="-100" />
            <circle id="spark2" className="spark fill-[#575757] [filter:drop-shadow(0_0_6px_#575757)]" r="3" />
            <circle id="spark3" className="spark fill-[#575757] [filter:drop-shadow(0_0_6px_#575757)]" r="3" />


            <defs>
                <radialGradient
                    id="paint0_radial_411_1305"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(557.532 410.445) rotate(15.0069) scale(351.152 370.459)"
                >
                    <stop stopColor="#D9D9D9" />
                    <stop offset="0.104698" stopColor="#D9D9D9" stopOpacity="0.471154" />
                    <stop offset="1" stopColor="#D9D9D9" stopOpacity="0" />
                </radialGradient>
            </defs>

            <mask
                id="mask0_411_1305"
                style={{ maskType: 'alpha' }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1158"
                height="790"
            >
                <circle cx="205.625" cy="127.625" r="7.62457" fill="#A5A5A5" />
                <path id="wire1" d="M684 272.759L772.318 184.441V125.35L826.961 70.7075" stroke="#A5A5A5" />
                <path d="M716 347.888L797.964 265.924" stroke="#A5A5A5" />
                <path d="M907.249 260.841H1058.47" stroke="#A5A5A5" />
                <path d="M736.498 437.899H807.661L849.596 395.964" stroke="#A5A5A5" />
                <path d="M861.033 385.163L909.322 336.874H1033.86L1056.73 314H1157.76" stroke="#A5A5A5" />
                <path id="wire2" d="M706 462.68H793.047L807.026 448.701H868.022L913.134 403.589H980.485" stroke="#A5A5A5" />
                <path d="M705.565 551.792L722.721 568.947H818.663" stroke="#A5A5A5" />
                <path id="wire3" d="M686.503 604.529V622.319L760.207 696.024H826.287L868.857 738.594" stroke="#A5A5A5" />
                <path id="wire4" d="M573.859 551.238V629.39L642.481 698.011V752.019" stroke="#A5A5A5" />
                <path id="wire5" d="M542.726 529V659.253L517.311 684.668V730.416L483 764.726" stroke="#A5A5A5" />
                <path id="wire6" d="M475.224 588V638.83L385 729.055V767.813" stroke="#A5A5A5" />
                <path d="M469.081 547.435L443.666 572.85H411.896" stroke="#A5A5A5" />
                <path d="M397.283 577.298L372.503 602.078H318.496" stroke="#A5A5A5" />
                <path d="M201.607 602H139.975L122.82 619.155H77.7076L65 631.863V654.101" stroke="#A5A5A5" />
                <path id="wire7" d="M422.821 520.023H217.593L178.2 559.417H141.983L103.225 520.023" stroke="#A5A5A5" />
                <path id="wire8" d="M448.792 426.142H404.315L228.95 250.776" stroke="#A5A5A5" />
                <path id="wire9" d="M392.878 415.975L356.661 452.192H234.033L190.827 408.986H79" stroke="#A5A5A5" />
                <path id="wire10" d="M458.892 268.419V256.347L348.336 128H213" stroke="#A5A5A5" />
                <path d="M138.286 208H29" stroke="#A5A5A5" />
                <path id="wire11" d="M577 295.452V85.7764L608.915 67.3503" stroke="#A5A5A5" />
                <path id="wire12" d="M553.583 286.954V114.766L466.275 22H365" stroke="#A5A5A5" />
                <rect x="817.893" y="544.032" width="138.784" height="72.7042" rx="9.5" fill="#D9D9D9" fillOpacity="0.1" stroke="#A5A5A5" />
                <rect x="202.721" y="575.256" width="114.639" height="59.9966" rx="9.5" fill="#D9D9D9" fillOpacity="0.1" stroke="#A5A5A5" />
                <rect x="138.591" y="165.5" width="154.033" height="84.141" rx="9.5" fill="#D9D9D9" fillOpacity="0.1" stroke="#A5A5A5" />
                <rect x="210.468" y="6.5" width="154.033" height="84.141" rx="9.5" fill="#D9D9D9" fillOpacity="0.1" stroke="#A5A5A5" />
                <rect x="609.27" y="0.5" width="154.033" height="84.141" rx="9.5" fill="#D9D9D9" fillOpacity="0.1" stroke="#A5A5A5" />
                <circle cx="831.408" cy="65.6246" r="7.62457" fill="#A5A5A5" />
                <circle cx="772.916" cy="129.264" r="7.62457" fill="#A5A5A5" />
                <circle cx="404.272" cy="573.485" r="7.62457" fill="#A5A5A5" />
                <circle cx="855.315" cy="390.246" r="7.62457" fill="#A5A5A5" />
                <circle cx="1122.38" cy="313.524" r="7.62457" fill="#A5A5A5" />
                <circle cx="641.625" cy="759.625" r="7.62457" fill="#A5A5A5" />
                <circle cx="384.625" cy="775.625" r="7.62457" fill="#A5A5A5" />
                <circle cx="72.6246" cy="408.625" r="7.62457" fill="#A5A5A5" />
            </mask>

            <g mask="url(#mask0_411_1305)">
                <rect x="20" y="-45.1229" width="1117" height="875.555" fill="url(#paint0_radial_411_1305)" />
            </g>

        </svg>
    );
}