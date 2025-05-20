import { supabase } from "../integrations/supabase/client";

async function updateUserToAdmin(userId: string) {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', userId);

    if (error) {
      throw error;
    }

    console.log('Successfully updated user to admin role');
  } catch (error) {
    console.error('Error updating user role:', error);
  }
}

// Update the specific user
updateUserToAdmin('3d5b782a-363c-4437-852a-f2494d46e707'); 