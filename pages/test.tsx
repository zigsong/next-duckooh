import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Test(props) {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log(id);
    // console.log(props);
    // console.log(props.router.query);
  }, []);

  return (
    <>
      <h3>Test Page</h3>
      {/* <div>{...props}</div> */}
    </>
  );
}
