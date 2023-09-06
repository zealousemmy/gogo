import {createClient} from "@supabase/supabase-js";


// const supabaseURL = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const supabaseURL:any = process.env.NEXT_PUBLIC_API_URL;
const supabaseKey:any = process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY


export const supabase = createClient(supabaseURL, supabaseKey)