import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { wrapper } from '../../../store';
import { fetchPosts, selectPosts } from '../../../store/slices/post';

const SSRPosts = () => {
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
      <Link href="/ssg/posts">
        <a>Go SSG Post List</a>
      </Link>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchPosts());
    return {
      props: {},
    };
  }
);

export default SSRPosts;
