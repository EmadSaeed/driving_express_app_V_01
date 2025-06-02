// components/BBCSection.tsx
import Image from "next/image";
import Link from "next/link";
import { dummyPosts } from "@/dummyData/dummyData";

export default function NewsCard() {
    return (
        <section className="py-10">
            <div className="max-w-screen-xl mx-auto px-4">
                {/* Heading */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Link href="/news/entertainment_and_arts" className="hover:underline text-blue-800">
                            Entertainment and TV
                        </Link>
                        <svg viewBox="0 0 32 32" width="1em" height="1em">
                            <path d="M21.6 14.3 5.5 31h6.4l14.6-15L11.9 1H5.5l16.1 16.7z" fill="currentColor" />
                        </svg>
                    </h2>
                    <p className="text-gray-600 mt-1">Latest news and must-see moments</p>
                </div>

                {/* Grid */}
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
                    {dummyPosts.slice(0, 6).map((post, index) => (
                        <li key={index} className="flex flex-col bg-gray-50 rounded-md shadow-sm overflow-hidden">
                            <Link href={post.slug}>
                                <Image
                                    src={post.mainPhotoURL}
                                    alt={post.title}
                                    width={480}
                                    height={270}
                                    className="object-cover w-full h-48"
                                />
                            </Link>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">
                                    <Link href={post.slug} className="hover:underline text-black">
                                        {post.title}
                                    </Link>
                                </h3>
                                {/* {post.excerpt && <p className="mt-2 text-sm text-gray-700">{post.excerpt}</p>} */}
                                <p className="mt-4 text-xs text-gray-500">{post.category}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <div className="mt-8">
                    <Link
                        href="/news/entertainment_and_arts"
                        className="inline-flex items-center text-blue-800 font-medium hover:underline"
                    >
                        View more
                        <svg viewBox="0 0 32 32" width="1em" height="1em" className="ml-1">
                            <path d="M21.6 14.3 5.5 31h6.4l14.6-15L11.9 1H5.5l16.1 16.7z" fill="currentColor" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
