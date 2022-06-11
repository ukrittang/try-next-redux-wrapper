import React from 'react';
import { GetStaticProps } from 'next';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { wrapper } from '../../../store';
import { fetchPosts, selectPosts } from '../../../store/slices/post';

const SSGPosts = () => {
  const posts = useSelector(selectPosts());

  if (!posts) {
    return <div>RENDERED WITHOUT CONTENT FROM STORE!!!???</div>;
  }

  return (
    <div>
      <h3>Post List</h3>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <Link href="/ssr/posts">
        <a>Go SSR Post List</a>
      </Link>
    </div>
  );
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    await store.dispatch(fetchPosts());
    return {
      props: {},
    };
  }
);

export default SSGPosts;
