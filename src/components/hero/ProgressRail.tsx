'use client';

interface ProgressRailProps {
  progress: number;
}

export default function ProgressRail({ progress }: ProgressRailProps) {
  return (
    <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 h-[60vh] flex flex-col justify-between items-end z-10 pointer-events-none">
      <div className="absolute right-[5px] top-0 w-[1px] h-full bg-white/20" />
      
      <div 
        className="absolute right-[5px] top-0 w-[1px] bg-[#0EA5E9] origin-top transition-transform duration-100"
        style={{ height: '100%', transform: `scaleY(${progress})` }}
      />
      
      {[1, 2, 3, 4, 5].map((num) => {
        const stageThreshold = (num - 1) / 4;
        const isActive = progress >= stageThreshold - 0.05 && progress <= stageThreshold + 0.25;
        
        return (
          <div key={num} className="relative flex items-center group">
            <span 
              className={`text-[9px] mr-6 transition-colors duration-300 ${
                isActive ? 'text-[#0EA5E9]' : 'text-white/40'
              }`}
            >
              0{num}
            </span>
            <div 
              className={`w-3 h-[1px] transition-colors duration-300 ${
                isActive ? 'bg-[#0EA5E9] shadow-[0_0_8px_rgba(14,165,233,0.8)]' : 'bg-white/40'
              }`} 
            />
          </div>
        );
      })}
    </div>
  );
}
