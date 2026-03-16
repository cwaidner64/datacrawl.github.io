import { motion } from "framer-motion"

export function splitText(text, delayOffset = 0) {
    const words = text.split(" ")

    return words.map((word, wordIndex) => (
        <span
            key={wordIndex}
            style={{
                display: "inline-block",
                whiteSpace: "nowrap", // Keep the word together
                marginRight: "0.25em", // Natural spacing between words
            }}
        >
            {[...word].map((char, charIndex) => {
                const index = wordIndex * 10 + charIndex // unique delay index

                return (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: delayOffset + index * 0.03,
                            type: "spring",
                            bounce: 0,
                            duration: 0.6,
                        }}
                        style={{ display: "inline-block" }}
                    >
                        {char}
                    </motion.span>
                )
            })}
        </span>
    ))
}