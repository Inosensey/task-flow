export const formatStringName = (key: string | null | undefined) => {
  if (!key) return;
  const words = key.split("_");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
};
