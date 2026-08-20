import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 
  '';

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' && 
  supabaseUrl !== 'https://your-project-id.supabase.co' && 
  !supabaseUrl.includes('placeholder')
);

// Create and export the Supabase client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : null;

/**
 * Helper: Sign Up a new Client via Supabase Auth & PostgreSQL Profiles table
 */
export const supabaseSignUp = async ({ name, email, password, city, preference }) => {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, fallback: true };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          city: city || 'Chennai Flagship',
          preference: preference || 'Bridal Kanchipuram'
        }
      }
    });

    if (error) throw error;

    // Insert or update profile in public.profiles table
    if (data?.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email: email.toLowerCase(),
        full_name: name,
        city: city || 'Chennai Flagship',
        preference: preference || 'Bridal Kanchipuram',
        updated_at: new Date().toISOString()
      });
    }

    return { 
      success: true, 
      user: {
        id: data.user?.id || `client-${Date.now()}`,
        name,
        email,
        city: city || 'Chennai Flagship',
        preference: preference || 'Bridal Kanchipuram',
        memberSince: new Date().getFullYear().toString()
      }
    };
  } catch (err) {
    console.error('Supabase Sign Up Error:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Helper: Sign In existing client via Supabase Auth & Fetch PostgreSQL Profile
 */
export const supabaseSignIn = async (email, password) => {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, fallback: true };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Fetch user profile from public.profiles
    let profileData = null;
    if (data?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      profileData = profile;
    }

    const fullName = profileData?.full_name || data.user?.user_metadata?.full_name || email.split('@')[0];
    const city = profileData?.city || data.user?.user_metadata?.city || 'Chennai Flagship';
    const preference = profileData?.preference || data.user?.user_metadata?.preference || 'Couture';

    return {
      success: true,
      user: {
        id: data.user.id,
        name: fullName,
        email: data.user.email,
        city,
        preference,
        memberSince: new Date(data.user.created_at || Date.now()).getFullYear().toString()
      }
    };
  } catch (err) {
    console.error('Supabase Sign In Error:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Helper: Reset Password / Send Recovery Email
 */
export const supabaseResetPassword = async (email) => {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, fallback: true };
  }
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined
    });
    if (error) throw error;
    return { success: true, message: 'Password recovery instructions sent to your email.' };
  } catch (err) {
    console.error('Supabase Reset Password Error:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Helper: Update Password for authenticated user
 */
export const supabaseUpdatePassword = async (newPassword) => {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, fallback: true };
  }
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Supabase Update Password Error:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Helper: Sign Out client
 */
export const supabaseSignOut = async () => {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.error('Supabase Sign Out Error:', err);
  }
};

/**
 * Helper: Save Salon Appointment to PostgreSQL (public.appointments)
 */
export const supabaseSaveAppointment = async (appointmentData) => {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, fallback: true };
  }

  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          client_name: appointmentData.name,
          client_email: appointmentData.email,
          client_phone: appointmentData.phone,
          maison_id: appointmentData.maisonId,
          maison_name: appointmentData.maisonName,
          service_id: appointmentData.serviceId,
          service_title: appointmentData.serviceTitle,
          appointment_date: appointmentData.date,
          appointment_time: appointmentData.time,
          event_date: appointmentData.eventDate || null,
          special_requests: appointmentData.specialRequests || '',
          booking_ref: appointmentData.bookingRef,
          status: 'confirmed'
        }
      ])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Supabase saveAppointment Error:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Helper: Save Couture Order to PostgreSQL (public.orders)
 */
export const supabaseSaveOrder = async (orderData) => {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, fallback: true };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          order_number: orderData.orderNumber,
          client_email: orderData.email,
          client_name: `${orderData.firstName} ${orderData.lastName}`,
          phone: orderData.phone,
          shipping_address: {
            address: orderData.address,
            city: orderData.city,
            country: orderData.country,
            postalCode: orderData.postalCode
          },
          items: orderData.items,
          total_usd: orderData.totalUSD,
          total_inr: orderData.totalINR,
          packaging_choice: orderData.packagingChoice,
          fragrance_sample: orderData.fragranceSample,
          payment_method: orderData.paymentMethod,
          status: 'confirmed'
        }
      ])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Supabase saveOrder Error:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Helper: Fetch all orders from PostgreSQL (public.orders)
 */
export const supabaseFetchOrders = async () => {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('Supabase fetch orders fallback:', err.message);
    return [];
  }
};

/**
 * Helper: Fetch all salon appointments from PostgreSQL (public.appointments)
 */
export const supabaseFetchAppointments = async () => {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('Supabase fetch appointments fallback:', err.message);
    return [];
  }
};

/**
 * Helper: Fetch all registered client profiles from PostgreSQL (public.profiles)
 */
export const supabaseFetchProfiles = async () => {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('Supabase fetch profiles fallback:', err.message);
    return [];
  }
};

/**
 * Helper: Update order status in PostgreSQL (public.orders)
 */
export const supabaseUpdateOrderStatus = async (orderNumber, status) => {
  if (!isSupabaseConfigured || !supabase) return { success: false, fallback: true };
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('order_number', orderNumber)
      .select();
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Supabase update order error:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Helper: Update appointment status in PostgreSQL (public.appointments)
 */
export const supabaseUpdateAppointmentStatus = async (bookingRef, status) => {
  if (!isSupabaseConfigured || !supabase) return { success: false, fallback: true };
  try {
    const { data, error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('booking_ref', bookingRef)
      .select();
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Supabase update appointment error:', err);
    return { success: false, error: err.message };
  }
};
