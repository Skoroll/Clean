import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Partner.scss";

function Partner() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <div className='partner'>

    </div>
  );
}

export default Partner;
