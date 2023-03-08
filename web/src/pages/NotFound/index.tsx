import { Link } from "react-router-dom";

export const NotFound: React.FC = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white mt-20 py-24 px-6 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="flex justify-center">
          <img src="/tree.png" alt="christmas tree" className="h-40 w-40" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-ch-turqiouse px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
};
