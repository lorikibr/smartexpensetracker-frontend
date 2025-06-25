/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // THIS ARRAY IS CRUCIAL. It tells Tailwind CSS which files to scan
    // to find your Tailwind class names (e.g., "flex", "p-4", "bg-blue-500").
    // If the paths here are wrong, Tailwind won't generate any CSS for your classes.
    "./index.html", // Include your main HTML file
    // This line tells Tailwind to look in the 'src' folder and ALL its subfolders
    // for files ending with .js, .ts, .jsx, or .tsx.
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // This is where you can extend Tailwind's default colors, fonts, spacing, etc.
    extend: {
      colors: {
        'brand-primary': '#4F46E5',
        'brand-secondary': '#10B981',
        'neutral-light': '#F3F4F6',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '1/7': '14.2857143%',
      },
    },
  },
  plugins: [],
}
