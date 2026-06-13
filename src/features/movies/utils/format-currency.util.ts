const formatCurrency = (amount: number) => {
  return amount > 0
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(amount)
    : "N/A";
};

export { formatCurrency };
