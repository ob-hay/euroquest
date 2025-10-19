import { getBlogs, searchBlogs } from "@/services/services";
import BlogsList from "./blogs-list";
import { Suspense } from "react";
import SearchInput from "@/components/shared/search-input";

interface BlogsSectionProps {
  searchParams: {
    keyword?: string;
    page?: string;
  };
}

// Loading component for suspense
function BlogsLoading() {
  return (
    <div className="text-center py-16" role="status" aria-live="polite">
      <div
        className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#3E5EC0] border-t-transparent"
        aria-hidden="true"
      ></div>
      <p className="mt-4 text-gray-600 font-medium">Loading blogs...</p>
      <span className="sr-only">Loading blogs, please wait...</span>
    </div>
  );
}

// Server component for fetching and rendering blogs
async function BlogsContent({
  keyword,
  page,
}: {
  keyword?: string;
  page: number;
}) {
  // Use searchBlogs for GET request with search parameters in query string
  const blogsData = await searchBlogs({
    keyword: keyword || undefined,
    page: page,
  });

  return <BlogsList blogsData={blogsData} searchKeyword={keyword} />;
}

export default async function BlogsSection({
  searchParams,
}: BlogsSectionProps) {
  const keyword = searchParams.keyword;
  const page = parseInt(searchParams.page || "1", 10);

  return (
    <>
      {/* Client Component for Search Input */}
      <SearchInput
        placeholder="Search for Blog"
        resetPageOnSearch={true}
        className="mb-6"
      />
      {/* Server Component for Blogs List with Suspense */}
      <Suspense key={`${keyword}-${page}`} fallback={<BlogsLoading />}>
        <BlogsContent keyword={keyword} page={page} />
      </Suspense>
    </>
  );
}
