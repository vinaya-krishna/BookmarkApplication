//Listen for submit button click

document.querySelector("#myform").addEventListener('submit',save_bookmark);

function save_bookmark(evt){

    let siteName = document.getElementById('siteName').value;
    let siteURL = document.getElementById('siteURL').value;


    if(!validate_form(siteName,siteURL)){
        return false;
    }


    var bookmark = {
        name: siteName,
        url: siteURL
    }

    // localStorage.setItem('test','Hello world');

    // console.log(localStorage.getItem('test'));


    if(localStorage.getItem('bookmarks') == null){
        let bookmarks = [];
    }
    else{
        let bookmarks = get_from_storage();
    }
    bookmarks.push(bookmark);
    save_to_storage(bookmarks);

    fetch_bookmarks();

    document.getElementById("myform").reset();

    evt.preventDefault();


}
function get_from_storage(){
    return JSON.parse(localStorage.getItem('bookmarks'))
}

function save_to_storage(bookmark){
    localStorage.setItem('bookmarks', JSON.stringify(bookmark));
}

function delete_bookmark(url){

    console.log(url);
    let all_bookmarks = get_from_storage();
    for(let i=0;i<all_bookmarks.length;i++){
        if(url === all_bookmarks[i].url){
            all_bookmarks.splice(i,1);
        }
    }

    save_to_storage(all_bookmarks);
    fetch_bookmarks();


}

function fetch_bookmarks(){

    bookmarks = get_from_storage();
    console.log(bookmarks);
    output_holder = document.getElementById('bookmarks-result');
    output_holder.innerHTML = "";

    for(let i=0; i<bookmarks.length;i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        output_holder.innerHTML += `<div class="well">
        <h3>${name}</h3>
        <a class="btn btn-default" target = '_blank' href=${url}>Visit</a>
        <a class="btn btn-danger" onclick= delete_bookmark('${url}') >Delete</a>
        </div>`

    }

}


function validate_form(siteName,siteURL) { 
    if(!siteName || !siteURL){
        alert("Please fill the form");
        return false;
    }
    
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteURL.match(regex)) {
            alert('Please use a valid URL');
        return false;
    }
    return true;
 }