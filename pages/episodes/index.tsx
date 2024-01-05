import React from 'react';
import {API} from "assets/api/api";
import {EpisodeType, ResponseType} from "assets/api/rick-and-morty-api";
import {PageWrapper} from "components/PageWrapper/PageWrapper";
import {Card} from "components/Card/Card";
import {getLayout} from "components/Layout/BaseLayout/BaseLayout";
import {GetServerSideProps} from "next";

export const getServerSideProps: GetServerSideProps = async ({res}) => {
    //res.setHeader('Cache-Control', 'public,s-maxage=10,stale-while-revalidate=100')
    const episodes = await API.rickAndMorty.getEpisodes()
    const isAuth = true
    if (!episodes) {
        return {
            notFound: true
        }
    }
    if (!isAuth) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: {
            episodes
        }
    }
}
type Props = {
    episodes: ResponseType<EpisodeType>
}
const Episodes = ({episodes}: Props) => {
    const episodesList = episodes.results.map(el =>
        <Card name={el.name} key={el.id}/>
    )
    return (
        <PageWrapper>
            {episodesList}
        </PageWrapper>
    );
};
Episodes.getLayout = getLayout
export default Episodes;