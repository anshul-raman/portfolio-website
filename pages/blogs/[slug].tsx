import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import type { NextPage } from "next";
import { getSlug, getArticleFromSlug } from "../../src/utils/mdx";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeCodeTitles from "rehype-code-titles";
import Head from "next/head";
import dayjs from "dayjs";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote";
import "highlight.js/styles/atom-one-dark-reasonable.css";

type BlogProps = {
  post: any;
};

const Blog: NextPage<BlogProps> = ({ post: { source, frontmatter } }) => {
  return (
    <>
      <Head>
        <title>{frontmatter.title} | My blog</title>
      </Head>

      <main className=" flex flex-col justify-center content-center min-h-screen p-3 ">
        {/* Man center div */}
        <div className="  max-w-2xl mx-auto space-y-10">
          <h1 className="article-title">{frontmatter.title}</h1>
          <p className="publish-date">
            {dayjs(frontmatter.publishedAt).format("MMMM D, YYYY")} &mdash;{" "}
            {frontmatter.readingTime}
          </p>
          <div className=" prose">
            <MDXRemote {...source} components={{ Image }} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
  // getting all paths of each article as an array of
  // objects with their unique slugs
  const paths = (await getSlug()).map((slug) => ({ params: { slug } }));

  console.log(paths);

  return {
    paths,
    // in situations where you try to access a path
    // that does not exist. it'll return a 404 page
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //fetch the particular file based on the slug
  const { slug } = params;
  const { content, frontmatter } = await getArticleFromSlug(slug);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: { className: ["anchor"] },
          },
          { behaviour: "wrap" },
        ],
        rehypeHighlight,
        rehypeCodeTitles,
      ],
    },
  });

  return {
    props: {
      post: {
        source: mdxSource,
        frontmatter,
      },
    },
  };
};
