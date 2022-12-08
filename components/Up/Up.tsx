import React from "react";
import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { useScrollY } from "../../hooks";

import { ButtonIcon } from "../";

import styles from "./Up.module.css";

export const Up = (): JSX.Element => {
  const controls = useAnimation();
  const y = useScrollY();

  React.useEffect(() => {
    controls.start({ opacity: y / document.body.scrollHeight });
  }, [y, controls]);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.div className={styles.up} animate={controls} initial={{ opacity: 0 }}>
      <ButtonIcon appearance="primary" icon="up" onClick={scrollTop} />
    </motion.div>
  );
};
