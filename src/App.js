import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import MovieComponent from "./components/MovieComponent";
import { movieData } from "./reducers/movieAction";
import movieIcon from "./movie-icon.svg";
import searchIcon from "./search-icon.svg";
import homeBanner from "./home-banner.png";
import { GoMarkGithub } from "react-icons/go";
const myLink = "https://github.com/abiGopi/MovieFinder/tree/master";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 50px;
  border-radius: 20px;
  margin-left: 10px;
  margin-right: 40px;
  width: 60;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const GitIcon = styled.div`
  width: 50px;
  height: 32px;
  padding-left: 450px;
`;

const MovieImage = styled.img`
  height: 100%;
  display: flex;
  max-width: @max-page-width;
  margin: 0 auto;
  justify-content: space-between;
  width: 400px;
  color: white;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
  color: white;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;
const BodyContainer = styled.div`
  position: relative;
  color: white;
  border-radius: 16px;
`;
const BackDropImage = styled.img`
  padding: 40px;
  display: flex;
  height: 370px;
  postion: relative;
`;
const BodyText = styled.div`
  position: absolute;
  top: 70px;
  left: 60px;
  font-weight: bold;
  font-size: 30px;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);

  const [timeoutId, updateTimeoutId] = useState();
  const dispatch = useDispatch();

  const movieDataObject = useSelector((state) => state.movies);
  console.log("movieDataObject", movieDataObject);

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=5efb1ad831b844d68a199c8f7f445d2d&query=${searchString}`
    );
    updateMovieList(response.data.results);
    dispatch(
      movieData({
        details: response.data.results,
      })
    );
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage
            src={
              "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
            }
            alt={"logo"}
          />
        </AppName>
        <GitIcon>
          <a href={myLink}>
        
            <GoMarkGithub fill="white" />
          </a>
        </GitIcon>
        <SearchBox>
          <SearchIcon src={searchIcon} />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      <BodyContainer>
        <BackDropImage src={homeBanner} alt={"Home banner"} />
        <BodyText>
          <div>Welcome.</div>
          Millions of movies, TV shows and people to discover. Explore now.
        </BodyText>
      </BodyContainer>
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent key={index} movie={movie} />
          ))
        ) : (
          <Placeholder src={movieIcon} alt={"Please Enter the Movie title"} />
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
