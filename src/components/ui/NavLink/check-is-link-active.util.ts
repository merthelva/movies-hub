const checkIsLinkActive = (pathname: string, href: string) => {
  let isActive = false;
  if (href === "/") {
    isActive = pathname === "/";
  } else {
    isActive = pathname === href || pathname.startsWith(`${href}/`);
  }

  return isActive;
};

export { checkIsLinkActive };
