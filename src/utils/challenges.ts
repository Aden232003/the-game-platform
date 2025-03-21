const challenges = [
  "Compliment someone today",
  "Start a conversation with a stranger",
  "Send a thoughtful message to a friend",
  "Join a group conversation",
  "Share a personal story with someone",
  "Ask someone about their day and practice active listening",
  "Invite someone for coffee or lunch",
  "Practice making eye contact during conversations",
  "Express gratitude to someone in your life",
  "Reach out to an old friend you haven't spoken to in a while"
];

export const getDailyChallenge = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return challenges[dayOfYear % challenges.length];
};