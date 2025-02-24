# 🎵 Web Music Player

A **responsive** and **feature-rich** web music player built with **Next.js, React, and Tailwind CSS**. Enjoy seamless music playback with modern UI components and intuitive controls. 🚀

## ✨ Features

- 🎶 **Play, pause, and navigate** through a playlist of songs
- 📃 **Display playlist** with song titles, artists, and durations
- ⏳ **Real-time song progress display**
- ⏩ **Playback controls** (Play/Pause, Next, Previous)
- 🔊 **Adjustable volume control**
- 🌙 **Dark mode toggle**
- 📂 **Playlist toggle feature**
- 🔀 **Shuffle & Repeat functionality**

## 📦 Dependencies

This project utilizes the following technologies:

- ⚡ **Next.js** – Server-side rendering & performance optimization
- ⚛️ **React** – Component-based UI framework
- 🎨 **Tailwind CSS** – Modern, utility-first styling
- 🏗️ **shadcn/ui** – Prebuilt UI components
- 🎭 **Lucide React** – Beautiful icons
- 📝 **TypeScript** – Strongly typed JavaScript
- 🏗️ **@types/node** – Type definitions for Node.js

## 🛠 Installation

1. **Clone the repository:** 🛜
   ```sh
   git clone https://github.com/RtCzee/Music-Player.git
   cd Music-Player
   ```

2. **Install the dependencies:** 📦
   ```sh
   npm install
   ```

3. **Install shadcn/ui components:** 🎛️
   ```sh
   npx shadcn@latest add button slider switch
   ```

4. **Install TypeScript and Node.js types:** 📝
   ```sh
   npm install typescript --save-dev
   npm install @types/node --save-dev
   ```

5. **Update `date-fns` to a compatible version:** 📅
   ```sh
   npm install date-fns@^2.28.0 --save
   ```

6. **Create a `components` folder** (if not already created) 📂

7. **Add the `MusicPlayer.tsx` file** to the `components` folder 🎵

8. **Import and use `MusicPlayer` in `page.tsx` or `layout.tsx`:**
   ```tsx
   import MusicPlayer from '../components/MusicPlayer'

   export default function Page() {
     return (
       <div className="container mx-auto p-4">
         <h1 className="text-2xl font-bold mb-4">My Music App</h1>
         <MusicPlayer />
       </div>
     )
   }
   ```

9. **Replace mock playlist data** in `MusicPlayer.tsx` with actual songs and file paths 🎧

## 🚀 Running the Application

To start the development server:
```sh
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser. 🌍

## 🎨 Customization

- Modify **Tailwind CSS** classes in `MusicPlayer.tsx` to change the appearance.
- Customize **shadcn/ui** component styles.
- Add animations, effects, or new features for a unique experience. ✨

## 📜 License

This project is **open source** and available under the [MIT License](LICENSE). 📝

---

Enjoy coding & happy listening! 🎵🚀

