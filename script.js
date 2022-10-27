const pokemonName = document.querySelector("input");
const btn = document.querySelector("button");
const card = document.querySelector(".card");

btn.addEventListener("click", (e) => {
    e.preventDefault();
    async function start () {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${(pokemonName.value).toLowerCase()}`);

        if (data.status == 404 || pokemonName.value =="") {
         return alert("There is no pokemon with this name! Please enter another name.");
        }
        card.innerHTML="";
        const result = await data.json();
        const img = document.createElement ("img");
        img.src = result.sprites.front_default;

        const pokemonTitle = document.createElement("h2");
         pokemonTitle.innerText = result.name;
        pokemonTitle.style.textTransform ="uppercase";
        pokemonTitle.classList.add("name");
        card.appendChild(pokemonTitle);
        card.appendChild(img);

        let stats1 = document.createElement("h4");
        stats1.innerText = "stats";
        stats1.classList.add("properties");
        card.appendChild(stats1);
        
        let table = document.createElement("table");
        table.classList.add("statsTable");
        card.appendChild(table);
        
        //insert rows in out Stats Table 
        for (let i = 0; i < result.stats.length; i++) {
            let row = table.insertRow(0);
            let cell1 = row.insertCell(0); 
            let cell2 = row.insertCell(1); 
            cell1.innerText = result.stats[i].stat.name;
            cell2.innerText = result.stats[i].base_stat;
        };

        let  abil1= document.createElement("h4");
        abil1.innerText = "abilities";
        abil1.classList.add("properties");
        card.appendChild(abil1);
        
        for (i = 0; i < result.abilities.length; i++) {
            let abilityP = document.createElement("p");
            abilityP.className = "ability";
            abilityP.innerText = result.abilities[i].ability.name;
            card.appendChild(abilityP);
         }

         //Sort the statsTable numeric
           var rows, switching, i, x, y, shouldSwitch;
            switching = true;
            /*Make a loop that will continue until
            no switching has been done:*/
            while (switching) {
              //start by saying: no switching is done:
              switching = false;
              rows = table.rows;
              /*Loop through all table rows (except the
              first, which contains table headers):*/
              for (i = 0; i < (rows.length-1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                one from current row and one from the next:*/
                x = rows[i].getElementsByTagName("td")[1];
                y = rows[i + 1].getElementsByTagName("td")[1];
                //check if the two rows should switch place:
                if (Number(x.innerHTML) > Number(y.innerHTML)) {
                  //if so, mark as a switch and break the loop:
                  shouldSwitch = true;
                  break;
                }
              }
              if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
              }
          }; 
       } 
       start();
    })
