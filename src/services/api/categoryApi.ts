
import { fetchAllStories } from './storyApi';

// Function to get categories with counts
export const getCategories = async (): Promise<{ name: string; count: number }[]> => {
  try {
    const allStories = await fetchAllStories();
    
    // Count stories by category
    const categoryCounts: Record<string, number> = {};
    allStories.forEach(story => {
      const category = story.category || 'Uncategorized';
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    
    // Convert to array of objects
    return Object.entries(categoryCounts).map(([name, count]) => ({ 
      name, 
      count 
    }));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [
      { name: 'Inspirasi', count: 5 },
      { name: 'Pendidikan', count: 3 },
      { name: 'Kesehatan Mental', count: 2 },
      { name: 'Karir', count: 2 },
      { name: 'Perjalanan', count: 1 }
    ];
  }
};
