function PageLoader() {
  return (
    <div className="pageLoader">
      <div className="pageLoader__inner">
        <svg
          width="300px"
          height="65px"
          version="1.1"
          className="pageLoader__svg"
        >
          <path
            fill="transparent"
            stroke="#ffffff"
            strokeWidth="4"
            d="M 46.50,30.75
           C 46.50,30.75 33.75,8.00 33.75,8.00
             33.75,8.00 8.75,58.25 8.75,58.25
             8.75,58.25 71.75,58.75 71.75,58.75
             71.75,58.75 51.25,23.00 51.25,23.00
             51.25,23.00 32.25,56.25 32.25,56.25"
            className="pageLoader__path"
          ></path>
        </svg>
        <span className="pageLoader__text">Holidaze loading...</span>
      </div>
    </div>
  );
}

export default PageLoader;
