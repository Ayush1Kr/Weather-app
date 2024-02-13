const tempfield = document.querySelector(".weather1");
const cityfield = document.querySelector(".weather2 p");
const datefield = document.querySelector(".weather2 span");
const emojifield = document.querySelector(".weather3 img");
const weatherfield = document.querySelector(".weather3 span");
const searchfield =document.querySelector(".searchfield");
const form = document.querySelector("form");


let target = "madhya pradesh"

const fetchdata = async(target) => {
    
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=8a818988647e406c867164841241302&q=${target}`;

    const response = await fetch(url);

    const data = await response.json();

    const {
        current:{temp_c, condition:{
            text,icon
        }},
        location: { name, localtime},
    } = data ;

    // console.log(data);
    // updatedom(data.current.temp_c, data.location.name);
    updatedom (temp_c , name,localtime, icon, text);

    } catch (error) {
        alert("Location not found");
    }
};


function updatedom(temp , city,time,emoji,text){
    tempfield.innerText= temp;
    cityfield.innerText= city ;
const exacttime= time.split(" ")[1];
const exactdate= time.split(" ")[0];

const exactday =getdayfullname(new Date(exactdate).getDay());


    datefield.innerText=  `${exacttime} - ${exactday} ${exactdate}`;
    emojifield.src = emoji;
    weatherfield.innerText= text;
}

fetchdata();


function getdayfullname(num){
    switch (num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";

        default:
            return "Don't Know ";
    }
}


form.addEventListener("submit" , search =(e)=>{
    e.preventDefault();

    target = searchfield.value ;

    fetchdata(target);

})