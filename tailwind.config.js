module.exports = {
  theme: {
    extend: {
      colors: {
        'gray-1000': '#131820',
        'gray-1100': '#0d1116',
      },
    },
    container: {
      center: true,
      padding: '1rem',
    }
  },
  variants: {
    stroke: ['responsive', 'hover'],
    borderWidth: ['responsive', 'hover'],
    opacity: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [],
}
