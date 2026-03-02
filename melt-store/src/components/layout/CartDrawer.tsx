'use client';

import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, totalItems, subtotal } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="w-full sm:w-[420px] bg-melt-bg border-l border-melt-border p-0 flex flex-col">
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-melt-border">
          <SheetTitle className="text-[13px] font-semibold uppercase tracking-[0.1em]">
            Your Bag ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-20">
              <p className="text-melt-text-muted text-sm">Your bag is empty</p>
              <Link
                href="/shop"
                onClick={() => setCartOpen(false)}
                className="inline-block bg-melt-text text-melt-inverse-text text-[12px] font-medium uppercase tracking-[0.08em] px-8 py-3.5 rounded-lg hover:bg-melt-accent hover:text-melt-text transition-colors duration-200"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-melt-bg-alt flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-melt-bg-alt to-melt-border" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-melt-text truncate">{item.product.name}</p>
                        <p className="text-[11px] text-melt-text-muted mt-0.5">{item.selectedSize} · {item.product.format}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedSize)}
                        className="text-melt-text-muted hover:text-melt-text transition-colors p-0.5"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty stepper */}
                      <div className="flex items-center border border-melt-border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                          className="px-2.5 py-1 text-melt-text-muted hover:text-melt-text transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-medium text-melt-text">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                          className="px-2.5 py-1 text-melt-text-muted hover:text-melt-text transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-melt-text">₹{item.product.price * item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-melt-border px-6 py-5 space-y-4">
            {subtotal < 999 && (
              <p className="text-[11px] text-melt-text-muted text-center">
                Add ₹{999 - subtotal} more for free shipping
              </p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-melt-text">Subtotal</span>
              <span className="text-lg font-semibold text-melt-text">₹{subtotal}</span>
            </div>
            <button className="w-full bg-melt-text text-melt-inverse-text text-[13px] font-medium uppercase tracking-[0.08em] py-4 rounded-lg hover:bg-melt-accent hover:text-melt-text transition-colors duration-200 active:animate-micro-bounce">
              Checkout
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
