import React from 'react';
import {API} from "../../assets/api/api";
import {CharacterType} from "../../assets/api/rick-and-morty-api";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {CharacterCard} from "../../components/Card/CharacterCard/CharacterCard";
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import {useRouter} from "next/router";
import styled from "styled-components";


export const getStaticPaths: GetStaticPaths = async () => {
    const {results} = await API.rickAndMorty.getCharacters()
    const paths = results.map(el => ({
        params: {id: String(el.id)}
    }))
    return {
        paths,
        fallback: 'blocking'
    }
}
export const getStaticProps: GetStaticProps = async ({params}) => {
    const {id} = params || {}
    const character = await API.rickAndMorty.getCharacter(id as string)
    if (!character) return {
        notFound: true
    }
    return {
        props: {
            character
        }
    }
}

type Props = {
    character: CharacterType
}
const Character = ({character}: Props) => {
    const router = useRouter()
    if (router.isFallback) return <h1>Loading...</h1>
    const characterId = router.query.id
    const goToCharacters = () => router.push('/characters')

    return (
        <PageWrapper>
            <Container>
                <IdText>ID: {characterId}</IdText>
                <CharacterCard character={character} key={character.id}/>
                <Button onClick={goToCharacters}>Go to characters</Button>
            </Container>
        </PageWrapper>
    );
};
Character.getLayout = getLayout
export default Character;

const IdText = styled.div`
  font-size: 40px;
`

const Button = styled.button`
  width: 330px;
  height: 60px;
  border-radius: 4px;
  border: none;
  background: #facaff;
  cursor: pointer;
  &:hover{
    background: #fa52d3;
    color: white;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`