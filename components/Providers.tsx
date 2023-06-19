"use client";

import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface Props {
  children: ReactNode,
}

const Providers = ({ children }: Props) => {
  // @ts-ignore
  return <SessionProvider>{children}</SessionProvider>;
}

export default Providers;
