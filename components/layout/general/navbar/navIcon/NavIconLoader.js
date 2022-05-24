import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useWindowSize from "../../../../../hooks/useWindowSize";
import Image from "next/image";
import desktopLogo from "../../../../../images/logo/logo-white.png";
import mobileIcon from "../../../../../images/logo/Icon-white.png";
import PageLoader from "../../../../loader/PageLoader";

function NavIconLoader() {
  const [pageLoading, setPageLoading] = useState(false);
  const router = useRouter();
  const windowSize = useWindowSize();

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  let navLogo = <Image src={desktopLogo} width={"150"} height={"50"} alt="" />;

  if (windowSize.width < 768) {
    navLogo = <Image src={mobileIcon} width={"49"} height={"40"} alt="" />;
  }

  return (
    <>
      {pageLoading ? (
        <PageLoader />
      ) : (
        <Link href="/">
          <div className="navbar__logo">{navLogo}</div>
        </Link>
      )}
    </>
  );
}

export default NavIconLoader;
