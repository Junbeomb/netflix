import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";

const Container = styled.div`
    height:calc(100vh - 50px);
    width:100%;
    position:relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-image: url(${props=>props.bgImage});
    background-position:center center;
    background-size:cover;
    filter:blur(3px);
    opacity:0.5;
    z-index:0;
`;

const Content = styled.div`
    display:flex;
    width:100%;
    height:100%;
    position:relative;
    z-index:1;
`;

const Cover = styled.div`
    width:38%;
    height:100%;
    background-image: url(${props=>props.bgImage});
    background-position:center center;
    background-size: cover;
    border-radius:3px;
`;

const Data = styled.div`
    display:flex;
    width:70%;
    margin-left:10px;
    flex-direction: column;
    justify-content:space-between;
`;

const Title = styled.h3`
    font-size:32px;
`;

const ItemContainer = styled.div`
    margin:20px 0;
`;

const Item = styled.span``;

const Production = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: right;
    height:20px;
`;

const ProductImage = styled.div`
    width:20px;
    height:100%;
    background-image: url(${props=>props.bgImage});
    background-position:center center;
    background-size: cover;
    border-radius:3px;
    opacity:0.6;
`;

const ProductName = styled.div`
    color:white;
    font-size: 10px;
    font-weight: 200;
    opacity: 0.8;
    height:100%;
    padding-top:10px;
`;

const Divider = styled.span`
    margin:0 10px;
`;

const Overview = styled.div`
    font-size:12px;
    opacity:0.7;
    line-height:1.5;
    width:50%;
    margin-bottom: 40%;
`;

const DetailPresenter = ( {result, loading, error}) =>
    loading?(
    <>
        <Helmet>
            <title>Loading | Nomflix</title>    
        </Helmet>
        <Loader/>
    </>
    ):(
        <Container>
        <Helmet>
            <title>
                {result.original_title ? result.original_title : result.original_name}{" "} | Nomflix
            </title>    
        </Helmet>
        <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}/>
        <Content>
            <Cover bgImage={result.poster_path ?`https://image.tmdb.org/t/p/original${result.poster_path}`:require("../../noImage/logo192.png")}/>
            <Data>
                <Title>{result.original_title ? result.original_title : result.original_name}</Title>
                <ItemContainer>
                    <Item>{result.release_date ? result.release_date.substring(0,4) : result.first_air_date.substring(0,4)}</Item>
                    <Divider>*</Divider>
                    <Item>
                        {result.runtime  ? result.runtime : result.episode_run_time[0]} min
                    </Item>
                    <Divider>*</Divider>
                    <Item>
                        {result.genres && result.genres.map((genre,index) => index===result.genres.length-1 ? genre.name : `${genre.name} / ` )}
                    </Item>
                    <a href={`https://image.tmdb.org/t/p/${result.imdb_id}`}>
                        🖤 
                    </a>
                </ItemContainer>
                <Overview>{result.overview}</Overview>
                <Production>
                        <ProductImage bgImage={`https://image.tmdb.org/t/p/original/${result.production_companies[0].logo_path}`}/>
                        <ProductName>{result.production_companies[0].name}</ProductName>
                </Production>
            </Data>
        </Content>
        </Container>
      );

DetailPresenter.propTypes ={
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default DetailPresenter;