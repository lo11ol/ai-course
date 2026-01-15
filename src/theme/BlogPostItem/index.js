import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import Comment from '@site/src/components/Comment';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';

export default function BlogPostItemWrapper(props) {
  const { metadata, isBlogPostPage } = useBlogPost();

  return (
    <>
      <BlogPostItem {...props} />
      {/* 只在博客详情页显示评论，列表页不显示 */}
      {isBlogPostPage && <Comment />}
    </>
  );
}
