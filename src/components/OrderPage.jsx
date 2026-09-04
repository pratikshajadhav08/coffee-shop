import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FadeUp } from "./ui/FadeUp";
import { useCart } from "../context/CartContext";
import { SITE } from "../data/site";

function formatINR(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function OrderPage() {
  const { items, updateQty, removeItem, total, clearCart } = useCart();
  const [copied, setCopied] = useState(false);

  const summaryLines = items
    .map((i) => `${i.qty} × ${i.name} (${i.price} each)`)
    .join("\n");
  const fullSummary = `Order from Ember & Oak:\n${summaryLines}\n\nTotal: ${formatINR(
    total
  )}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API may be unavailable (e.g. insecure context) — the
      // summary is already visible on screen, so fail silently.
    }
  };

  return (
    <section className="pad order-page">
      <div className="section-eyebrow">Your Order</div>
      <h2 className="section-title display" style={{ marginBottom: 8 }}>
        Ready when you are.
      </h2>
      <p
        style={{
          color: "var(--cream-dim)",
          maxWidth: 520,
          marginBottom: 40,
        }}
      >
        We don't take online payment yet — review your order below, then
        call the bar and we'll have it ready for pickup.
      </p>

      {items.length === 0 ? (
        <FadeUp>
          <div className="order-empty">
            <p>Your order is empty.</p>
            <Link to="/#menu" className="btn-primary order-empty-btn">
              Browse the Menu
            </Link>
          </div>
        </FadeUp>
      ) : (
        <FadeUp>
          <div className="order-list">
            {items.map((item) => (
              <div className="order-row" key={item.name}>
                <div className="order-row-name display">{item.name}</div>
                <div className="order-row-controls">
                  <button
                    onClick={() => updateQty(item.name, item.qty - 1)}
                    aria-label={`Remove one ${item.name}`}
                  >
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.name, item.qty + 1)}
                    aria-label={`Add one ${item.name}`}
                  >
                    +
                  </button>
                </div>
                <div className="order-row-price">{item.price}</div>
                <button
                  className="order-row-remove"
                  onClick={() => removeItem(item.name)}
                  aria-label={`Remove ${item.name} from order`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="order-total">
            <span>Total</span>
            <span>{formatINR(total)}</span>
          </div>

          <div className="order-summary-box">
            <div className="order-summary-label">
              Read this out when you call, or copy it below
            </div>
            <pre className="order-summary-text">{fullSummary}</pre>
            <div className="order-actions">
              <a className="btn-primary order-call-btn" href={SITE.phoneHref}>
                Call to Place Order — {SITE.phoneDisplay}
              </a>
              <button className="btn-outline" onClick={handleCopy}>
                {copied ? "Copied ✓" : "Copy Order Summary"}
              </button>
            </div>
          </div>

          <div className="order-footer-links">
            <button className="order-clear" onClick={clearCart}>
              Clear order
            </button>
            <Link to="/#menu" className="order-add-more">
              Add more items
            </Link>
          </div>
        </FadeUp>
      )}
    </section>
  );
}