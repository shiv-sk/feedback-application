const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)
exports.handler = async function(event){
    try {
        const data = JSON.parse(event.body);
        const {name , email , message} = data;
        const {error} = await supabase.from('feedback').insert([{name , email , message}]);
        if(error){
            console.error("Supabase error:", error);
            return{
                statusCode: 500,
                body:JSON.stringify({ error: "Failed to store feedback" }),
            }
        }
        return{
            statusCode: 200,
            body: JSON.stringify({ message: "Feedback stored successfully!" }),
        }
    } catch (error) {
        return{
            statusCode: 400,
            body: JSON.stringify({ error: error }),
        }
    }
}