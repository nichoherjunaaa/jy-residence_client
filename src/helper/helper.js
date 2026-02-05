export const formatIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);
};

export const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat("id-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
    }).format(date);
};