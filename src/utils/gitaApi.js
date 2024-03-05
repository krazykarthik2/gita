import axios from "axios";
const BASE_URL = "https://bhagavad-gita3.p.rapidapi.com/v2/";
window.axios = axios;
// Function to fetch data from the API
async function fetchData(url) {
  window.url = url;
  const options = {
    method: "GET",
    url: url,
    params: { limit: "18" },
    headers: {
      "X-RapidAPI-Key": "54b95710cbmshd4727593b0f80e8p17db62jsn6b453a43ab66",
      "X-RapidAPI-Host": "bhagavad-gita3.p.rapidapi.com",
    },
  };
  let response;
  try {
    response = await axios.request(options);
    console.log(response.data);
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
  const url = `${BASE_URL}chapters/${chapter}/verses/${verse}`;
  const data = await fetchData(url);
  return data;
}
async function getSlokByChapter(chapter) {
  const url = `${BASE_URL}chapters/${chapter}/verses/`;
  const data = await fetchData(url);
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
  const url = `${BASE_URL}chapters/${chapter_random}/verses/${verse_random}/`;
  const data = await fetchData(url);
  return data;
}

// Function to get all chapters (memoizes the result)
let chapters = null;
async function getChapters() {
  if (!chapters) {
    const url = `${BASE_URL}chapters/`;
    chapters = await fetchData(url);
  }
  return chapters;
}

// Function to get a specific chapter
async function getChapter(chapter) {
  const chaptersData = await getChapters();
  const chapterData = chaptersData[chapter]
  console.log(chapter)
  console.log(chapterData);
  if (!chapterData) {
    throw new Error(`Chapter ${chapter} not found`);
  }
  return chapterData;
}
export { getSlok, getRandomSlok, getChapters, getChapter, getSlokByChapter };
