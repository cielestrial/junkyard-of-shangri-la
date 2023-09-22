export type optionsArrayT = optionT[];
type optionT = (typeof _optionsList)[number];

const _optionsList = [
  "Travel",
  "Mystery",
  "Historical Fiction",
  "Sequential Art",
  "Classics",
  "Philosophy",
  "Romance",
  "Womens Fiction",
  "Fiction",
  "Childrens",
  "Religion",
  "Nonfiction",
  "Music",
  "Default",
  "Science Fiction",
  "Sports and Games",
  "Add a comment",
  "Fantasy",
  "New Adult",
  "Young Adult",
  "Science",
  "Poetry",
  "Paranormal",
  "Art",
  "Psychology",
  "Autobiography",
  "Parenting",
  "Adult Fiction",
  "Humor",
  "Horror",
  "History",
  "Food and Drink",
  "Christian Fiction",
  "Business",
  "Biography",
  "Thriller",
  "Contemporary",
  "Spirituality",
  "Academic",
  "Self Help",
  "Historical",
  "Christian",
  "Suspense",
  "Short Stories",
  "Novels",
  "Health",
  "Politics",
  "Cultural",
  "Erotica",
  "Crime",
] as const;

function getOptionsList() {
  let optionsList: optionsArrayT = [];
  _optionsList.forEach((option) => optionsList.push(option));
  return optionsList.sort(compare);
}

function compare(a: optionT, b: optionT) {
  return a.localeCompare(b);
}

export const optionsList = getOptionsList();

export default { optionsList };