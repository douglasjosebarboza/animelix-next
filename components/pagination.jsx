export default function Pagination({
  page,
  maxPages,
  pageChange,
  isLoading,
  setIsLoading,
}) {
  const upNumberPage = () => {
    if (page + 1 <= maxPages && !isLoading) {
      setIsLoading(true)
      const newNumberPage = page + 1
      pageChange(newNumberPage)
      window.scrollTo(0, 0)
    }
  }
  const downNumberPage = () => {
    if (page - 1 > 0 && !isLoading) {
      setIsLoading(true)
      const newNumberPage = page - 1
      pageChange(newNumberPage)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="flex flex-row items-center justify-center gap-6 pb-7 text-xl font-bold text-white">
      <button
        type="button"
        className="h-10 w-10 rounded-full bg-blue-600 transition duration-100 ease-in hover:scale-105"
        onClick={downNumberPage}
        hidden={page === 1 || isLoading}
      >
        &laquo;
      </button>
      <button
        type="button"
        className="h-10 w-10 cursor-default rounded-full bg-blue-600"
      >
        {page}
      </button>
      <button
        type="button"
        className="h-10 w-10 rounded-full bg-blue-600 transition duration-100 ease-in hover:scale-105"
        onClick={upNumberPage}
        hidden={page === maxPages || isLoading}
      >
        &raquo;
      </button>
    </div>
  )
}
