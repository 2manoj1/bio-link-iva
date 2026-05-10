export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(() => {
  try {
    const theme = window.localStorage.getItem("iva-theme") || "dark";
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (_) {
    document.documentElement.classList.add("dark");
  }
})();
        `.trim(),
      }}
    />
  );
}
