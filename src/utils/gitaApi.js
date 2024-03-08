import axios from "axios";
const BASE_URL = "https://bhagavad-gita3.p.rapidapi.com/v2/";
window.axios = axios;

// Function to get all chapters (memoizes the result)
let chapters = null;
let verses = [];

// Function to fetch data from the API
const log = (e) => {
  console.log(e);
  return e;
};
async function fetchData(url) {
  window.url = url;
  const options = {
    method: "GET",
    url: url,
    params: { limit: "18" },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": process.env.REACT_APP_X_RAPIDAPI_HOST,
    },
  };
  let response;
  try {
    response = await axios.request(options);
    console.log("data fetched successfully");
  } catch (error) {
    console.error(error);
  }
  if (response.status !== 200) {
    throw new Error(`Error fetching data: ${response.status}`);
  }
  return (await response).data;
}

// Function to get a specific sloka (verse)
async function getSlok(chapter, verse) {
  let data;

  if (verses && verses[chapter - 1] && verses[chapter - 1][verse - 1]) {
    data = verses[chapter - 1][verse - 1];
  } else {
    const url = `${BASE_URL}chapters/${chapter}/verses/${verse}`;
    data = await fetchData(url);
    verses[chapter - 1][verse - 1] = data;
  }
  return data;
}
async function getSlokByChapter(chapter) {
  let data;
  console.log(
    verses &&
      verses[chapter - 1] &&
      verses[chapter - 1].length > 0
  );
  if (
    verses &&
    verses[chapter - 1] &&
    verses[chapter - 1].length > 0
  ) {
    data = verses[chapter - 1];
  } else {
    const url = `${BASE_URL}chapters/${chapter}/verses/`;
    data = await fetchData(url);
    verses[chapter - 1] = data;
  }
  return data;
}
// Function to get a random sloka
async function getRandomSlok() {
  const chaptersData = await getChapters();
  const chapter_random = Math.floor(Math.random() * chaptersData.length);

  const verse_random = Math.floor(
    Math.random() * chaptersData[chapter_random].verses_count
  );
  console.log("getting random verse:@", chapter_random, verse_random);

  return getSlok(chapter_random + 1, verse_random + 1);
}

async function getChapters() {
  if (!chapters) {
    const url = `${BASE_URL}chapters/`;
    chapters = await fetchData(url);
  }
  if (verses.length==0) {
    verses.length = chapters.length;
  }
  window.verses=verses;
  return chapters;
}

// Function to get a specific chapter
async function getChapter(chapter) {
  const chaptersData = await getChapters();
  const chapterData = chaptersData[chapter];
  console.log(chapter);
  console.log(chapterData);
  if (!chapterData) {
    throw new Error(`Chapter ${chapter} not found`);
  }
  return chapterData;
}
function getMemoMap() {
  return {
    chapters: chapters,
    verses: verses,
  };
}
export {
  getSlok,
  getRandomSlok,
  getChapters,
  getChapter,
  getSlokByChapter,
  getMemoMap,
};
