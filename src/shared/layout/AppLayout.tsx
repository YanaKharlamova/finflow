import { Outlet } from "react-router-dom";
import { useResponsiveSidebar } from "src/shared/layout/hooks/useResponsiveSidebar";

export type AppLayoutContext = ReturnType<typeof useResponsiveSidebar>;

export const AppLayout = () => {
  const sidebar = useResponsiveSidebar();

  return <Outlet context={sidebar} />;
};
