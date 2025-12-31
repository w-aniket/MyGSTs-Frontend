import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const AnimatedCard = ({ children }) => (
  <motion.div
    className="card"
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    whileHover={{ scale: 1.04 }}
  >
    {children}
  </motion.div>
);
