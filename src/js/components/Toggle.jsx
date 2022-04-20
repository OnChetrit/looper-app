import { motion } from 'framer-motion';

export const Toggle = ({ isActive, toggleActive }) => {
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
    restSpeed: 0.4,
  };
  return (
    <div className="switch" data-active={isActive} onClick={toggleActive}>
      <motion.div className="handle" layout transition={spring} />
    </div>
  );
};
