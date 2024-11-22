
import React, { useRef } from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./FAQ.scss";

function FAQ() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <div className='FAQ'>
      <p>FAQ</p>
    </div>
  );
}

export default FAQ;
