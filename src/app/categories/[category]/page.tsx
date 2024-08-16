'use client';
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
export default function Page() {
  const { category } = useParams();
  useEffect(() => {
    if (category) {
      console.log(category);
    }
  }, [category]);
  return <div>{category}</div>;
}
