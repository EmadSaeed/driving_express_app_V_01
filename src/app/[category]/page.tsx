import CategoryHeader from "@/components/layout/categoryHeader";
import SubCategorySection from "@/components/SubCategorySection/SubCategorySection";
import { dummyCategory } from "@/dummyData/dummyData";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from '@/components/ui/breadcrumb';

const CategoryPage = () => {
    return (
        <div className="w-full min-h-screen">
            <CategoryHeader />
            <Breadcrumb className="mt-2 sm:ml-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{dummyCategory[0].title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <SubCategorySection />
            <SubCategorySection />
            <SubCategorySection />
        </div>
    )
}

export default CategoryPage;
