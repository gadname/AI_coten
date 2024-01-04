"use client";
import { HomeTemplate } from "@/app/components/templates/HomeTemplate";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  return (
      <HomeTemplate />
    
  );
}