"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, Moon, Sun, List, Shuffle, Repeat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"

// Mock data for the playlist
const playlist = [
  {
    id: 1,
    title: "Song 1",
    artist: "Artist 1",
    duration: "3:30",
    src: "/path/to/song1.mp3",
    cover: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    title: "Song 2",
    artist: "Artist 2",
    duration: "4:15",
    src: "/path/to/song2.mp3",
    cover: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    title: "Song 3",
    artist: "Artist 3",
    duration: "3:45",
    src: "/path/to/song3.mp3",
    cover: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    title: "Song 4",
    artist: "Artist 4",
    duration: "5:00",
    src: "/path/to/song4.mp3",
    cover: "/placeholder.svg?height=300&width=300",
  },
]

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState(playlist[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [progress, setProgress] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
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
  }, [isPlaying])

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const playNextSong = () => {
    const currentIndex = playlist.findIndex((song) => song.id === currentSong.id)
    let nextIndex
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * playlist.length)
    } else {
      nextIndex = (currentIndex + 1) % playlist.length
    }
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

  const handleSongEnd = () => {
    if (isRepeat) {
      audioRef.current?.play()
    } else {
      playNextSong()
    }
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <header className="p-4 flex justify-center items-center">
        <div className="w-10" /> {/* Spacer to balance the layout */}
        <h1 className="text-2xl font-bold">Web Music Player</h1>
        <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} className="data-[state=checked]:bg-primary">
          <span className="sr-only">Toggle dark mode</span>
          {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Switch>
      </header>

      <main className="flex-grow flex">
        {/* Left sidebar - Playlist */}
        <aside
          className={`w-64 p-4 overflow-y-auto transition-all duration-300 ${isPlaylistOpen ? "translate-x-0" : "-translate-x-full"} ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <h2 className="text-xl font-semibold mb-4">Playlist</h2>
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
        </aside>

        {/* Main content - Now Playing */}
        <section className="flex-grow flex flex-col items-center justify-center p-4">
          <div
            className={`relative w-64 h-64 rounded-full overflow-hidden mb-8 ${isPlaying ? "animate-spin" : ""}`}
            style={{ animationDuration: "4s" }}
          >
            <Image
              src={currentSong.cover || "/placeholder.svg"}
              alt={`${currentSong.title} cover`}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2">{currentSong.title}</h2>
          <p className="text-lg text-muted-foreground mb-8">{currentSong.artist}</p>

          {/* Playback Controls */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsShuffle(!isShuffle)}
              className={isShuffle ? "bg-primary text-primary-foreground" : ""}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={playPreviousSong}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="w-16 h-16" onClick={togglePlayPause}>
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
            </Button>
            <Button variant="outline" size="icon" onClick={playNextSong}>
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsRepeat(!isRepeat)}
              className={isRepeat ? "bg-primary text-primary-foreground" : ""}
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md mb-4">
            <Slider value={[progress]} max={100} step={1} onValueChange={handleProgressChange} />
          </div>

          {/* Volume Control */}
          <div className="flex items-center w-full max-w-md">
            <Volume2 className="h-4 w-4 mr-2" />
            <Slider className="w-full" value={[volume]} max={1} step={0.01} onValueChange={handleVolumeChange} />
          </div>
        </section>
      </main>

      {/* Playlist toggle button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
        className={`fixed top-4 left-4 z-10 p-2 rounded-full transition-all duration-300 ${
          isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"
        } ${isPlaylistOpen ? "rotate-90" : ""}`}
      >
        <List className={`h-6 w-6 transition-all duration-300 ${isPlaylistOpen ? "rotate-90" : ""}`} />
      </Button>

      {/* Audio Element */}
      <audio ref={audioRef} src={currentSong.src} onTimeUpdate={handleTimeUpdate} onEnded={handleSongEnd} />
    </div>
  )
}

