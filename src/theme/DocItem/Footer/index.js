import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import Comment from '@site/src/components/Comment';

export default function FooterWrapper(props) {
  return (
    <>
      <Footer {...props} />
      <Comment />
    </>
  );
}
