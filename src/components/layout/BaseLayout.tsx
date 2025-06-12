// src/components/layout/SidebarLayout.tsx
import React from "react";
import { User } from "lucide-react";

interface BaseLayoutProps {
  children: React.ReactNode;
  menuComponent?: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  menuComponent,
}) => {
  return (

    <div className="max-w-6xl mx-auto space-y-8 pb-10 ">
      {menuComponent}
      {children}
    </div>
  );
};
