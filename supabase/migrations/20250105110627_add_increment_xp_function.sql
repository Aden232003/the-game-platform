-- Create the increment_xp function
CREATE OR REPLACE FUNCTION increment_xp(user_id uuid, xp_amount integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- First ensure the profile exists
  INSERT INTO profiles (id)
  VALUES (user_id)
  ON CONFLICT (id) DO NOTHING;

  -- Then update the XP
  UPDATE profiles
  SET xp = xp + xp_amount,
      updated_at = NOW()
  WHERE id = user_id;
END;
$$; 