//Initializing the array
let arr = [
    {
        id:1,
        name:"john",
        age:"18",
        profession:"developer"
    },
    {
        id:2, 
        name:"jack",
        age:"20", 
        profession:"developer"
    },
    {
        id:3, 
        name:"karen", 
        age:"19",
        profession:"admin"
    }
];

//Dropdown and multi select
const multiSelectWithoutCtrl = ( elemSelector ) => {
    let options = [].slice.call(document.querySelectorAll(`${elemSelector} option`));
    options.forEach(function (element) {
        element.addEventListener("mousedown", 
            function (e) {
                e.preventDefault();
                element.parentElement.focus();
                this.selected = !this.selected;
                return false;
            }, false );
    });
}
  
multiSelectWithoutCtrl('#prof')

const dropdownBtn = document.getElementsByClassName('dropdown-btn');
const dropdown = document.getElementsByClassName('professions');

dropdownBtn[0].addEventListener('click', () => {
  if (dropdown[0].style.display === 'block') {
    dropdown[0].style.display = 'none';
  } else {
    dropdown[0].style.display = 'block';
  }
});

//Filtering the selected options and adding cards to the UI
const filterBtn = document.getElementById('filter-btn');
filterBtn.addEventListener('click', () =>{
    dropdown[0].style.display = 'none';
    const professionSelect = document.getElementById('prof');
    let selectedOptions = [];
    for(let i=0; i<professionSelect.options.length; i++) {
        if(professionSelect.options[i].selected) {
            selectedOptions.push(professionSelect.options[i].value);
        }
    }
    if(selectedOptions.length==0) {
        alert('Select a profession before clicking the button.');
    }
    const cards = document.getElementById('cards');
    cards.innerHTML = '';
    const filteredArray = arr.filter((e)=> {
        for(let i of selectedOptions) {
            if(i==e.profession) {
                return true;
            }
        }
        return false;
    });
    let count = 1;
    filteredArray.forEach((e)=>{
        const newDiv = document.createElement('div');
        newDiv.innerText = count + '.'+'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'+'Name: ' + e.name + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' +
        'Profession: ' + e.profession + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' +
        'Age: ' + e.age;
        
        // newDiv.innerText = `     1    `;
        cards.appendChild(newDiv);
        count++;
    });
});


//Taking input and adding it to the mapping
const adduserBtn = document.getElementById('adduser-btn');

adduserBtn.addEventListener('click', ()=>{
    const name = document.getElementById('name').value;
    const profession = document.getElementById('profession').value;
    const age = document.getElementById('age').value;
    if(name&&profession&&age) {
        const id = arr.length+1;
        arr.push(
            {
                id:id,
                name:name,
                age:age,
                profession:profession
            }
        );
        const professionSelect = document.getElementById('prof');
        let professionAvailable = false;
        for(let i=0; i<professionSelect.options.length; i++) {
            if(professionSelect.options[i].value.toLowerCase()==profession.toLowerCase()) {
                professionAvailable = true;
            }
        }
        if(!professionAvailable) {
            const newElement = document.createElement('option');
            newElement.innerText = profession.charAt(0).toUpperCase() + profession.slice(1);;
            newElement.value = profession;
            professionSelect.appendChild(newElement);
        }
    }
    else {
        alert('Add all the required fields while adding user');
    }
});
