import plugin from "tailwindcss/plugin";

module.exports = {
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".no-overflow-anchoring": {
          overflowAnchor: "none",
        },
      });
    }),
  ],
};
