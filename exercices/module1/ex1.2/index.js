
window.alert(addDateTime("test"));

function addDateTime(message){
    const date = new Date();
    let string =""; 
    string += date.toLocaleDateString() + " ";
    string += date.toLocaleTimeString() + " : ";
    string += message;
    console.log(string);
    return string;
}