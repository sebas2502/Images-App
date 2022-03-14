let url = 'https://pixabay.com/api/?key=26063955-f16f66e0be829a7f16d0a0f9a&q=';


//Get elements from the DOM
let boxImgs = document.getElementById("box-imgs");
let form = document.querySelector(".form");
let input = document.querySelector(".input");
let pagination = document.querySelector(".pagination");




 //Function to print the images in the DOM
 const printImages = (images,pag,uri) => {
    
        images.map((image)=>{
        boxImgs.innerHTML += `
        <div class="card">
            <div class="card-body">
                <img src=${image.previewURL} class="img">
                    <div class="mt-4 text-white">
                        ${image.views} Views<br> 
                        ${image.likes} Likes
                    </div>
            </div>
            <a href=${image.largeImageURL} target="_blank" class="btn btn-danger btn-view">View</a>
        </div>`;  
        
    })
        
        pagination.innerHTML = `
                  <a class="btn btn-info" id="prev">Previous</a> <span class="text-white span">${pag}</span> <a id="next" class="btn btn-info">Next</a>
                 `
    
        let next = document.getElementById("next");
        let prev = document.getElementById("prev");

        //Here we handle the events of the pagination buttons
        next.addEventListener("click",()=>{
        boxImgs.innerHTML = ''
        pag++
        fetch(uri+`&page=${pag}`)
         .then(res => res.json())
         .then(data => printImages(data.hits,pag,uri))
         .catch(error => console.log(error))  
            
        })
    

        prev.addEventListener("click",()=>{
        boxImgs.innerHTML = ''
        pag--
       
       if(pag < 1){
         return alert("The pagination cannot be negative");
       }else{
        fetch(uri+`&page=${pag}`)
        .then(res => res.json())
        .then(data => printImages(data.hits,pag,uri))
        .catch(error => console.log(error)) 
       }
           
    })

 }  



const sendData = (data) => {
    let uri = url+data+`&per_page=12`
    let pag = 1;  //when searching for an image, the page to display will always be the first
    fetch(uri)
         .then(res => res.json())
         .then(data => printImages(data.hits,pag,uri))  //Here we call a function to print the images
         .catch(error => console.log(error))   
}


//we get the search data from the form and send it to the sendData function
form.addEventListener("submit",(e)=>{
     e.preventDefault();
     
     let info = input.value;
     sendData(info);      //Here we send data of the input
     boxImgs.innerHTML = "";
     form.reset(); 

})



