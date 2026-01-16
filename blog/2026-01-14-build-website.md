---
slug: build-ai-knowledge-base-full-guide
title: 全栈实战：从零构建高性能 AI 课程知识库 (手机/PC双端优化版)
date: 2026-01-14
authors:
  - name: lo11ol
    title: 全栈 AI 开发者
    url: https://github.com/lo11ol
    image_url: https://github.com/lo11ol.png
tags: [Docusaurus, 全栈开发, 移动端适配, 微信公众号同步, B站专栏]
keywords: [AI知识库, 响应式网站设计, 公众号排版, 知识付费搭建, 程序员副业]
description: 一套代码，全网分发。本文教你搭建支持手机端完美访问的 AI 知识库，并打通微信、B站等全媒体渠道。
image: https://aicourse.unnomad.com/img/mobile-preview.jpg
---

> **📱 移动端阅读提示**：本文已针对手机竖屏进行排版优化。
> 关注公众号 **[你的公众号名称]**，回复 "源码" 获取本文的一键部署脚本。

在 AI 时代，单纯的写代码已经不够了。我们需要构建自己的“数字资产”**。
本文不仅教你搭建一个技术网站，还会教你如何让这个网站的内容，自动适应**手机、微信、B站等全平台分发。

<!--truncate-->

## 为什么选择 Docusaurus 构建 AI 知识库？

在搭建 `aicourse.unnomad.com` 时，我选择了 Docusaurus，因为它天生具备**高性能**、**SEO 友好**和**Markdown 驱动**的特性，非常适合用来托管技术文档和 AI 课程笔记。配合阿里云的稳定基础设施，我们能构建出一个秒开的现代化网站。

## 为什么你需要一个“AI 知识库”？

在 AI 爆发的时代，我们缺的不是工具，而是“如何用好工具的说明书”。

很多人觉得 AI 难学，是因为知识太碎片化了。今天学个 ChatGPT，明天出个 Sora，后天又是 Kimi。
我们需要一个地方，把这些碎片化的技巧整理起来，形成自己的“第二大脑”。

这个网站（aicourse.unnomad.com）就是我的实践。它不仅仅是一个网站，更是我的：

*   **提示词字典：** 遇到写周报、做图、写文案，复制即用。
*   **工具导航：** 收录最好用的 AI 工具，不再大海捞针。
*   **避坑指南：** 记录使用 AI 过程中的经验教训。

## 即使不懂代码，你也能拥有它

很多人一听到“建网站”就觉得是程序员的事。其实，现在的技术已经非常亲民。
这个网站的搭建逻辑非常简单，就像搭积木一样：

1.  **底座 (阿里云服务器)：** 相当于我们在云端租了一间“小房子”。
2.  **装修 (Docusaurus)：** 这是一套现成的“装修方案”，专门用来展示文档和知识，界面干净，手机看也很舒服。
3.  **门牌 (域名)：** 给你的房子挂个牌子，方便朋友找到。

为了让大家都能上手，我把复杂的安装过程浓缩成了一个**“一键脚本”**。你不需要理解背后的 Linux 原理，只需要像安装软件一样运行它，就能拥有一个和这里一模一样的知识库。

> 如果你对技术感兴趣，可以复制下方代码尝试；如果你只想关注内容，可以直接订阅我的更新，获取整理好的 PDF 版本。

---

## 架构设计概览

我们的核心 DevOps 工作流如下：

*   **本地开发环境**：使用 WSL (Ubuntu) + PyCharm 进行高效编码。
*   **版本控制**：通过 GitHub 管理代码，确保数据安全。
*   **云端部署**：在 阿里云 ECS 上拉取代码，通过 Nginx 反向代理并开启 HTTPS 安全访问。

---

## 第一部分：服务器环境一键初始化 (Shell 脚本)

为了提高部署效率，避免重复造轮子，我编写了一个 Ubuntu 服务器初始化脚本。这个脚本可以自动安装 Node.js 22、Nginx、Git 和 Certbot。

**脚本名称：`setup_server.sh`**

```bash
#!/bin/bash

# 检查是否以 root 权限运行
if [ "$EUID" -ne 0 ]
  then echo "请使用 sudo 运行此脚本"
  exit
fi

echo "=== 1. 系统更新与基础工具安装 ==="
apt update && apt upgrade -y
apt install -y curl git

echo "=== 2. 安装 Node.js 22.x LTS (Docusaurus 依赖) ==="
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
# 验证安装
node -v
npm -v

echo "=== 3. 安装 Nginx Web 服务器 ==="
apt install -y nginx
systemctl enable nginx
systemctl start nginx

echo "=== 4. 安装 Certbot (用于 HTTPS SSL 证书) ==="
apt install -y certbot python3-certbot-nginx

echo "=== 5. 创建项目目录结构 ==="
# 创建网站根目录
mkdir -p /var/www/ai-course
chmod -R 755 /var/www/ai-course

echo "=== 环境初始化完成！请继续配置 Nginx。 ==="
```

---

## 第二部分：Nginx 高性能配置 (支持 SPA 与 Gzip)

对于 Docusaurus 这种单页应用 (SPA)，Nginx 的配置至关重要。我们需要配置 `try_files` 防止刷新 404，并开启 Gzip 压缩以提升谷歌 PageSpeed 评分。

**编辑配置文件：** `sudo nano /etc/nginx/conf.d/ai-course.conf`

```nginx
server {
    listen 80;
    # 填写你的真实域名
    server_name aicourse.unnomad.com;

    # 指向 Docusaurus 构建后的静态文件目录
    root /var/www/ai-course/build;
    index index.html index.htm;

    # SEO 关键：处理 SPA 路由，防止刷新变 404
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 性能优化：开启 Gzip 压缩，加速页面加载
    gzip on;
    gzip_min_length 1k;
    gzip_types text/plain application/javascript text/css application/xml;
    gzip_vary on;

    # 静态资源缓存策略 (7天)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
        expires 7d;
        add_header Cache-Control "public, no-transform";
    }
}
```

---

## 第三部分：自动化部署与 HTTPS 安全加固

### 1. 部署流程
在服务器端，我们只需要简单的 Git 操作即可完成更新：

```bash
cd /var/www/ai-course
git pull origin main
npm install  # 依赖变更时运行
npm run build
```

### 2. 开启 HTTPS (Let's Encrypt)
谷歌和百度都优先收录 HTTPS 网站。使用 Certbot 可以一键申请并自动续期 SSL 证书：

```bash
sudo certbot --nginx -d aicourse.unnomad.com
```

---

## 随时随地，口袋里的 AI 助理

效率工具的核心在于“随时可用”**。
我特意对这个知识库做了**手机端适配。

*   **在通勤路上：** 用手机复习昨晚学的 AI 概念。
*   **在会议室里：** 偷偷打开网站，查找适合当前场景的沟通话术。
*   **在电脑前：** 边看教程边实操，双屏效率翻倍。

## 这是一个开始，邀请你一起进化

搭建这个平台，初衷是倒逼自己输入和输出。
我并不是教大家写代码，而是希望通过这个载体，展示“普通人如何利用 AI 杠杆撬动更大的可能”。

在这个网站里，未来你会看到：

*   **职场 AI：** 如何用 AI 5分钟搞定 PPT 和数据分析。
*   **生活 AI：** 用 AI 制定旅游攻略、健身计划。
*   **创意 AI：** 零基础用 AI 画图、做视频。

---

## 💬 互动与留言

这是一个开放的学习空间，我非常期待听到你的声音。

由于这是一个纯净的静态知识库（为了速度和安全，没有做复杂的登录系统），你可以通过以下方式与我互动：

1.  **微信交流（推荐）：**
    关注公众号 **[你的公众号名称]**，在同名文章下留言。我会精选优质评论回复，并把大家的共性问题整理更新到网站上。

2.  **邮件直达：**
    如果你有具体的合作需求或深度问题，欢迎发送邮件至 `your-email@example.com`。

3.  **GitHub 极客交流：**
    如果你正好也有 GitHub 账号，欢迎点击页面底部的 **"Edit this page"** 或跳转到仓库提交 Discussion，我们可以探讨更硬核的玩法。

> **行动是缓解焦虑的唯一良药。**
> 让我们一起，从 AI 的使用者，进化为 AI 的驾驭者。