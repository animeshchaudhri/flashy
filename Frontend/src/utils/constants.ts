export interface Category {
  id: number;
  name: string;
}
export interface Category {
  id: number;
  name: string;
  
}

export interface CategoryManagementProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
  refetchCategories: () => void;
}

export const featuredFlashcards = [
  {
    image:
      "https://cdn.pixabay.com/photo/2023/10/16/07/55/animal-8318650_640.jpg",
    avatar:
      "https://cdn.pixabay.com/photo/2023/10/16/07/55/animal-8318650_640.jpg",
    title: "Jaggu's Flashcards",
    subtitle: "Chota Bheem Revision",
    time: "1h 53m",
    rating: "4.9/5",
    action: "Study",
    id: 60004,
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2016/12/11/20/44/background-1900329_640.jpg",
    avatar:
      "https://cdn.pixabay.com/photo/2016/12/11/20/44/background-1900329_640.jpg",
    title: "Binod's Quizzes",
    subtitle: "Linux Commands",
    time: "59m",
    rating: "4.3/5",
    action: "Practice",
    id: 60002,
  },
  {
    image: "https://cdn.pixabay.com/photo/2017/11/06/00/39/cat-2922329_640.jpg",
    avatar:
      "https://cdn.pixabay.com/photo/2017/11/06/00/39/cat-2922329_640.jpg",
    title: "Billo's Flashcards",
    subtitle: "Cat Breeds",
    time: "2h 15m",
    rating: "4.7/5",
    action: "Explore",
    id: 60003,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYVwesAj_hy2FbTSjKvGurf86B4RmLfhgr5Q&s",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYVwesAj_hy2FbTSjKvGurf86B4RmLfhgr5Q&s",
    title: "Jonas Flashcards",
    subtitle: "Cycle of 33 years",
    time: "3h 30m",
    rating: "4.8/5",
    action: "Discover",
    id: 60001,
  },
];
