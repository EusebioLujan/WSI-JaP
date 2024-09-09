const about = document.getElementById("about");
const DATA_URL = "https://api.github.com/users/";

const user=["Eusebiolujan","Mauri-codes4","NahuelCampos99","unombu"]

user.map((github)=>{
    fetch(DATA_URL+github)
    .then(reponse=>reponse.json()) 
    .then(data=>{
        const userData=showData(data)
about.innerHTML+=userData
    })
})

function showData(e){
    const name= e.name??e.login
    return `
    
    <div class=" p-[2px] rounded-se-[100px] rounded-bl-[100px] shadowcard w-[300px] mt-5 mb-3 mx-2">
    <div class="flex flex-col py-7 rounded-md rounded-se-[100px] rounded-bl-[100px] bg-[#0F212E] z-40 h-full w-full">
      <div class="text-center font-bold hover:scale-105 rounded-t-full items-center flex flex-col ">
      <img src="${e.avatar_url}" alt="Avatar" width="150" height="150" class="rounded-t-full">
      <label class="mt-2 text-white truncate max-w-[200px]">${name}</label>
      </div>
    </div>
    </div>
    `
}