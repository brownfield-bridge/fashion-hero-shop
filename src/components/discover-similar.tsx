"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";

interface DiscoverSimilarProps {
  fromProductSlug: string;
  collectionSlug: string;
  products: Product[];
}

export function DiscoverSimilar({
  fromProductSlug,
  collectionSlug,
  products,
}: DiscoverSimilarProps) {
  if (products.length === 0) return null;

  function handleTileClick(productSlug: string, position: number) {
    console.log({
      event: "discover_similar_click",
      productId: productSlug,
      position,
      fromProduct: fromProductSlug,
    });
  }

  return (
    <section className="py-12">
      <h2 className="text-lg font-medium text-charcoal mb-6">
        Może ci się spodobać
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, position) => {
          const firstColor = product.colors[0];
          return (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              onClick={() => handleTileClick(product.slug, position)}
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden mb-3 bg-[#ece9e2]">
                <Image
                  src={firstColor.image}
                  alt={`${product.name} - ${firstColor.name}`}
                  width={600}
                  height={600}
                  loading="lazy"
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-[12px] font-medium uppercase tracking-[0.5px] mb-0.5">
                {product.name}
              </h3>
              <p className="text-[12px] text-warm-gray mb-1">
                {firstColor.name}
              </p>
              <span className="text-[14px] font-medium">
                {product.price} zl
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href={`/collections/${collectionSlug}`}
          className="inline-block px-6 py-3 border border-charcoal text-[12px] font-medium uppercase tracking-[1px] hover:bg-charcoal hover:text-white transition-colors"
        >
          Zobacz więcej
        </Link>
      </div>
    </section>
  );
}
