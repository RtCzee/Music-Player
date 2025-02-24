"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

// Mock data for the playlist
const playlist = [
  { id: 1, title: "Song 1", artist: "Artist 1", duration: "3:30", src: "/path/to/song1.mp3" },
  { id: 2, title: "Song 2", artist: "Artist 2", duration: "4:15", src: "/path/to/song2.mp3" },
  { id: 3, title: "Song 3", artist: "Artist 3", duration: "3:45", src: "/path/to/song3.mp3" },
  { id: 4, title: "Song 4", artist: "Artist 4", duration: "5:00", src: "/path/to/song4.mp3" },
]

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState(playlist[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [isPlaying]) // Removed unnecessary dependency: currentSong

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const playNextSong = () => {
    const currentIndex = playlist.findIndex((song) => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % playlist.length
    setCurrentSong(playlist[nextIndex])
    setIsPlaying(true)
  }

  const playPreviousSong = () => {
    const currentIndex = playlist.findIndex((song) => song.id === currentSong.id)
    const previousIndex = (currentIndex - 1 + playlist.length) % playlist.length
    setCurrentSong(playlist[previousIndex])
    setIsPlaying(true)
  }

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0])
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const handleProgressChange = (newProgress: number[]) => {
    if (audioRef.current) {
      const time = (newProgress[0] / 100) * audioRef.current.duration
      audioRef.current.currentTime = time
      setProgress(newProgress[0])
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-background rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Web Music Player</h2>

      {/* Playlist */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Playlist</h3>
        <ul className="space-y-2">
          {playlist.map((song) => (
            <li
              key={song.id}
              className={`p-2 rounded cursor-pointer ${
                song.id === currentSong.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
              onClick={() => setCurrentSong(song)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{song.title}</p>
                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>
                <span className="text-sm">{song.duration}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="icon" onClick={playPreviousSong}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={togglePlayPause}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon" onClick={playNextSong}>
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      <Slider className="mb-4" value={[progress]} max={100} step={1} onValueChange={handleProgressChange} />

      {/* Volume Control */}
      <div className="flex items-center">
        <Volume2 className="h-4 w-4 mr-2" />
        <Slider className="w-full" value={[volume]} max={1} step={0.01} onValueChange={handleVolumeChange} />
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src={currentSong.src} onTimeUpdate={handleTimeUpdate} onEnded={playNextSong} />
    </div>
  )
}

