from youtubesearchpython import VideosSearch

videosSearch = VideosSearch('Permutations', limit=5)

results = videosSearch.result()

for video in results['result']:
    video_url = video['link']
    print(video['title'])
    print(video_url)
