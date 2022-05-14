import styled from "styled-components";
import React, { useState } from "react";
import MovieInfoComponent from "./MovieInfoComponent";
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
  height: 362px;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 250px;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  color: white;
`;
const DetailsButton = styled.div`
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  justify-content: flex-end;
`;

const MovieComponent = (props) => {
  const [selectedMovie, onMovieSelect] = useState();
  const { id, title, release_date, popularity, poster_path } = props.movie;
  const viewMovieInfo = (e) => {
    onMovieSelect(e.target.value);
  };

  return (
    <Container>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} />}
      <MovieContainer>
        <CoverImage
          src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
          alt={title}
        />

        <MovieName>{title}</MovieName>
        <InfoColumn>
          <MovieInfo>Year : {release_date}</MovieInfo>
          <MovieInfo>Popularity : {popularity}</MovieInfo>
        </InfoColumn>
        <DetailsButton>
          <button onClick={viewMovieInfo} value={id}>
            Details
          </button>
        </DetailsButton>
      </MovieContainer>
    </Container>
  );
};
export default MovieComponent;
