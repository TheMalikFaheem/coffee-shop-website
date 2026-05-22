import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext(null);

export const useRouter = () => useContext(RouterContext);

export function Router({ children }) {
  const [path, setPath] = useState(() => {
    // Read route on load: support hash-based fallback (e.g. #/menu/mocha-brew) or pathname
    if (window.location.hash.startsWith('#/')) {
      return window.location.hash.slice(1);
    }
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handleNavigationChange = () => {
      if (window.location.hash.startsWith('#/')) {
        setPath(window.location.hash.slice(1));
      } else {
        setPath(window.location.pathname || '/');
      }
    };

    window.addEventListener('popstate', handleNavigationChange);
    window.addEventListener('hashchange', handleNavigationChange);
    
    return () => {
      window.removeEventListener('popstate', handleNavigationChange);
      window.removeEventListener('hashchange', handleNavigationChange);
    };
  }, []);

  const navigate = (to) => {
    // Determine whether to use hash navigation based on what is active
    const useHash = window.location.hash.startsWith('#/') || to.startsWith('#/');
    
    if (useHash) {
      const hashVal = to.startsWith('#/') ? to : '#' + to;
      window.location.hash = hashVal;
      setPath(hashVal.slice(1));
    } else {
      window.history.pushState(null, '', to);
      setPath(to);
    }
    
    // Smoothly scroll window to the top on page transition
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function Link({ href, className, children, ...props }) {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    // Only intercept standard clicks (no command/ctrl/shift clicks, no right clicks)
    if (
      e.button === 0 &&
      !e.metaKey &&
      !e.altKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      href &&
      !href.startsWith('http') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:')
    ) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
