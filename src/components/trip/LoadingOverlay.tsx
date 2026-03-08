import { motion } from "framer-motion";
import { Loader2, Compass } from "lucide-react";

interface LoadingOverlayProps {
  text?: string;
}

export default function LoadingOverlay({ text = "Building your perfect trip..." }: LoadingOverlayProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mb-6"
      >
        <div className="w-16 h-16 rounded-2xl ts-gradient-hero flex items-center justify-center ts-shadow-elevated">
          <Compass className="w-8 h-8 text-primary-foreground" />
        </div>
      </motion.div>
      <h3 className="text-base font-display font-bold text-foreground mb-2">Consulting Saarthi AI</h3>
      <p className="text-xs text-muted-foreground text-center">{text}</p>
    </div>
  );
}
