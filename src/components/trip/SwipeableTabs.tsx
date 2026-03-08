import { useRef, type ReactNode } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";

interface SwipeableTabsProps {
  children: ReactNode;
  tabIds: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  enabled?: boolean;
}

const SWIPE_THRESHOLD = 50;
const SWIPE_VELOCITY = 300;

export default function SwipeableTabs({ children, tabIds, activeTab, onTabChange, enabled = true }: SwipeableTabsProps) {
  const controls = useAnimation();

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (!enabled) return;

    const currentIndex = tabIds.indexOf(activeTab);
    const { offset, velocity } = info;

    const swipedLeft = offset.x < -SWIPE_THRESHOLD || velocity.x < -SWIPE_VELOCITY;
    const swipedRight = offset.x > SWIPE_THRESHOLD || velocity.x > SWIPE_VELOCITY;

    if (swipedLeft && currentIndex < tabIds.length - 1) {
      onTabChange(tabIds[currentIndex + 1]);
    } else if (swipedRight && currentIndex > 0) {
      onTabChange(tabIds[currentIndex - 1]);
    }

    controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } });
  };

  return (
    <motion.div
      className="h-full w-full touch-pan-y"
      drag={enabled ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      onDragEnd={handleDragEnd}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
