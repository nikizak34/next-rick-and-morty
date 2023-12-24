import React from 'react';
import {API} from "../../assets/api/api";
import {EpisodeType, ResponseType} from "../../assets/api/rick-and-morty-api";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {Header} from "../../components/Header/Header";
import {Card} from "../../components/Card/Card";

export const getServerSideProps = async () => {
    const episodes = await API.rickAndMorty.getEpisodes()
    if (!episodes) {
        return {
            notFound: true
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
            <Header/>
            {episodesList}
        </PageWrapper>
    );
};
export default Episodes;