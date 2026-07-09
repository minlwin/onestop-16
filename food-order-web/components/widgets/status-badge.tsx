export default function StatusBadge({ status }: { status: string }) {
    const colorClass =
        status === "Delivered"
            ? "bg-emerald-100 text-emerald-700"
            : status === "Confirmed"
              ? "bg-blue-100 text-blue-700"
              : status === "Canceled"
                ? "bg-red-100 text-red-700"
                : "bg-amber-100 text-amber-700"

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${colorClass}`}
        >
            {status}
        </span>
    )
}
