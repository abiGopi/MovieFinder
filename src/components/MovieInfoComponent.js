import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_KEY } from "../App";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: white;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;
const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;
  const [showDetails, setClearDetails] = useState(true);
  console.log("selectedMovie", selectedMovie);

  useEffect(() => {
    Axios.get(
      `https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=5efb1ad831b844d68a199c8f7f445d2d`
    ).then((response) => {
      if (showDetails) {
        setMovieInfo(response.data);
      } else {
        setMovieInfo();
      }

      console.log("setMovieInfo(response.data)", response.data);
    });
  }, [selectedMovie, movieInfo, showDetails]);
  return (
    <div>
      <Container>
        {movieInfo && (
          <>
            <CoverImage
              src={`https://image.tmdb.org/t/p/w300/${movieInfo.poster_path}`}
              alt={movieInfo?.title}
            />
            <InfoColumn>
              <MovieName>
                {movieInfo?.Type}: <span>{movieInfo?.title}</span>
              </MovieName>
              <MovieInfo>
                Original Language: <span>{movieInfo?.original_language}</span>
              </MovieInfo>
              <MovieInfo>
                Overview: <span>{movieInfo?.overview}</span>
              </MovieInfo>
              <MovieInfo>
                Popularity: <span>{movieInfo?.Popularity}</span>
              </MovieInfo>
              <MovieInfo>
                Runtime: <span>{movieInfo?.runtime}</span>
              </MovieInfo>
              <MovieInfo>
                Status: <span>{movieInfo?.status}</span>
              </MovieInfo>
              <MovieInfo>
                Revenue: <span>{movieInfo?.revenue}</span>
              </MovieInfo>
            </InfoColumn>
            <Close onClick={() => setClearDetails(!showDetails)}>X</Close>
          </>
        )}
      </Container>
    </div>
  );
};
export default MovieInfoComponent;
