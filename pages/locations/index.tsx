import React from 'react';
import {LocationType, ResponseType} from "../../assets/api/rick-and-morty-api";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {Header} from "../../components/Header/Header";
import {dehydrate, useQuery} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/query-core";
import {Card} from "../../components/Card/Card";


const getLocations =async () => {
    return fetch('https://rickandmortyapi.com/api/location', {
        method: 'GET'
    }).then(res => res.json())
}
export const getStaticProps = async () => {
    const queryClient = new QueryClient()
    await queryClient.fetchQuery(['locations', getLocations])
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}


const Locations = () => {
    const {data: locations}
        = useQuery<ResponseType<LocationType>>(['locations'], getLocations)
    if (!locations) return null
    const locationsList = locations.results.map(el =>
        <Card key={el.id} name={el.name}/>)
    return (
        <PageWrapper>
            <Header/>
            {locationsList}
        </PageWrapper>
    );
};
export default Locations;