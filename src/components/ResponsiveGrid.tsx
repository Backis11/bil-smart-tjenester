
import { ReactNode } from "react";

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

const ResponsiveGrid = ({ 
  children, 
  className = "", 
  columns = { mobile: 1, tablet: 2, desktop: 3 } 
}: ResponsiveGridProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2", 
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6"
  };

  const mobileCol = gridCols[columns.mobile || 1];
  const tabletCol = columns.tablet ? `md:grid-cols-${columns.tablet}` : "md:grid-cols-2";
  const desktopCol = columns.desktop ? `lg:grid-cols-${columns.desktop}` : "lg:grid-cols-3";

  return (
    <div className={`grid gap-4 sm:gap-6 ${mobileCol} ${tabletCol} ${desktopCol} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;
