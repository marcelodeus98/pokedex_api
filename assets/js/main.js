const pokemonList = document.getElementById('pokemons-list')
const loadMoreButton = document.getElementById('loadMoreButton')
const loadReturnButton = document.getElementById('loadReturnButton')
const pokemonDetail = document.getElementById('containerInfor')

const maxRecords = 649;
const limit = 12;
let offset = 0;


///<img src="${pokemon.sprites.other.dream_world.front_default}" alt="Bulbasaur">

function getSpecificPokemon(){
    pokeApi.getSpecificPokemon().then((poke) => {      
        
        const pokemon = new Pokemon()
        pokemon.number = poke.id
        pokemon.name = poke.name
        pokemon.weight = poke.weight
        pokemon.height = poke.height

        const types = poke.types.map((typeSlot) => typeSlot.type.name)
        const [type]  = types

        const abilities = poke.abilities.map((abilityPosition) => abilityPosition.ability.name)

        const stats1 = poke.stats[0]
        const stats2 = poke.stats[1]
        const stats3 = poke.stats[2]
        const stats4 = poke.stats[5]

        pokemon.types = types
        pokemon.type = type

        pokemon.abilities = abilities

        pokemon.stats1 = stats1
        pokemon.stats2 = stats2
        pokemon.stats3 = stats3
        pokemon.stats4 = stats4
            
        pokemon.photo = poke.sprites.other.dream_world.front_default

        const details = 
            `
            <section class="content ${pokemon.type}">
                <div class="logo">
                    <img src="./assets/img/logo.svg.png">
                </div>
    

                <div class="img">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
     
                <div class="contentInfor">

                    <div class="apresentation">
                        <span class="number">#${pokemon.number}</span>
                        <h1 class="name">${pokemon.name}</h1>
                    </div>

                    <div class="details">
                        <ol class="box">
                            <span class="title">Geral</span>
                            <li class="type box_li">Weight = ${pokemon.weight}</li>
                            <li class="type box_li">Height = ${pokemon.height}</li>
                        </ol>
    
                        <ol class="box">
                            <span class="title">Status</span>
                            <li class="type box_HP">Hp = ${pokemon.stats1.base_stat}</li>
                            <li class="type box_Attack">Attack = ${pokemon.stats2.base_stat}</li>
                            <li class="type box_Defense">Defense = ${pokemon.stats3.base_stat}</li>
                            <li class="type box_Speed">Speed = ${pokemon.stats4.base_stat}</li>
                        </ol>
    
                        <ol class="box">
                            <span class="title">Type</span>
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    
                        <ol class="box">
                            <span class="title">Abilities</span>
                            ${pokemon.abilities.map((ability) => `<li class="type box_ability">${ability}</li>`).join('')}
                        </ol>

                    </div>

                    </div>
                    <div class="return">
                        <a class="btn" href="index.html">Home</a>
                    </div>  
            </section>    
            `
    
        pokemonDetail.innerHTML = details
    })
}

getSpecificPokemon()

function loadPokemonItens(offset, limit){

    pokeApi.getPokemon(offset, limit).then((pokemons) => {
        const newListPokemons = pokemons.map((pokemon) => `
            <li class="pokemon-itens ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>

                <div class="more">
                    <a class="btn" href="pokemon.html?id=${pokemon.number}">See more</a>
                </div>      
            </li>
        `).join('');
    
        pokemonList.innerHTML = newListPokemons;
    })
}

loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit;

    loadPokemonItens(offset, limit)
})

loadReturnButton.addEventListener('click', () => {
    offset -= limit;

    loadPokemonItens(offset, limit)
})
