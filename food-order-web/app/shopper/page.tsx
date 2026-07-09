"use client"

import { useEffect } from "react"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    XAxis,
    YAxis,
} from "recharts"
import { usePageTitle } from "./_states/page-title-provider"
import Section from "@/components/widgets/section"
import StatusBadge from "@/components/widgets/status-badge"
import DetailsLink from "@/components/widgets/details-link"
import LoadingWidget from "@/components/widgets/loading-widget"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    Calendar02FreeIcons,
    ShoppingBag02Icon,
    UserAiFreeIcons,
    Wallet02FreeIcons,
} from "@hugeicons/core-free-icons"
import { formatCurrency } from "@/lib/utils"
import { useFetch } from "@/hooks/use-fetch"

import * as dashboardService from "@/lib/action/shopper/management/dashboard.action"
import * as ordersService from "@/lib/action/shopper/management/orders.action"
import * as invoiceService from "@/lib/action/shopper/management/invoice.action"

const revenueConfig: ChartConfig = {
    revenue: {
        label: "Revenue",
        color: "var(--primary)",
    },
}

// Matches the status colors already used by StatusBadge (emerald/blue/amber/red),
// just the solid "700" shade so pie slices stay legible against a white surface.
const STATUS_COLOR: Record<string, string> = {
    Delivered: "#047857",
    Confirmed: "#1d4ed8",
    Invoiced: "#b45309",
    Canceled: "#b91c1c",
}

const statusConfig: ChartConfig = {
    Delivered: { label: "Delivered", color: STATUS_COLOR.Delivered },
    Confirmed: { label: "Confirmed", color: STATUS_COLOR.Confirmed },
    Invoiced: { label: "Invoiced", color: STATUS_COLOR.Invoiced },
    Canceled: { label: "Canceled", color: STATUS_COLOR.Canceled },
}

const cuisineConfig: ChartConfig = {
    quantity: {
        label: "Orders",
        color: "var(--primary)",
    },
}

const NO_KEYWORD_SEARCH = { status: "", from: "", to: "", keyword: "" }

export default function ShopDashboardPage() {
    const { setTitle } = usePageTitle()

    const [summary] = useFetch(() => dashboardService.summary(), [])
    const [revenueTrend] = useFetch(() => dashboardService.revenueTrend(), [])
    const [ordersByStatus] = useFetch(() => dashboardService.ordersByStatus(), [])
    const [topCuisines] = useFetch(() => ordersService.cuisineSummary(), [])
    const [invoices] = useFetch(() => invoiceService.search(NO_KEYWORD_SEARCH), [])

    useEffect(() => {
        setTitle("Dashboard")
    }, [])

    if (!summary || !revenueTrend || !ordersByStatus || !topCuisines || !invoices) {
        return <LoadingWidget />
    }

    const recentInvoices = [...invoices]
        .sort((a, b) => (a.invoiceDate < b.invoiceDate ? 1 : -1))
        .slice(0, 4)

    return (
        <section className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatTile
                    icon={Wallet02FreeIcons}
                    label="Today's Revenue"
                    value={formatCurrency(summary.todayRevenue)}
                />
                <StatTile
                    icon={ShoppingBag02Icon}
                    label="Today's Orders"
                    value={summary.todayOrders.toLocaleString()}
                />
                <StatTile
                    icon={Calendar02FreeIcons}
                    label="Pending Invoices"
                    value={summary.pendingInvoices.toLocaleString()}
                />
                <StatTile
                    icon={UserAiFreeIcons}
                    label="Total Customers"
                    value={summary.totalCustomers.toLocaleString()}
                />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
                <Section title="Revenue Trend (Last 7 Days)">
                    <ChartContainer config={revenueConfig} className="aspect-auto h-64 w-full">
                        <AreaChart data={revenueTrend} margin={{ left: 12, right: 12 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                width={48}
                                tickFormatter={(value) => `${Math.round(value / 1000)}k`}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        formatter={(value) => formatCurrency(Number(value))}
                                    />
                                }
                            />
                            <Area
                                dataKey="revenue"
                                type="monotone"
                                fill="var(--color-revenue)"
                                fillOpacity={0.18}
                                stroke="var(--color-revenue)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ChartContainer>
                </Section>

                <Section title="Orders by Status">
                    <ChartContainer config={statusConfig} className="aspect-auto h-64 w-full">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent nameKey="status" />} />
                            <Pie
                                data={ordersByStatus}
                                dataKey="count"
                                nameKey="status"
                                innerRadius={50}
                                strokeWidth={2}
                                stroke="var(--card)"
                            >
                                {ordersByStatus.map((entry) => (
                                    <Cell key={entry.status} fill={STATUS_COLOR[entry.status]} />
                                ))}
                            </Pie>
                            <ChartLegend content={<ChartLegendContent nameKey="status" />} />
                        </PieChart>
                    </ChartContainer>
                </Section>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
                <Section title="Top Cuisines">
                    <ChartContainer config={cuisineConfig} className="aspect-auto h-64 w-full">
                        <BarChart
                            data={topCuisines}
                            layout="vertical"
                            margin={{ left: 8, right: 16 }}
                        >
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="cuisine"
                                type="category"
                                tickLine={false}
                                axisLine={false}
                                width={64}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar
                                dataKey="quantity"
                                fill="var(--color-quantity)"
                                radius={4}
                                barSize={20}
                            />
                        </BarChart>
                    </ChartContainer>
                </Section>

                <Section
                    title="Recent Invoices"
                    action={<DetailsLink url="/shopper/invoices" label="View All" />}
                >
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Invoice Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-end">Amount</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {recentInvoices.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.customer}</TableCell>
                                    <TableCell>{item.invoiceDate}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={item.status} />
                                    </TableCell>
                                    <TableCell className="text-end">
                                        {formatCurrency(item.amount)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Section>
            </div>
        </section>
    )
}

function StatTile({
    icon,
    label,
    value,
}: {
    icon: Parameters<typeof HugeiconsIcon>[0]["icon"]
    label: string
    value: string
}) {
    return (
        <Section>
            <div className="flex items-center gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <HugeiconsIcon icon={icon} size={22} />
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-2xl font-semibold text-primary">{value}</p>
                </div>
            </div>
        </Section>
    )
}
