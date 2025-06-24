'use client'

import ComparisonList from "@/components/modules/Comparison/ComparisonList";
import { productTypes } from "@/constants/product";
import { useComparisonItems } from "@/hooks/useComparisonItems";
import { notFound } from "next/navigation";
import React from "react";

export default function ComparisonType({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  // Використовуємо React.use() для отримання actual params
  const resolvedParams = React.use(params);

  if (!productTypes.includes(resolvedParams.type)) {
    notFound();
  }
  
  const { items } = useComparisonItems(resolvedParams.type);

  return <ComparisonList items={items} />;
}
