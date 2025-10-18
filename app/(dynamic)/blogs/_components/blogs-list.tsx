import BlogCard from "@/components/cards/blog";
import BlogsPagination from "./blogs-pagination";

interface BlogsListProps {
  blogsData: BlogsApiResponse;
  searchKeyword?: string;
}

export default function BlogsList({ blogsData, searchKeyword }: BlogsListProps) {
  const { blogs } = blogsData;
  const totalPages = blogs.last_page;
  const hasNextPage = blogs.next_page_url !== null;
  const hasPrevPage = blogs.prev_page_url !== null;
  const currentPage = blogs.current_page;

  return (
    <section id="blogs-section" aria-label="Blog articles">
      {/* No Results */}
      {blogs.data.length === 0 && (
        <div className="text-center py-12" role="status" aria-live="polite">
          <article className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No blogs found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchKeyword
                ? `No blogs found for "${searchKeyword}". Try a different search term.`
                : "No blogs available at the moment."}
            </p>
          </article>
        </div>
      )}

      {/* Blogs Grid - Server Rendered */}
      {blogs.data.length > 0 && (
        <>
          {/* Results summary for SEO */}
          <div className="sr-only" role="status">
            Showing {blogs.from} to {blogs.to} of {blogs.total} blog articles
            {searchKeyword && ` matching "${searchKeyword}"`}
          </div>

          <div
            className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 mb-8"
            role="list"
            aria-label={`${blogs.total} blog articles${searchKeyword ? ` matching "${searchKeyword}"` : ""}`}
          >
            {blogs.data.map((blog: Blog) => (
              <article role="listitem" key={blog.id}>
                <BlogCard blog={blog} />
              </article>
            ))}
          </div>

          {/* Pagination - Client Component */}
          <BlogsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            links={blogs.links}
          />
        </>
      )}
    </section>
  );
}

