"use client"

import { useEffect, useState } from "react"
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
import { useForm } from "react-hook-form"
import {
    CategoryForm,
    CategorySchema,
    CategorySearchForm,
    CategorySearchSchema,
    MASTER_STATUS,
} from "@/lib/model/form/master-data.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import FormsSelect from "@/components/widgets/forms/forms-select"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Save, Search } from "@hugeicons/core-free-icons"
import FormsInput from "@/components/widgets/forms/forms-input"
import AddNewBtn from "@/components/widgets/add-new-btn"
import DetailsLink from "@/components/widgets/details-link"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { CategoryListItem } from "@/lib/model/output/master-data.model"
import * as service from "@/lib/action/shopper/master/category.action"
import NoDataWidget from "@/components/widgets/no-data"
import { useFetch } from "@/hooks/use-fetch"

const SEARCH_FORM: CategorySearchForm = {
    keyword: "",
    status: "",
}

export default function CategoryMasterPage() {
    const { setTitle } = usePageTitle()
    const [show, setShow] = useState(false)

    const [searchForm, setSearchForm] = useState<CategorySearchForm>({ ...SEARCH_FORM })
    const [searchResult, setSearchResult] = useFetch(() => service.search(SEARCH_FORM), [])

    useEffect(() => {
        setTitle("Category Master")
    }, [])

    const form = useForm<CategoryForm>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: "",
            status: "",
        },
    })

    const create = () => {
        form.reset()
        setShow(true)
    }

    const save = async (editForm: CategoryForm) => {
        await service.create(editForm)
        form.reset()
        setShow(false)
        setSearchForm({ ...SEARCH_FORM })
        await search({ ...SEARCH_FORM })
    }

    const search = async (form: CategorySearchForm) => {
        const result = await service.search(form)
        setSearchResult(result)
    }

    return (
        <section className="space-y-6">
            <SearchForm searchForm={searchForm} onSearch={search} onAddNew={create} />

            <ResultTable list={searchResult ?? []} />

            <Dialog open={show} onOpenChange={setShow}>
                <DialogContent>
                    <form onSubmit={form.handleSubmit(save)}>
                        <DialogHeader>
                            <DialogTitle>Create Category</DialogTitle>
                            <DialogDescription>
                                Create a new category to organize your menu items.
                            </DialogDescription>
                        </DialogHeader>

                        <section className="my-4 space-y-4">
                            <FormsInput control={form.control} path="name" label="Category Name" />
                            <FormsSelect
                                control={form.control}
                                path="status"
                                label="Status"
                                options={MASTER_STATUS}
                            />
                        </section>

                        <DialogFooter>
                            <Button type="submit">
                                <HugeiconsIcon icon={Save} /> Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    )
}

function SearchForm({
    searchForm,
    onSearch,
    onAddNew,
}: {
    searchForm: CategorySearchForm
    onSearch: (form: CategorySearchForm) => void
    onAddNew: VoidFunction
}) {
    const form = useForm<CategorySearchForm>({
        resolver: zodResolver(CategorySearchSchema),
        defaultValues: searchForm,
    })

    return (
        <Section>
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4">
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

                    <AddNewBtn onClick={onAddNew} />
                </div>
            </form>
        </Section>
    )
}

function ResultTable({ list }: { list: CategoryListItem[] }) {
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
                        <TableHead>Category</TableHead>
                        <TableHead className="text-end">Cuisines</TableHead>
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
                            <TableCell className="text-end">{item.cusines}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.createdAt}</TableCell>
                            <TableCell>{item.modifiedAt}</TableCell>
                            <TableCell className="flex justify-center">
                                <DetailsLink url={`/shopper/category/${item.id}`} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Section>
    )
}
