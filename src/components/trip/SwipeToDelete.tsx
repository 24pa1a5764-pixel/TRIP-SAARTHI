import { motion, useAnimation, PanInfo } from "framer-motion";
import { type ReactNode, useRef } from "react";

interface SwipeToDeleteProps {
  children: ReactNode;
  onDelete: () => void;
  deleteLabel?: string;
}

const DELETE_THRESHOLD = -100;

export default function SwipeToDelete({ children, onDelete, deleteLabel = "Delete" }: SwipeToDeleteProps) {
  const controls = useAnimation();
  const isDragging = useRef(false);

  const handleDragEnd = async (_: any, info: PanInfo) => {
    isDragging.current = false;
    if (info.offset.x < DELETE_THRESHOLD) {
      await controls.start({ x: -300, opacity: 0, transition: { duration: 0.25 } });
      onDelete();
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 400, damping: 30 } });
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Delete background */}
      <div className="absolute inset-0 bg-destructive flex items-center justify-end pr-6 rounded-2xl">
        <span className="text-destructive-foreground font-bold text-sm">🗑 {deleteLabel}</span>
      </div>

      {/* Draggable card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -150, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => { isDragging.current = true; }}
        onDragEnd={handleDragEnd}
        animate={controls}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
