import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const ScrollToTop = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unlisten = navigate(({ location }) => {
      // scrollToTop logic
      window.scrollTo(0, 0);
    });

    return () => {
      unlisten();
    };
  }, [navigate]);

  return null;
};

export default ScrollToTop;
