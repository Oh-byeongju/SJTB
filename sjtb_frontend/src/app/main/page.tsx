import Link from 'next/link';

export default function BlogDetails(props: any) {
  return (
    <h1>
      fff
      {/* //Product {props.params.productId} / {props.searchParams.country} Details */}
      <Link href="/about">
        <button>About 페이지로 이동</button>
      </Link>
    </h1>
  );
}