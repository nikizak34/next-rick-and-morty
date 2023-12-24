import React from 'react';
import {API} from "../../assets/api/api";
import {CharacterType, ResponseType} from "../../assets/api/rick-and-morty-api";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {Header} from "../../components/Header/Header";
import {CharacterCard} from "../../components/Card/CharacterCard/CharacterCard";

export const getStaticProps = async () => {
    const characters = await API.rickAndMorty.getCharacters()
    return {
        props: {
            characters
        }
    }
}
type Props = {
    characters: ResponseType<CharacterType>
}
const Characters = ({characters}: Props) => {
    const characterList = characters.results.map(el =>
        <CharacterCard character={el} key={el.id}/>)
    return (
        <PageWrapper>
            <Header/>
            {characterList}
        </PageWrapper>
    );
};
export default Characters;