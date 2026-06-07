export interface StoryItem {
  id: number;
  caption: string;
  /** Replace null values with: import img from '../assets/story/filename.jpg' */
  image: string | null;
  textOnly?: boolean;
}

export const storyItems: StoryItem[] = [
  { id: 1, caption: 'Met in 2016 in Math Class', image: null },
  { id: 2, caption: 'Graduated in 2019', image: null },
  { id: 3, caption: 'Had many adventures throughout the years', image: null },
  { id: 4, caption: 'flying in a doorless helicopter', image: null },
  { id: 5, caption: 'roadtrips', image: null },
  { id: 6, caption: 'skydiving', image: null },
  { id: 7, caption: 'Japan', image: null },
  { id: 8, caption: 'seeing the Northern Lights in Iceland', image: null },
  { id: 9, caption: 'Koda', image: null },
  { id: 10, caption: 'Getting Engaged', image: null },
  { id: 11, caption: 'and to many more…', image: null, textOnly: true },
];
