export const formatCurrency = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "Price on Request";
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPriceDisplay = (
  price: number | null | undefined,
  priceVerified: boolean
): { text: string; isQuotation: boolean } => {
  if (!priceVerified || price === null || price === undefined) {
    return { text: "Price on Request", isQuotation: true };
  }
  return { text: formatCurrency(price), isQuotation: false };
};

export const formatStockDisplay = (
  stockStatus: string,
  stockVerified: boolean
): { text: string; badgeType: "green" | "amber" | "gray" } => {
  if (!stockVerified) {
    return { text: "Availability on Request", badgeType: "amber" };
  }
  if (stockStatus.toLowerCase().includes("in stock")) {
    return { text: stockStatus, badgeType: "green" };
  }
  return { text: stockStatus || "On Order", badgeType: "gray" };
};

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "N/A";
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};
