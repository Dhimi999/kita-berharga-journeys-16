import { createClient } from '@supabase/supabase-js';
import { Database, Comment, Story } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to transform the story data from Supabase format to our Story type
export const transformStoryData = (data: any): Story => {
  let comments: Comment[] = [];
  
  // Handle comments which might be in different formats
  if (data.comments) {
    try {
      if (typeof data.comments === 'string') {
        // If comments is a JSON string, parse it
        const parsedComments = JSON.parse(data.comments);
        if (Array.isArray(parsedComments)) {
          comments = parsedComments.map(comment => {
            if (typeof comment === 'string') {
              return { 
                name: 'Anonymous', 
                email: 'anonymous@example.com', 
                content: comment, 
                date: new Date().toISOString() 
              };
            } else {
              // Convert legacy format to new format
              return {
                name: comment.author || comment.name || 'Anonymous',
                email: comment.email || 'anonymous@example.com',
                content: comment.text || comment.content || '',
                date: comment.date || new Date().toISOString()
              };
            }
          });
        }
      } else if (Array.isArray(data.comments)) {
        // If comments is already an array
        comments = data.comments.map(comment => {
          if (typeof comment === 'string') {
            return { 
              name: 'Anonymous', 
              email: 'anonymous@example.com', 
              content: comment, 
              date: new Date().toISOString() 
            };
          } else {
            // Convert legacy format to new format
            return {
              name: comment.author || comment.name || 'Anonymous',
              email: comment.email || 'anonymous@example.com',
              content: comment.text || comment.content || '',
              date: comment.date || new Date().toISOString()
            };
          }
        });
      }
    } catch (error) {
      console.error("Error parsing comments:", error);
      // Set comments to empty array if parsing fails
      comments = [];
    }
  }

  // Transform the story data
  return {
    id: data.id || Math.random().toString(36).substring(2),
    title: data.title || 'Untitled Story',
    content: data.content || '',
    author: data.author || 'Anonymous',
    date: data.date || new Date().toISOString(),
    category: data.category || 'Uncategorized',
    excerpt: data.excerpt || data.content?.substring(0, 150) + '...' || '',
    header_image: data.header_image || null,
    likes: data.likes || 0,
    comments: comments,
    tags: data.tags || []
  };
};

// Fetch all stories from the database
export const fetchAllStories = async (): Promise<Story[]> => {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('date', { ascending: false });  // Sort by date, newest first

    if (error) {
      console.error("Error fetching stories:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      // If no stories in DB, return dummy data
      return getDummyStories();
    }

    // Transform the Supabase data to our Story type
    return data.map(transformStoryData);
  } catch (error) {
    console.error("Failed to fetch stories:", error);
    // Return dummy data in case of error
    return getDummyStories();
  }
};

// Fetch a single story by ID
export const fetchStoryById = async (id: string): Promise<Story | null> => {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Error fetching story:", error);
      throw error;
    }

    if (!data) {
      // If story not found in DB, return a dummy story
      const dummyStory = getDummyStories().find(s => s.id === id);
      return dummyStory || null;
    }

    // Transform the Supabase data to our Story type
    return transformStoryData(data);
  } catch (error) {
    console.error(`Failed to fetch story with ID ${id}:`, error);
    
    // Return a dummy story in case of error
    const dummyStory = getDummyStories().find(s => s.id === id);
    return dummyStory || null;
  }
};

// Get featured stories (could be based on likes, category, etc.)
export const getFeaturedStories = async (limit: number = 3): Promise<Story[]> => {
  try {
    const allStories = await fetchAllStories();
    // Sort by likes (or any other criteria you want to use for featuring)
    return allStories
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, limit);
  } catch (error) {
    console.error("Failed to fetch featured stories:", error);
    return getDummyStories().slice(0, limit);
  }
};

// Alias for backward compatibility
export const fetchFeaturedStories = getFeaturedStories;

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

// Like a story
export const likeStory = async (id: string): Promise<Story | null> => {
  try {
    // First, get current likes
    const { data: storyData, error: fetchError } = await supabase
      .from('stories')
      .select('*')
      .eq('id', id)
      .single();
    
    if (fetchError) {
      console.error("Error fetching story likes:", fetchError);
      throw fetchError;
    }
    
    const currentLikes = storyData?.likes || 0;
    const newLikes = currentLikes + 1;
    
    // Update likes
    const { error: updateError } = await supabase
      .from('stories')
      .update({ likes: newLikes })
      .eq('id', id);
    
    if (updateError) {
      console.error("Error updating story likes:", updateError);
      throw updateError;
    }
    
    // Return updated story
    return fetchStoryById(id);
  } catch (error) {
    console.error(`Failed to like story with ID ${id}:`, error);
    // For demo purposes, just increment and return dummy data
    const dummyStory = getDummyStories().find(s => s.id === id);
    if (dummyStory) {
      dummyStory.likes += 1;
      return dummyStory;
    }
    return null;
  }
};

// Add a comment to a story
export const addCommentToStory = async (
  storyId: string, 
  comment: { name: string; email: string; content: string; date?: string }
): Promise<Story | null> => {
  try {
    // First, get current story
    const story = await fetchStoryById(storyId);
    if (!story) {
      throw new Error(`Story with ID ${storyId} not found`);
    }
    
    // Add date if not provided
    const newComment: Comment = {
      ...comment,
      date: comment.date || new Date().toISOString()
    };
    
    // Add new comment to the story
    const updatedComments = [...story.comments, newComment];
    
    // Update comments in the database
    const { error: updateError } = await supabase
      .from('stories')
      .update({ comments: updatedComments })
      .eq('id', storyId);
    
    if (updateError) {
      console.error("Error updating story comments:", updateError);
      throw updateError;
    }
    
    // Return updated story
    return fetchStoryById(storyId);
  } catch (error) {
    console.error(`Failed to add comment to story with ID ${storyId}:`, error);
    
    // For demo purposes, return a modified dummy story
    const dummyStory = getDummyStories().find(s => s.id === storyId);
    if (dummyStory) {
      dummyStory.comments.push(comment as Comment);
      return dummyStory;
    }
    return null;
  }
};

// Legacy method for backward compatibility
export const addComment = async (
  storyId: string, 
  comment: { text: string; author: string; }
): Promise<Comment[]> => {
  try {
    // Convert legacy format to new format
    const result = await addCommentToStory(storyId, {
      name: comment.author,
      email: 'anonymous@example.com',
      content: comment.text,
      date: new Date().toISOString()
    });
    
    return result?.comments || [];
  } catch (error) {
    console.error(`Failed to add comment to story with ID ${storyId}:`, error);
    // Return empty array in case of error
    return [];
  }
};

// Generate dummy stories for demo purposes
const getDummyStories = (): Story[] => {
  // Create dates that are sorted newest to oldest
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  const fourDaysAgo = new Date(today);
  fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
  
  return [
    {
      id: '1',
      title: 'Perjalanan Menemukan Makna Hidup Setelah Kehilangan',
      content: `
        <p>Dua tahun lalu, hidupku berubah selamanya ketika aku kehilangan ayahku karena sakit. Sebagai anak tunggal yang sangat dekat dengannya, aku merasa seperti sebagian diriku ikut hilang. Hari-hari berlalu dengan kesedihan yang mendalam, dan aku kesulitan menemukan alasan untuk terus melangkah.</p>
        
        <p>Suatu hari, saat membersihkan barang-barang ayahku, aku menemukan sebuah jurnal tua. Di dalamnya, ayahku menulis tentang mimpi-mimpinya, termasuk keinginannya untuk mendirikan perpustakaan kecil di desa kelahirannya yang tidak memiliki akses pendidikan yang memadai.</p>
        
        <p>Menemukan jurnal itu seperti menemukan harta karun. Aku mulai memahami bahwa meski ayahku telah tiada, aku bisa meneruskan mimpinya. Dengan tabunganku dan bantuan dari teman-teman, aku mulai mengumpulkan buku dan membangun perpustakaan kecil di desa itu.</p>
        
        <p>Melihat wajah anak-anak berseri-seri saat membaca buku untuk pertama kalinya memberikanku sukacita yang tidak pernah kurasakan sebelumnya. Aku menemukan makna baru dalam hidup—bukan hanya untuk diriku sendiri, tetapi juga untuk meneruskan warisan ayahku.</p>
        
        <p>Perjalanan ini mengajarkanku bahwa kehilangan, meskipun menyakitkan, bisa menjadi awal dari sesuatu yang bermakna. Kini, perpustakaan itu telah berkembang dan melayani puluhan anak setiap harinya. Saat mereka bercita-cita menjadi dokter, insinyur, atau penulis suatu hari nanti, aku tahu ayahku tersenyum di suatu tempat.</p>
        
        <p>Jika kamu sedang berjuang menemukan makna setelah kehilangan, ingatlah bahwa kesedihan dan cinta bisa berjalan beriringan. Dan terkadang, dari kesedihan terdalam, kita bisa menemukan tujuan hidup yang baru.</p>
      `,
      author: 'Dina Pratiwi',
      date: today.toISOString(),
      category: 'Inspirasi',
      excerpt: 'Perjalanan menemukan makna hidup baru setelah kehilangan orang tercinta dan bagaimana mengubah kesedihan menjadi sesuatu yang bermakna...',
      header_image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493',
      likes: 124,
      comments: [
        {
          name: 'Maya',
          email: 'maya@example.com',
          content: 'Kisah yang sangat menginspirasi. Terima kasih telah berbagi!',
          date: new Date().toISOString()
        },
        {
          name: 'Budi',
          email: 'budi@example.com',
          content: 'Saya juga pernah kehilangan orang tua dan kisah ini sangat menyentuh hati saya.',
          date: new Date().toISOString()
        }
      ],
      tags: ['Kehilangan', 'Inspirasi', 'Pendidikan']
    },
    {
      id: '2',
      title: 'Perjuangan Melawan Kecemasan Sosial',
      content: `
        <p>Sejak kecil, aku selalu merasa takut saat berada di keramaian. Jantungku berdebar kencang, tanganku berkeringat, dan pikiranku dipenuhi dengan berbagai skenario terburuk: "Apa yang akan mereka pikirkan tentangku?" "Bagaimana jika aku mengatakan sesuatu yang bodoh?" "Mereka pasti menganggapku aneh."</p>
        
        <p>Bertahun-tahun, aku hidup dengan membatasi diriku. Menolak undangan, menghindari pertemuan, dan selalu mencari alasan untuk tetap di zona nyamanku. Aku merasa seperti terpenjara dalam pikiranku sendiri, melihat orang lain menjalani hidup mereka sementara aku terjebak.</p>
        
        <p>Titik balikku datang ketika aku kehilangan kesempatan kerja impianku karena tidak mampu menghadapi wawancara tatap muka. Saat itu, aku tahu aku harus melakukan sesuatu. Dengan dukungan keluarga, aku mencari bantuan profesional dan didiagnosis dengan kecemasan sosial.</p>
        
        <p>Perjalanan penyembuhanku tidak mudah. Terapi kognitif perilaku membantu aku mengenali dan mengubah pola pikir negatifku. Aku mulai dengan langkah-langkah kecil: berbicara dengan satu orang asing setiap hari, kemudian dua, lalu menghadiri pertemuan kecil, dan seterusnya.</p>
        
        <p>Setiap langkah, setiap pertemuan, setiap percakapan adalah kemenangan kecil. Ada hari-hari di mana aku mundur, tetapi aku belajar untuk tidak terlalu keras pada diriku sendiri. Perlahan tapi pasti, duniaku mulai membesar.</p>
        
        <p>Kini, dua tahun kemudian, aku bekerja di perusahaan impianku, memiliki lingkaran teman yang mendukung, dan bahkan berani berbicara di depan umum. Kecemasan sosialku tidak sepenuhnya hilang—kadang masih muncul—tetapi aku telah belajar mengelolanya, bukan dikalahkan olehnya.</p>
        
        <p>Jika kamu juga berjuang dengan kecemasan sosial, ketahuilah bahwa kamu tidak sendiri. Ada jalan keluar, ada harapan, dan ada dunia luas yang menunggumu di luar sana. Mulailah dengan langkah kecil, berbicara dengan orang yang kamu percayai, dan jangan ragu untuk mencari bantuan profesional.</p>
      `,
      author: 'Arya Wijaya',
      date: yesterday.toISOString(),
      category: 'Kesehatan Mental',
      excerpt: 'Kisah nyata tentang perjuangan melawan kecemasan sosial, dari terpenjara dalam ketakutan hingga menemukan kebebasan dan kesuksesan...',
      header_image: 'https://images.unsplash.com/photo-1474447976065-67d23accb1e3',
      likes: 89,
      comments: [
        {
          name: 'Rina',
          email: 'rina@example.com',
          content: 'Terima kasih sudah berbagi pengalaman ini. Saya juga sedang berjuang dengan kecemasan sosial.',
          date: new Date().toISOString()
        }
      ],
      tags: ['Kesehatan Mental', 'Kecemasan', 'Motivasi']
    },
    {
      id: '3',
      title: 'Belajar Memaafkan: Perjalanan Menuju Kebebasan',
      content: `
        <p>Aku tumbuh dalam keluarga yang penuh dengan konflik dan luka. Ayahku adalah seorang yang temperamental, dan kekerasan verbal sering terjadi di rumah kami. Sebagai anak tertua, aku menanggung beban untuk melindungi adik-adikku, sering kali menjadi sasaran kemarahan ayahku.</p>
        
        <p>Saat beranjak dewasa, aku membawa kemarahan dan kepahitan itu. Aku berjanji pada diriku sendiri untuk tidak pernah memaafkannya. Aku pindah ke kota lain, memutuskan hubungan, dan mencoba membangun hidupku sendiri. Tetapi meski dengan jarak fisik, secara emosional aku masih terikat dengan masa laluku.</p>
        
        <p>Kepahitan itu mempengaruhi hubunganku dengan orang lain. Aku kesulitan percaya, cepat marah, dan selalu ketakutan bahwa orang-orang yang aku cintai akan menyakitiku. Aku menyadari bahwa dengan membawa kebencian ini, aku masih membiarkan masa lalu mengontrol hidupku.</p>
        
        <p>Perubahan mulai terjadi ketika aku mengikuti sebuah lokakarya tentang pemaafan. Di sana, aku belajar bahwa memaafkan bukanlah tentang melupakan atau membenarkan perbuatan seseorang, tetapi tentang membebaskan diriku sendiri dari beban masa lalu.</p>
        
        <p>Proses pemaafanku dimulai dengan menerima rasa sakit dan mengakui dampaknya terhadap hidupku. Aku menuliskan semua kenangan dan perasaanku, melepaskan mereka satu per satu. Aku juga mencari bantuan profesional untuk memahami dinamika keluargaku dan peran yang kami masing-masing mainkan.</p>
        
        <p>Perlahan, aku mulai melihat ayahku bukan hanya sebagai orang yang menyakitiku, tetapi sebagai manusia yang juga memiliki cerita dan luka sendiri. Aku belajar bahwa dia juga tumbuh dalam lingkungan yang penuh kekerasan dan tidak pernah belajar cara lain untuk mengekspresikan emosinya.</p>
        
        <p>Memaafkan adalah proses, bukan peristiwa sekali jadi. Ada hari-hari di mana luka lama kembali terbuka, dan aku harus kembali memilih untuk memaafkan. Tetapi setiap kali aku melakukannya, beban itu semakin ringan.</p>
        
        <p>Hari ini, aku telah memulai dialog terbatas dengan ayahku. Hubungan kami masih jauh dari sempurna, tetapi ada pemahaman dan penghormatan yang baru. Yang lebih penting, aku telah menemukan kedamaian dalam diriku sendiri.</p>
        
        <p>Jika kamu juga sedang berjuang dengan masa lalu yang menyakitkan, ketahuilah bahwa memaafkan adalah hadiah terbesar yang bisa kamu berikan untuk dirimu sendiri. Itu adalah kunci pembuka pintu penjara yang telah lama kamu bangun sendiri.</p>
      `,
      author: 'Lina Susanti',
      date: twoDaysAgo.toISOString(),
      category: 'Inspirasi',
      excerpt: 'Perjalanan pribadi dalam belajar memaafkan orang yang telah menyakiti, dan menemukan kebebasan dari belenggu kebencian dan kepahitan...',
      header_image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88',
      likes: 153,
      comments: [
        {
          name: 'Dian',
          email: 'dian@example.com',
          content: 'Inspiratif sekali. Memaafkan memang sangat sulit tapi sangat membebaskan.',
          date: new Date().toISOString()
        },
        {
          name: 'Hendra',
          email: 'hendra@example.com',
          content: 'Saya menangis membaca ini. Terima kasih telah mengingatkan saya tentang kekuatan memaafkan.',
          date: new Date().toISOString()
        },
        {
          name: 'Anita',
          email: 'anita@example.com',
          content: 'Apakah Anda pernah mencoba terapi khusus? Saya sedang dalam perjalanan yang sama.',
          date: new Date().toISOString()
        }
      ],
      tags: ['Memaafkan', 'Penyembuhan', 'Hubungan']
    },
    {
      id: '4',
      title: 'Merajut Mimpi di Tengah Keterbatasan',
      content: `
        <p>Aku lahir di sebuah desa kecil di Flores Timur, tempat di mana listrik adalah kemewahan dan akses pendidikan sangatlah terbatas. Kami harus berjalan kaki selama dua jam untuk mencapai sekolah terdekat, melewati bukit dan sungai. Tetapi orangtuaku selalu menekankan pentingnya pendidikan, bahkan ketika mereka sendiri tidak bisa membaca dan menulis.</p>
        
        <p>Setiap malam, dengan penerangan lampu minyak, aku belajar dengan tekun. Buku-buku bekas yang kudapatkan dari bantuan LSM menjadi harta berhargaku. Aku bermimpi suatu hari bisa melanjutkan pendidikan ke universitas di kota besar, meski banyak orang di desaku menganggap itu terlalu muluk untuk anak petani seperti aku.</p>
        
        <p>Keterbatasan ekonomi membuat mimpiku terasa semakin jauh. Ayahku hanyalah petani kecil, dan hasil panennya hanya cukup untuk makan sehari-hari. Namun, aku tidak menyerah. Setelah sekolah, aku membantu tetangga mengerjakan pekerjaan rumah tangga untuk mendapatkan uang tambahan yang kusisihkan untuk tabungan pendidikan.</p>
        
        <p>Kerja kerasku membuahkan hasil. Aku lulus SMA dengan nilai tertinggi dan mendapatkan beasiswa penuh untuk belajar Teknik Sipil di universitas terkemuka di Jawa. Hari keberangkatanku adalah hari pertama aku naik pesawat, meninggalkan desaku dengan harapan dan ketakutan yang bercampur aduk.</p>
        
        <p>Kehidupan di kota besar tidak mudah. Budaya yang berbeda, bahasa yang asing, dan gaya hidup yang jauh dari yang kukenal sebelumnya. Ada malam-malam di mana aku menangis karena rindu rumah dan merasa tidak mampu mengikuti pelajaran. Tetapi setiap kali aku ingin menyerah, aku teringat pengorbanan orangtuaku dan mimpi dari desa kecilku.</p>
        
        <p>Seiring waktu, aku beradaptasi. Aku bergabung dengan komunitas mahasiswa dari daerah timur, menemukan mentor yang membimbingku, dan perlahan mulai berprestasi di kampus. Selama liburan, aku magang di perusahaan konstruksi, mendapatkan pengalaman berharga dan jaringan profesional.</p>
        
        <p>Hari ini, sepuluh tahun setelah meninggalkan desaku, aku memimpin proyek pembangunan infrastruktur di Indonesia Timur. Aku telah kembali untuk membangun jembatan dan jalan yang menghubungkan desa-desa terpencil, termasuk desaku sendiri. Anak-anak sekarang tidak perlu berjalan dua jam untuk sekolah, dan listrik telah masuk ke rumah-rumah mereka.</p>
        
        <p>Perjalananku menunjukkan bahwa mimpi tidak mengenal keterbatasan. Dengan kerja keras, determinasi, dan dukungan dari orang-orang yang percaya padamu, tidak ada yang tidak mungkin. Jika aku, anak petani dari desa terpencil bisa mencapainya, kamu juga pasti bisa.</p>
      `,
      author: 'Thomas Ndapa',
      date: threeDaysAgo.toISOString(),
      category: 'Pendidikan',
      excerpt: 'Kisah perjuangan anak desa dari Flores Timur yang berhasil mengatasi keterbatasan ekonomi dan geografis untuk meraih pendidikan tinggi...',
      header_image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
      likes: 215,
      comments: [
        {
          name: 'Maria',
          email: 'maria@example.com',
          content: 'Luar biasa inspiratif! Saya dari NTT juga dan kisah Anda memberikan harapan bagi banyak anak muda di sana.',
          date: new Date().toISOString()
        },
        {
          name: 'Rudi',
          email: 'rudi@example.com',
          content: 'Semoga proyek infrastruktur yang Anda pimpin bisa menjangkau lebih banyak desa terpencil.',
          date: new Date().toISOString()
        }
      ],
      tags: ['Pendidikan', 'Perjuangan', 'Pembangunan']
    },
    {
      id: '5',
      title: 'Menemukan Panggilan Hidup Melalui Krisis Karir',
      content: `
        <p>Selama tujuh tahun, aku bekerja di salah satu perusahaan konsultan manajemen terbesar di Jakarta. Di atas kertas, aku memiliki segalanya—gaji tinggi, posisi prestisius, dan jenjang karir yang jelas. Tetapi setiap pagi, aku bangun dengan perasaan hampa dan bertanya-tanya apakah ini benar-benar yang kuinginkan dalam hidup.</p>
        
        <p>Pekerjaanku mengharuskan aku bekerja lebih dari 80 jam per minggu, sering kali melewatkan acara keluarga penting dan hampir tidak memiliki kehidupan di luar kantor. Aku selalu mengatakan pada diriku sendiri bahwa inilah harga yang harus dibayar untuk kesuksesan.</p>
        
        <p>Titik balikku datang ketika aku jatuh sakit akibat kelelahan ekstrem dan harus dirawat di rumah sakit selama seminggu. Diagnosa dokter mengejutkan: tubuhku mengalami burnout parah dan jika aku tidak mengubah gaya hidupku, kesehatan jangka panjangku akan berisiko serius.</p>
        
        <p>Selama masa pemulihanku, aku mulai merenung tentang apa yang benar-benar penting dalam hidup. Aku menyadari bahwa meskipun aku berhasil secara profesional, aku telah mengorbankan kesehatan, hubungan, dan kebahagiaan sejatiku. Apa gunanya semua pencapaian jika tidak ada waktu untuk menikmatinya?</p>
        
        <p>Setelah banyak perenungan dan diskusi dengan orang-orang terdekat, aku membuat keputusan berani: mengundurkan diri dari pekerjaanku. Meskipun banyak orang menganggapku gila karena melepaskan posisi yang begitu diinginkan banyak orang, aku merasa damai dengan keputusanku.</p>
        
        <p>Selama enam bulan berikutnya, aku mengambil waktu untuk diri sendiri. Aku bepergian, membaca buku-buku yang sudah lama ingin kubaca, dan mendalami passion lamaku di bidang fotografi dan menulis. Aku juga mulai berbagi pengetahuanku tentang keseimbangan hidup dan kerja melalui blog kecil yang kuciptakan.</p>
        
        <p>Diluar dugaan, blogku mendapat perhatian. Aku mulai diundang untuk berbicara di forum-forum kecil, kemudian seminar, dan akhirnya konferensi nasional tentang well-being di tempat kerja. Apa yang dimulai sebagai proyek pribadi berkembang menjadi karir baru sebagai pembicara, penulis, dan konsultan well-being perusahaan.</p>
        
        <p>Ironisnya, kini aku bekerja dengan banyak perusahaan besar, termasuk mantan perusahaanku, untuk membantu mereka menciptakan lingkungan kerja yang lebih sehat dan berkelanjutan. Penghasilanku tidak seperti dulu, tetapi kualitas hidupku telah meningkat secara drastis.</p>
        
        <p>Krisis karirku ternyata adalah berkat terselubung yang mengarahkanku pada panggilan hidup yang sesungguhnya. Jika kamu juga merasa terperangkap dalam pekerjaan yang tidak lagi memenuhi jiwamu, ketahuilah bahwa tidak pernah terlambat untuk mengubah haluan. Keberanian untuk melepaskan yang tidak lagi sesuai mungkin akan membuka pintu menuju tujuan yang lebih bermakna.</p>
      `,
      author: 'Raditya Pratama',
      date: fourDaysAgo.toISOString(),
      category: 'Karir',
      excerpt: 'Perjalanan menemukan makna dan panggilan hidup setelah mengalami krisis karir dan burnout di perusahaan konsultan ternama...',
      header_image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
      likes: 178,
      comments: [
        {
          name: 'Joko',
          email: 'joko@example.com',
          content: 'Saya sedang berada di posisi yang sama sekarang. Artikel ini memberikan saya keberanian untuk mempertimbangkan perubahan.',
          date: new Date().toISOString()
        },
        {
          name: 'Sinta',
          email: 'sinta@example.com',
          content: 'Apakah Anda memiliki saran untuk seseorang yang ingin mengubah karir tapi takut akan konsekuensi finansialnya?',
          date: new Date().toISOString()
        },
        {
          name: 'Fajar',
          email: 'fajar@example.com',
          content: 'Blog Anda sangat membantu! Terima kasih telah berbagi pengalaman Anda.',
          date: new Date().toISOString()
        }
      ],
      tags: ['Karir', 'Wellbeing', 'Perubahan Hidup']
    }
  ];
};
