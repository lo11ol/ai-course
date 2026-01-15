import React, { useEffect, useRef } from 'react';
import { init } from '@waline/client';
import '@waline/client/style';

export default function Comment() {
  const walineInstanceRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    walineInstanceRef.current = init({
      el: containerRef.current,
      // ⚠️ 必须与 Nginx 配置一致
      serverURL: 'https://aicourse.unnomad.com/comment', 
      lang: 'zh-CN',
      dark: 'html[data-theme="dark"]', // 适配 Docusaurus 的深色模式
    });

    return () => {
      if (walineInstanceRef.current) {
        walineInstanceRef.current.destroy();
      }
    };
  }, []);

  return <div id="waline" ref={containerRef} style={{ marginTop: '2rem' }} />;
}
