import React, { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router';
import ReactGA from 'react-ga';

export default function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (!location) return;
    ReactGA.pageview(location.pathname);
  }, [location]);

  return <Fragment></Fragment>;
}
