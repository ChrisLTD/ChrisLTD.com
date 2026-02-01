import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h1>Sorry, that page has vanished!</h1>

      <img
        src="/img/404.gif"
        alt="Page not found"
        className="rounded mx-auto my-8 max-w-md"
      />

      <p>
        Head over to the <Link href="/">homepage</Link>, or try searching the
        site:
      </p>

      <form
        action="https://duckduckgo.com/"
        method="get"
        className="search-form max-w-md mx-auto mt-4"
      >
        <input type="hidden" name="sites" value="chrisltd.com" />
        <input
          type="text"
          name="q"
          placeholder="Search..."
          className="flex-1 border border-faint-gray rounded px-3 py-2 focus:outline-none focus:border-orange"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>
    </div>
  );
}
