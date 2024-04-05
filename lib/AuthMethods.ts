export const getAuthSession = async () => {
  const res = await fetch(
    "http://localhost:3000/api/supabase/getAuthSessions",
    {
      next: { tags: ["session"], revalidate: 300 },
    }
  );
  const session = await res.json();
  return session;
};
