-- Create increment_xp function
CREATE OR REPLACE FUNCTION increment_xp(user_id UUID, xp_amount INTEGER)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE profiles
  SET xp = COALESCE(xp, 0) + xp_amount,
      updated_at = NOW()
  WHERE id = user_id;
END;
$$; 