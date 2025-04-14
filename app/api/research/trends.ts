// Utility function to fetch trending topics and current events

export interface TrendingTopic {
  title: string;
  source: string;
  url: string;
}

export interface TrendingData {
  date: string;
  trends: TrendingTopic[];
}

export async function getTrendingTopics(): Promise<TrendingData> {
  try {
    // If you have a Google Trends API key, you could use that here
    // For now, we'll use a simple approach with fallback data
    
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    
    // Try to fetch from a news API (if you have an API key)
    const newsAPIKey = process.env.NEWS_API_KEY;
    
    if (newsAPIKey) {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=al&apiKey=${newsAPIKey}`);
      
      if (response.ok) {
        const data = await response.json();
        return {
          date: formattedDate,
          trends: data.articles.slice(0, 5).map((article: any) => ({
            title: article.title,
            source: article.source.name,
            url: article.url
          }))
        };
      }
    }
    
    // Fallback to static data
    return {
      date: formattedDate,
      trends: [
        { 
          title: "Lajmet e fundit nga Shqipëria dhe bota", 
          source: "Top Channel", 
          url: "https://top-channel.tv/" 
        },
        { 
          title: "Informacioni më i fundit për ditën e sotme", 
          source: "Gazeta Panorama", 
          url: "https://www.panorama.com.al/" 
        },
        { 
          title: "Lajmet më të fundit nga politika dhe ekonomia", 
          source: "Gazeta TEMA", 
          url: "https://www.gazetatema.net/" 
        },
      ]
    };
  } catch (error) {
    console.error("Error fetching trending topics:", error);
    return { 
      date: new Date().toISOString().split('T')[0],
      trends: [] 
    };
  }
} 