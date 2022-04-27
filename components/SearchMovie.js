import { useRouter } from "next/router";
import styles from "../scss/components/search.module.scss";
import Head from "next/head";
import SearchResultMovie from "./atoms/SearchResultMovie";
import SearchLayout from '../layouts/SearchLayout';
import PageContainer from './molecules/PageContainer';

function SearchMovie({ results, total_pages,total_results, base_url }) {
    const router = useRouter();
    let {page}=router.query
    let overview =
        "ZFlix is the largest free streaming platform for movies and tv shows. Collaborative media and info service featuring high quality content for a huge selection of titles and new releases! Available in all countries.";
    const currentURL="/en/search/movie"
   
    return (
        <SearchLayout total_results={total_results} active={1} link={currentURL}>
            <Head>
                <title>{router.query.q} - ZFlix</title>
                <meta name="title" content={"ZFlix - Watch Movies & TV Shows"} />
                <meta name="description" content={overview} />
                <meta
                    name="keywords"
                    content="Movies, TV Shows, Streaming, Reviews, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast"
                />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={base_url + router.asPath} />
                <meta property="og:site_name" content="ZFlix" />
                <meta property="og:title" content={"ZFlix - Watch Movies & TV Shows"} />
                <meta property="og:description" content={overview} />
                <meta property="og:image" content="/icons/apple-touch-icon.pngico" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={base_url + router.asPath} />
                <meta
                    property="twitter:title"
                    content={"ZFlix - Watch Movies & TV Shows"}
                />
                <meta property="twitter:description" content={overview} />
                <meta property="twitter:image" content="/icons/apple-touch-icon.pngico"></meta>
            </Head>
            {results?.length?
                <div className={styles.search_results}>
                    <PageContainer total_pages={total_pages} page={page?page:1} link={currentURL} />
                    <div className={styles.results_container}>
                        {results.map((item) =>
                            <SearchResultMovie item={item} key={item.id} />
                        )}
                    </div>
                    <PageContainer total_pages={total_pages} page={page?page:1} link={currentURL} />

                </div>
                :
                <div className={styles.no_result}>
                    There are no Movies that matched your query
                </div>
            }
        </SearchLayout>
    );
}

export default SearchMovie;
