/* Ethan Creator uses the same Supabase Auth project as Ethan Hub. No private keys in frontend. */
const ETHAN_ID_URL='https://hrymakhatxjitbgpdbjk.supabase.co';
const ETHAN_ID_KEY='sb_publishable_lZk0iM8AuN1ITiclDFCmZA_Sn35Fek0';
window.ethanCreator={ready:null,client:null};
window.ethanCreator.ready=new Promise(resolve=>window.addEventListener('DOMContentLoaded',async()=>{
 const overlay=document.getElementById('ethan-auth-overlay'),message=document.getElementById('ethan-auth-message');
 if(!window.supabase){message.textContent='Unable to load Ethan ID. Check your internet connection.';resolve(null);return;}
 const client=window.supabase.createClient(ETHAN_ID_URL,ETHAN_ID_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});window.ethanCreator.client=client;
 const update=async()=>{const {data:{user},error}=await client.auth.getUser();overlay.hidden=!!user;document.getElementById('ethan-session-bar').hidden=!user;document.getElementById('ethan-user').textContent=user?.email||'';document.dispatchEvent(new CustomEvent('ethan-auth-change',{detail:{user:user||null}}));return user||null;};
 document.getElementById('ethan-login').addEventListener('submit',async e=>{e.preventDefault();message.textContent='Signing in…';const {error}=await client.auth.signInWithPassword({email:document.getElementById('ethan-email').value.trim(),password:document.getElementById('ethan-password').value});message.textContent=error?error.message:'';if(!error)await update();});
 document.getElementById('ethan-signout').addEventListener('click',async()=>{await client.auth.signOut();await update();});
 client.auth.onAuthStateChange(()=>setTimeout(update,0));const user=await update();resolve(user);
}));
