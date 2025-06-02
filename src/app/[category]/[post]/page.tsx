import Image from "next/image";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import SideRelatedCard from "@/components/SideRelatedCard/SideRelatedCard";
import { dummyPosts } from "@/dummyData/dummyData";
import ShareButton from "@/components/ShareButton";

export async function generateMetadata() {
    const post = dummyPosts[0];

    return {
        title: post.title,
        description: post.excerpt || post.article?.slice(0, 160),
        openGraph: {
            title: post.title,
            description: post.excerpt || post.article?.slice(0, 160),
            images: [
                {
                    url: post.mainPhotoURL || "/images/photo-9.jpg",
                    width: 800,
                    height: 600,
                },
            ],
            type: 'article',
        },
    };
}

const PostPage = () => {
    return (
        <div>
            <Breadcrumb className="mt-2">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/${dummyPosts[0].categorySlug}`}>{dummyPosts[0].category}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{dummyPosts[0].title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Flexbox-only layout */}
            <div className="w-full max-w-7xl px-4 py-8 mx-auto flex flex-col justify-between md-lg:flex-row gap-8">

                {/* Main Content */}
                <div className="flex-1 flex flex-col gap-6 xl:max-w-[800px]">
                    {/* Title */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <h1 className="max-w-full sm:max-w-[730px] text-2xl sm:text-3xl font-bold leading-tight text-DX_blue dark:text-white">
                            {dummyPosts[0].title}
                        </h1>
                        <ShareButton />
                    </div>

                    {/* Main Image */}
                    <div className="relative w-full aspect-[4/3] md-lg:aspect-[16/9] overflow-hidden">
                        <Image
                            alt=""
                            src="/images/photo-9.jpg"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Table of Contents */}

                    <Accordion type="single" collapsible defaultValue="tableOfContent" className="w-full">
                        <AccordionItem value="tableOfContent">
                            <AccordionTrigger>
                                <h2 className="text-xl font-semibold text-black dark:text-white">Table of Contents</h2>
                            </AccordionTrigger>
                            <AccordionContent className="ml-6">
                                <ul className="list-disc pl-5">
                                    {dummyPosts[0].tableOfContent?.map((item, index) => (
                                        <li key={index} className="text-gray-700 dark:text-gray-300">
                                            <a href={`#${item.id}`} className="hover:underline">
                                                {item.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>


                    {/* Article Content */}
                    <div className="flex flex-col md-lg:flex-row xl:w-[580px] justify-between gap-8 text-black dark:text-white">
                        <div className="flex-1 min-w-0">
                            <article
                                dangerouslySetInnerHTML={{
                                    __html: dummyPosts[0].article || "",
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="w-full md-lg:max-w-xs md-lg:w-80 flex-shrink-0 flex flex-col gap-6 xl:w-[300px]">
                    <div className="h-40 w-full bg-gray-200 rounded shadow" />
                    <h3 className="text-xl font-semibold text-DX_blue dark:text-white">Related topics</h3>
                    {dummyPosts.slice(9, 12).map((post) => (
                        <SideRelatedCard
                            key={post.id}
                            mainPhotoURL={post.mainPhotoURL}
                            alt={post.alt}
                            title={post.title}
                            slug={`/${post.categorySlug}/${post.slug}`}
                        />
                    ))}
                </aside>
            </div>

        </div>
    );
};

export default PostPage;
