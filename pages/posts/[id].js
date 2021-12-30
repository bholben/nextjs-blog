import Head from "next/head";
import Layout from "../../components/layout";
import Date from "../../components/date";
import { getPostIds, getPost } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";

const Post = ({ post: { title, date, contentHtml } }) => (
  <Layout>
    <Head>
      <title>{title}</title>
    </Head>
    <article>
      <h1 className={utilStyles.headingXl}>{title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  </Layout>
);

export default Post;

export const getStaticPaths = async () => ({
  paths: getPostIds(),
  fallback: false,
});

export const getStaticProps = async ({ params }) => ({
  props: { post: await getPost(params.id) },
});
