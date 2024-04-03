from youtubesearchpython import VideosSearch


def yt_recommend():
    videosSearch = VideosSearch('Permutations', limit=5)

    results = videosSearch.result()

    for video in results['result']:
        video_url = video['link']
        video_title=video['title']
        return (video_url,video_title)