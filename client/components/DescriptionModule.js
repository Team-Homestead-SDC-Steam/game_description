import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { DescCol, ImgContainer, TextContainer, DescImg, Desc, DescStats, ReleaseDate } from '../styles/DescriptionModule.styles';
import { Label } from '../styles/UIUXUtils';
import { getHumanReadableFromISO, fetchGameInfo, fetchGamePhoto, fetchAllGameReviews, fetchRecentGameReviews } from '../utils';
import DevOrPubInfo from './DevOrPubInfo';
import ReviewsInfo from './ReviewsInfo';

/** STYLED COMPONENTS THEME */
const theme = {
  rootId: 'game-description'
};

const DescriptionModule = ({ gameid }) => {
  /**
   * STATIC VARS
   */
  const defaultGameInfo = {
    release_date: '2000-01-01T00:00:00Z',
    description: 'No game description available',
    developers: [],
    publishers: []
  };
  const defaultAllReviews = {
    summary: 'Mixed',
    percent: 0,
    positive: 0,
    negative: 0,
    total: 0
  };
  const defaultRecentReviews = {
    summary: 'Mixed',
    percent: 0,
    total: 0
  };
  /**
   * INITIAL STATE
   */
  const [gameThumbnail, setGameThumbnail] = useState('');
  const [gameInfo, setGameInfo] = useState(defaultGameInfo);
  const [recentReviews, setRecentReviews] = useState(defaultRecentReviews);
  const [allReviews, setAllReviews] = useState(defaultAllReviews);

  // On component mount, fetch relevant game information for component for a particular gameid (which is passed as props on mount)
  useEffect(() => {

    let thumbnails=[
      'https://steamcdn-a.akamaihd.net/steam/apps/289070/header.jpg',
      'https://steamcdn-a.akamaihd.net/steam/apps/395200/header.jpg',
      'https://steamcdn-a.akamaihd.net/steam/apps/400360/header.jpg',
      'https://steamcdn-a.akamaihd.net/steam/apps/390670/header.jpg',
      'https://steamcdn-a.akamaihd.net/steam/apps/378644/header.jpg',
      'https://steamcdn-a.akamaihd.net/steam/apps/1017900/header.jpg',
      'https://steamcdn-a.akamaihd.net/steam/apps/773840/header.jpg',
      'https://steamcdn-a.akamaihd.net/steam/apps/1337010/header.jpg',
      'https://steamcdn-a.akamaihd.net/steam/apps/795990/header.jpg',
      'https://steamcdn-a.akamaihd.net/steam/apps/811070/header.jpg'
    ]

    let lastnumber = Number(gameid.toString().split('').pop())
    // fetchGamePhoto(gameid)
    //   .then(res => {
    //     if (res.error) {
    //       throw new Error(res.error);
    //     }
    //     console.log(res.url);
    //     setGameThumbnail(res.url);
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     // On fetchGamePhoto promise rejection, set default game thumbnail
    //     setGameThumbnail('https://steamcdn-a.akamaihd.net/steam/apps/289070/header.jpg');
    //   });
    setGameThumbnail(thumbnails[lastnumber]);

    fetchGameInfo(gameid)
      .then(res => {
        if (res.error) {
          throw new Error(res.error);
        }
        setGameInfo(res);
      })
      .catch(e => {
        // On fetchGameInfo promise rejection, keep initial game info state
        console.error(e);
      });

    // fetchAllGameReviews(gameid)
    //   .then(res => {
    //     if (res.error) {
    //       throw new Error(res.error);
    //     }
    //     setAllReviews(res);
    //   })
    //   .catch(e => {
    //     // On fetchAllGameReviews promise rejection, keep initial reviews state
    //     console.error(e);
    //   });
    // setAllReviews((Math.floor(Math.random()*99999)+40000).toString());

    // fetchRecentGameReviews(gameid)
    //   .then(res => {
    //     if (res.error) {

    //       throw new Error(res.error);
    //     }
    //     setRecentReviews(res);
    //   })
    //   .catch(e => {

    //     // On fetchRecentGameReviews promise rejection, keep initial reviews state
    //     console.error(e);
    //   });
    // setRecentReviews(Math.floor(Math.random()*9999)+300);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <DescCol>
        <ImgContainer>
          <DescImg src={gameThumbnail} alt="Game Thumbnail" />
        </ImgContainer>
        <TextContainer>
          <Desc>{gameInfo.description}</Desc>
          <DescStats>
            <ReviewsInfo
              reviewType='recent'
              reviews={recentReviews}
            />
            <ReviewsInfo
              reviewType='all'
              reviews={allReviews}
            />
            <ReleaseDate>
              <Label>Release Date:</Label>
              <span>{getHumanReadableFromISO(gameInfo.release_date)}</span>
            </ReleaseDate>
            <DevOrPubInfo
              label='Developer'
              companyArr={gameInfo.developers}
            />
            <DevOrPubInfo
              label='Publisher'
              companyArr={gameInfo.publishers}
            />
          </DescStats>
        </TextContainer>
      </DescCol>
    </ThemeProvider>
  );
};

DescriptionModule.propTypes = {
  gameid: PropTypes.number.isRequired
};

export default DescriptionModule;
