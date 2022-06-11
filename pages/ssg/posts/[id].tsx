import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import { wrapper } from '../../../store';
import { fetchPost, selectPost } from '../../../store/slices/post';

const SSGPost = () => {
  const content = useSelector(selectPost());

  if (!content) {
    return <div>RENDERED WITHOUT CONTENT FROM STORE!!!???</div>;
  }

  return (
    <div>
      <h3>{content.title}</h3>
      <div>{content.body}</div>
      <Link href="/ssg/posts/1">
        <a>Go id=1</a>
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link href="/ssg/posts/2">
        <a>Go id=2</a>
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link href="/ssr/posts/1">
        <a>Go id=1 (SSR)</a>
      </Link>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }: any) => {
      await store.dispatch(fetchPost(params.id));
      return {
        props: {
          id: params.id,
        },
      };
    }
);

export default SSGPost;
