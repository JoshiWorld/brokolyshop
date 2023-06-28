import * as React from 'react';

function SiteFooter() {
  return (
    <footer className="bottom-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        Copyright <span className="color: #f9826c;">brokoly</span>{' '}
        {new Date().getFullYear()}
      </div>
    </footer>
  );
}

export default SiteFooter;
