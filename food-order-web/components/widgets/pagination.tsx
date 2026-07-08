import { Pager } from "@/lib/model";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft, ArrowRight } from "@hugeicons/core-free-icons";

export default function Pagination({pager, className, onPageClick} : {
    pager? : Pager, 
    className?: string, 
    onPageClick?: (page : number) => void,
}) {

    if(!pager || pager.totalPage <= 1) {
        return (
            <></>
        )
    }

    return (
        <section className={cn(className, 'flex justify-between items-center gap-1')}>
            <div className="flex gap-2">
                <div>Page : {pager.page + 1} / {pager.totalPage}</div>
                <div>Records : {pager.totalCount}</div>
            </div>

            <div className="flex gap-2">
                <Button variant={'outline'} type="button" onClick={() => onPageClick?.(0)}>
                    <HugeiconsIcon icon={ArrowLeft} />
                </Button>

                {pager.links.map(link => 
                    <Button key={link} variant={pager.page === link ? 'default' : 'outline'} type="button" onClick={() => onPageClick?.(link)}>
                        <span className="inline-block">{link + 1}</span>
                    </Button>
                )}

                <Button variant={'outline'} type="button" onClick={() => onPageClick?.(pager.totalPage - 1)}>
                    <HugeiconsIcon icon={ArrowRight} />
                </Button>
            </div>

        </section>
    )
}