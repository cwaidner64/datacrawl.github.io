import React, { useState } from "react";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { createStripeSetupIntent } from "../config/api";
import { isStripeConfigured, stripePromise } from "../config/stripe";

const cardElementOptions = {
  style: {
    base: {
      color: "#ffffff",
      fontSize: "16px",
      "::placeholder": {
        color: "#9ca3af",
      },
    },
    invalid: {
      color: "#f87171",
    },
  },
};

const cardContainerStyle = {
  border: "1px solid #444",
  borderRadius: "8px",
  background: "#151515",
  padding: "0.75rem",
  marginBottom: "0.85rem",
};

const submitButtonStyle = {
  padding: "0.6rem 1rem",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  background: "#2563eb",
  color: "#fff",
  fontWeight: 600,
};

function StripeSetupCardFormInner({ token, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");

    if (!token) {
      const message = "Please log in to save a payment method.";
      setLocalError(message);
      onError?.(message);
      return;
    }

    if (!stripe || !elements) {
      const message = "Stripe is still loading. Please try again in a moment.";
      setLocalError(message);
      onError?.(message);
      return;
    }

    setIsSubmitting(true);
    try {
      const setupIntentResponse = await createStripeSetupIntent({ token });
      const clientSecret =
        setupIntentResponse?.client_secret ||
        setupIntentResponse?.clientSecret ||
        setupIntentResponse?.setup_intent_client_secret ||
        setupIntentResponse?.data?.client_secret ||
        null;

      if (!clientSecret) {
        throw new Error("No setup intent client secret returned by server.");
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card input is unavailable. Please refresh and try again.");
      }

      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        throw new Error(result.error.message || "Failed to save card.");
      }

      const paymentMethodId = result?.setupIntent?.payment_method || "";
      onSuccess?.(paymentMethodId);
    } catch (error) {
      const message = error?.message || "Failed to save card.";
      setLocalError(message);
      onError?.(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={cardContainerStyle}>
        <CardElement options={cardElementOptions} />
      </div>

      {localError && <div style={{ color: "#f87171", marginBottom: "0.75rem" }}>{localError}</div>}

      <button
        type="submit"
        style={submitButtonStyle}
        disabled={isSubmitting || !token || !stripe || !elements}
      >
        {isSubmitting ? "Saving..." : "Save Card"}
      </button>
    </form>
  );
}

export default function StripeSetupCardForm({ token, onSuccess, onError }) {
  if (!isStripeConfigured) {
    return (
      <div style={{ color: "#f59e0b" }}>
        Stripe is not configured. Set VITE_STRIPE_PUBLISHABLE_KEY in your frontend .env file.
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <StripeSetupCardFormInner token={token} onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
}
