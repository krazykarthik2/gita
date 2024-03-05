import axios from "axios";
const BASE_URL = "https://bhagavadgitaapi.in/";
// Function to fetch data from the API
async function fetchData(url) {
  const response = await axios.get(url, {
    headers: {
      apiKey: "dcc706f93114771b5",
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      withCredentials: "false",
      "Access-Control-Allow-Origin": "*",
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status}`);
  }
  return await response.json();
}

// Function to get a specific sloka (verse)
async function getSlok(chapter, verse) {
  const url = `${BASE_URL}slok/${chapter}/${verse}`;
  const data = await fetchData(url);
  return data;
}

// Function to get a random sloka
async function getRandomSlok() {
  const url = `${BASE_URL}slok`;
  const data = await fetchData(url);
  return data;
}

// Function to get all chapters (memoizes the result)
let chapters = null;
async function getChapters() {
  if (!chapters) {
    const url = `${BASE_URL}chapters`;
    chapters = await fetchData(url);
  }
  console.log("these are the chapters");
  console.log(chapters); // Log the chapters
  return chapters;
}

// Function to get a specific chapter
async function getChapter(chapter) {
  const chaptersData = await getChapters();
  const chapterData = chaptersData.find((c) => c.chapter_number === chapter);
  if (!chapterData) {
    throw new Error(`Chapter ${chapter} not found`);
  }
  return chapterData;
}
export { getSlok, getRandomSlok, getChapters, getChapter };
// Example usage
getSlok(2, 24) // Get specific sloka
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

getRandomSlok() // Get random sloka
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

getChapter(3) // Get specific chapter
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
