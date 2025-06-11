// ThemeContext.tsx
import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface ThemeContextType {
  theme?: string;
  changeTheme?: (e?: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

export const ThemeContext = createContext<ThemeContextType>({});
