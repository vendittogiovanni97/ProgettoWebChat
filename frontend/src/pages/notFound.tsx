const NotFound404Paged = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-white text-9xl font-bold animate-bounce">404</div>
      <div className="text-white text-2xl mt-4 animate-pulse">
        Oops! Pagina non trovata.
      </div>
      <div className="mt-8">
        <a
          href="/home"
          className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-purple-100 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Torna alla Home
        </a>
      </div>
    </div>
  );
};

export default NotFound404Paged;
