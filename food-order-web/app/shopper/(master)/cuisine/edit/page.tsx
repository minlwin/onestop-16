import { Suspense } from "react";
import CuisineEditComponent from "../_component/edit_component";

export default function CuisineEditPage() {
    return (
        <Suspense>
            <CuisineEditComponent />
        </Suspense>
    )
}