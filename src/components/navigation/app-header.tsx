"use client";

import { Navbar, NavbarProps } from "@/components/navbar";

export type NavTab = "jobs" | "talent" | "companies" | "about" | "recruiter";

export interface AppHeaderProps extends NavbarProps {
  activeTab?: NavTab;
}

export function AppHeader(props: AppHeaderProps) {
  return <Navbar {...props} />;
}
