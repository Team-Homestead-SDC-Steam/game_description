import { useState, useEffect } from 'react';

/**
 * Given an ISO date string (2020-06-01T00:00:00Z), format into
 * human readable date (1 Jun, 2020)
 * @param {String} ISOString
 * @returns {String}
 */
export const getHumanReadableFromISO = (ISOString) => {
  let months = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
  };

  return `${parseInt(ISOString.slice(8, 10))} ${months[ISOString.slice(5, 7)]}, ${ISOString.slice(0, 4)}`;
};

/**
 * Gets the id portion of window.location.pathname. Returns default (1) if invalid.
 * @returns {Number} int between 1-100, inclusive
 */
export const getPathId = () => {
  let pathArr = window.location.pathname.split('/');
  let pathId = 1;
  if (pathArr.length) {
   
    pathId = parseInt(pathArr.slice(-1)[0]);
    // if (Number.isNaN(pathId) || pathId > 100 || pathId < 1) {
    //   pathId = 1;
    // }
  }

  return pathId;
};

/**
   * Custom window size hook: https://usehooks.com/useWindowSize/
   * For ensuring components have correct positioning when resizing the window
   * @returns {Object} windowSize: window size with width and height properties
   *          {Integer} windowSize.min
   *          {Integer} windowSize.max
   */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const handleResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    // Cleanup effect before component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

/**
   * Get description-specific game photo from photos service, /api/media/:gameid
   * @param {Integer} gameid: int between 1-100, inclusive
   * @returns {Promise->Object}: promise which resolves to object
   */
export const fetchGamePhoto = (gameid) => {
  // if (!gameid || gameid > 100 || gameid < 1) {
  //   throw new Error('Invalid game id');
  // }

  return fetch(`/api/media/${gameid}`)
    .then(response => response.json())
    .then(result => {
      // Will's module currently sends string responses instead of JSON. This might change later,
      // so the if/else won't break with that future change.
      if (typeof result === 'string') {
        return JSON.parse(result);
      } else {
        return result;
      }
    })
    .then(resObj => {
      let validPhotoType = resObj.filter(obj => obj.mediaType === 'carouselPhoto');
      return validPhotoType.length ? validPhotoType[0] : {};
    })
    .catch(e => {
      console.error(e);
      return {};
    })
};

/**
 * Get release date, description, dev / pub company game info from /api/description/:gameid
 * @param {Integer} gameid: int between 1-100, inclusive
 * @returns {Promise->Object|Error}
 */
export const fetchGameInfo = (gameid) => {
  // if (!gameid || gameid > 100 || gameid < 1) {
  //   throw new Error('Invalid game id');
  // }

  return fetch(`/api/description/${gameid}`)
    .then(response => response.json());
};

/**
 * Get total, positive, and negative review count, plus semantic rating & % positive, from /api/reviews/:gameid
 * @param {Integer} gameid: int between 1-100, inclusive
 * @returns {Promise->Object}
 */
export const fetchAllGameReviews = (gameid) => {
  if (!gameid || gameid > 100 || gameid < 1) {
    throw new Error('Invalid game id');
  }

  return fetch(`/api/reviewcount/${gameid}`)
    .then(response => response.json());
};

/**
 * Get recent (past 30 days) total review count, plus semantic rating & % positive, from /api/reviews/recent/:gameid
 * @param {Integer} gameid: int between 1-100, inclusive
 * @returns {Promise->Object}
 */
export const fetchRecentGameReviews = (gameid) => {
  if (!gameid || gameid > 100 || gameid < 1) {
    throw new Error('Invalid game id');
  }

  return fetch(`/api/reviewcount/recent/${gameid}`)
    .then(response => response.json());
};
