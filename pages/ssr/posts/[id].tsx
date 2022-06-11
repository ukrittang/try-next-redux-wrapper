import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { wrapper } from '../../../store';
import { fetchPost, selectPost } from '../../../store/slices/post';

const SSRPost = () => {
  const content = useSelector(selectPost());

  if (!content) {
    return <div>RENDERED WITHOUT CONTENT FROM STORE!!!???</div>;
  }

  return (
    <div>
      <h3>{content.title}</h3>
      <div>{content.body}</div>
      <Link href="/ssr/posts/1">
        <a>Go id=1</a>
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link href="/ssr/posts/2">
        <a>Go id=2</a>
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link href="/ssg/posts/1">
        <a>Go id=1 (SSG)</a>
      </Link>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }: any) => {
      await store.dispatch(fetchPost(params.id));
      return {
        props: {},
      };
    }
);

export default SSRPost;
