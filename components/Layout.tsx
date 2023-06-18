import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <>
    <div className="flex min-h-screen select-none bg-black font-Rajdhani text-white bg-dotted-spacing-4 bg-dotted-[#151515]">
      <div className="z-50 mx-auto w-full max-w-3xl">{children}</div>
    </div>
  </>
);

export default Layout;
