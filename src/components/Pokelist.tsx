import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/App.css'
import pokeball from '../image/icons8-open-pokeball-48.png'
//Criando a interface que utilizaremos no primeiro chamado da api
interface Pokemon {
  name: string;
  url: string;
};
//Criando a interface que nos dará os detalhes da api
interface PokemonDetails{
  name: string;
  sprites: {
    front_default: string;
  }
}

function Pokelist() {
  //Uso da state pra controle da listagem
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  //Consumindo a api
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
      })
      .catch((error) => console.error(error));
  }, []);

//Aqui estamos retornando o que queremos, no caso utilizando a função MAP, onde estamos retornando o  component "POKEMON" que está logo abaixo
  return (
    <div className='main-content'>
      <header className='header'>
      <h1 id='title'>POKEDEX</h1>
      <img src={pokeball} alt="pokeball" id='pokeball' />
      </header>
      <span className='poke-container'>
        {pokemonList.map((pokemon) => (
          <Pokemon key={pokemon.name} data={pokemon}/>
        ))}
      </span>
    </div>
  );
}

//Utilizamos aqui o conceito de props, e estamos passando aquele atributo "data" com a variavel pokemon que está recebendo o contéudo da API
const Pokemon = ({data}: {data:Pokemon}) =>{
  //Coletando os DETALHES da api
  const [details, setDetails] = useState<PokemonDetails | null>(null)
  //Passando a interface como generics para nos auxiliar e melhorar nossa tipagem, além de que estamos acessando o link do consumo da API através do axios agora
  useEffect(()=>{
    axios.get<PokemonDetails>(data.url).then((response) =>setDetails(response.data))
  },[data.url])
  //O código está executando esse data.url como uma dependencia para acionar uma nova busca de dados quando o data url é alterado

  if (details === null) {
    return <div>-</div>;
  }
//Neste return passamos basicamente o que queremos mostrar na nossa função MAP acima
  return(
    <div className='container'>
      <div className='poke-details'>
        <img src={details.sprites.front_default} alt={details.name} className= "poke-img"/>
        <div className="poke-info">
        <span>
          <hr />
        <b id ='poke-name'>{details.name}</b>
        </span>
        </div>

      </div>
    </div>
  )
}

export default Pokelist;