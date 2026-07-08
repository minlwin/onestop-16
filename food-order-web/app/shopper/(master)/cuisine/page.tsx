"use client"

import { useEffect } from "react"
import { usePageTitle } from "../../_states/page-title-provider"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Section from "@/components/widgets/section"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import FormsInput from "@/components/widgets/forms/forms-input"
import FormsSelect from "@/components/widgets/forms/forms-select"
import {
    CuisineSearchForm,
    CuisineSearchSchema,
    MASTER_STATUS,
} from "@/lib/model/form/master-data.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "@hugeicons/core-free-icons"
import { useForm } from "react-hook-form"
import AddNewBtn from "@/components/widgets/add-new-btn"
import DetailsLink from "@/components/widgets/details-link"
import { useRouter } from "next/navigation"
import { CuisineListItem } from "@/lib/model/output/master-data.model"
import { PageResult } from "@/lib/model"
import Pagination from "@/components/widgets/pagination"
import NoDataWidget from "@/components/widgets/no-data"
import { useFetch } from "@/hooks/use-fetch"

import * as service from "@/lib/action/master/cuisine.action"

const SEARCH_FORM: CuisineSearchForm = {
    keyword: "",
    status: "",
    page: 0,
}

export default function CuisineMasterPage() {
    const { setTitle } = usePageTitle()
    const router = useRouter()

    const form = useForm<CuisineSearchForm>({
        resolver: zodResolver(CuisineSearchSchema),
        defaultValues: {
            ...SEARCH_FORM,
        },
    })

    const [searchResult, setSearchResult] = useFetch(() => service.search(SEARCH_FORM), [])

    useEffect(() => {
        setTitle("Cuisine Master")
    }, [])

    const search = async (form: CuisineSearchForm) => {
        const result = await service.search(form)
        setSearchResult(result)
    }

    const onPageChange = async (page: number) => {
        form.setValue("page", page)
        await search(form.getValues())
    }

    return (
        <section className="space-y-6">
            <Section>
                <form onSubmit={form.handleSubmit(search)} className="flex gap-4">
                    <FormsSelect
                        control={form.control}
                        path="status"
                        label="Status"
                        options={MASTER_STATUS}
                        className="flex-2"
                    />
                    <FormsInput
                        control={form.control}
                        path="keyword"
                        label="Keyword"
                        className="flex-3"
                    />

                    <div className="flex-4 flex gap-2 items-end">
                        <Button type="submit">
                            <HugeiconsIcon icon={Search} /> Search
                        </Button>

                        <AddNewBtn onClick={() => router.push("/shopper/cuisine/edit")} />
                    </div>
                </form>
            </Section>

            <ResultTable list={searchResult?.contents || []} />

            <Pagination pager={searchResult?.pager} className="my-4" onPageClick={onPageChange} />
        </section>
    )
}

function ResultTable({ list }: { list: CuisineListItem[] }) {
    if (list.length === 0) {
        return (
            <Section>
                <NoDataWidget />
            </Section>
        )
    }

    return (
        <Section>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Cuisine</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-end">Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Last Modified At</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {list.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.category.name}</TableCell>
                            <TableCell className="text-end">{item.price}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.createdAt}</TableCell>
                            <TableCell>{item.modifiedAt}</TableCell>
                            <TableCell className="flex justify-center">
                                <DetailsLink url={`/shopper/cuisine/${item.id}`} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Section>
    )
}
