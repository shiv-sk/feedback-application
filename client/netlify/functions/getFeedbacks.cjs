const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

exports.handler = async function() {
    const { data, error } = await supabase.from("feedback").select("*").order("created_at", { ascending: false });
    if(error){
        console.error("Supabase fetch error:", error);
        return{
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch feedbacks" }),
        };
    }
    return{
        statusCode: 200,
        body: JSON.stringify({ feedbacks: data }),
    }
}