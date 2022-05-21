function PageLoader() {
  return (
    <div className="pageLoader">
      <div className="pageLoader__inner">
        <svg
          width="50px"
          height="40px"
          version="1.1"
          className="pageLoader__svg"
        >
          <path
            fill="transparent"
            stroke="#ffffff"
            strokeWidth="2"
            d="M 27.75,18.25
            C 27.75,18.25 20.75,5.25 20.75,5.25
              20.75,5.25 5.25,35.75 5.25,35.75
              5.25,35.75 44.25,36.00 44.25,36.00
              44.25,36.00 31.50,14.50 31.50,14.50
              31.50,14.50 19.50,35.00 19.50,35.00"
            className="pageLoader__path"
          ></path>
        </svg>
        <span className="pageLoader__text">Holidaze loading...</span>
      </div>
    </div>
  );
}

export default PageLoader;
