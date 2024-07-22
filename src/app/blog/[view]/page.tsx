'use client'
import { useParams } from "next/navigation";
import {useEffect, useState} from "react";
export default function Page() {
  const { slug } = useParams();
  useEffect(() => {
    console.log(slug);
  }, [slug]);
  return <>{slug}</>;
}
