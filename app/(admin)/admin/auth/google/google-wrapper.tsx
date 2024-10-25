"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import PageComponent from "./page-component";

const GoogleWrapper = () => {
  return (
    <SessionProvider>
      <PageComponent />
    </SessionProvider>
  );
};

export default GoogleWrapper;
