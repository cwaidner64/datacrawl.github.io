import { splitText } from "../../utils/splitText"
import { motion } from "framer-motion"

export default function Header({ label, title, subtext }) {
    return (
        <motion.div
            className="relative text-center transform flex flex-col gap-6 sm:gap-8 md:gap-10 items-center w-full sm:w-[85%] md:w-[70%] lg:w-[52%]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.5 }}
            >
                <button className="border border-[#C2C2C2] px-5 sm:px-8 py-2 rounded-full text-[#C2C2C2] font-['Heebo'] text-xs sm:text-sm">{label}</button>
            </motion.div>
            <h1 className="text-[1.85rem] sm:text-[2.2rem] md:text-[2.5rem] font-bold font-['Roboto'] text-[#E3E3E3] leading-10 sm:leading-12 md:leading-16">
                {splitText(title)}
            </h1>
            {subtext && <p className="font-['Roboto'] text-[#969696] text-sm sm:text-base">{splitText(subtext, 0.5)}</p>}
        </motion.div>
    )
}
