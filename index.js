function saveToLocalStorage(event)
{
      event.preventDefault();
      let obj = {
       amount : event.target.amount.value,
       descri : event.target.descri.value,
       category : event.target.category.value
      };

      // var user = JSON.stringify(myobj);
      
      
      // localStorage.setItem( event.target.descri.value , user);
      axios.post("https://crudcrud.com/api/e893503c5f644889b5c4701f934235ff/appointments", obj)
                .then((res) =>{
                    
                     console.log(res);
                }).catch((err)=>{
                    console.log(err);
                })
      
}

var form=document.getElementById('forms');
var itemList = document.getElementById('items');

form.addEventListener("submit",dataOutput)
itemList.addEventListener('click',removeItem)
itemList.addEventListener('click',editItem)


document.addEventListener("DOMContentLoaded", () => {
  axios.get("https://crudcrud.com/api/9c47d104c79a4af8bf2830559a1c60dc/appointmets")
      .then((response) => {
          for(var i=0; i<response.data.length; i++){
              showUseronScreen(response.data[i]);
          }
          console.log(response);
      }).catch((error) => {
          console.log(error);
      })
})

function showUseronScreen(obj) {

  const parentElem = document.getElementById('items');
  const childElem = document.createElement('li');
  childElem.textContent = obj.amount + '-' + obj.descri + '-' + obj.category
 parentElem.appendChild(childElem);
}

function dataOutput(e)
{
    e.preventDefault();
    
    var newItem = document.getElementById('amount').value;
    newItem = newItem + " - " + document.getElementById('descri').value;
    newItem = newItem + " - " + document.getElementById('category').value;

    var li = document.createElement('li');

    li.className = 'list-group-item';

    li.appendChild(document.createTextNode(newItem));






     // Create del button element
  var deleteBtn = document.createElement('button');

  // Add classes to del button
  deleteBtn.className = 'deleteButton';
  deleteBtn.id = document.getElementById('descri').value;

  // Append text node
  deleteBtn.appendChild(document.createTextNode('Delete Expense'));

  // Append button to li
  li.appendChild(deleteBtn);






  //adding edit button
  var editBtn = document.createElement('button');

  // Add classes to del button
  editBtn.className = 'editButton';
  editBtn.id = document.getElementById('descri').value;

  // Append text node
  editBtn.appendChild(document.createTextNode('Edit Expense'));

  // Append button to li
  li.appendChild(editBtn);




  //APPENDING TO UL

    itemList.appendChild(li);

}

function removeItem(e)
{
    e.preventDefault();
    if(e.target.classList.contains('deleteButton')){
    if(confirm('Are You Sure to Delete?')){
      var li = e.target.parentElement;
      itemList.removeChild(li);
      localStorage.removeItem(e.target.id);
    }
  }
}
function editItem(e)
{
    e.preventDefault();
    if(e.target.classList.contains('editButton')){
    if(confirm('you want to Edit ?')){
      var li = e.target.parentElement;
      itemList.removeChild(li);
     
      const userData = JSON.parse(localStorage.getItem(e.target.id));
      console.log(userData)
      
      document.getElementById('amount').value=userData.amount;
      document.getElementById('descri').value=userData.descri;
      document.getElementById('category').value=userData.category;

      localStorage.removeItem(e.target.id);

    }
  }
}