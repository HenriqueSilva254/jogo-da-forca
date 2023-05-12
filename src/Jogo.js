import { useState } from "react";
import Alfabeto from "./Alfabeto";
import Palavras from "./palavras"
import ReactDOM from 'react-dom';

export default function Jogo() {
    // const [palavraSecreta, setpalavraSecreta] = useState()
    let [PalavraSorteada, setPalavraSorteada] = useState()
    let [Botoes, setBotoes] = useState(Alfabeto.map(Botoes => <button className="alfabetoDesabilidato" data-test="letter" onClick={() => ConferirTentativas(Botoes)} id={`botao_letra${Botoes}`} disabled>{Botoes}</button>))
    let ListaDinamica = []
    let [Li, setLi] = useState("");
    let [inicial, setInicial] = useState(0)
    let desabilitar = "disabled"
    let Tentativas = 6
    let contador =0
    return (
        <div>
            <div className="container">
                <div className="forca">
                <img data-test="game-image"  className="imagemForca" src="./projeto__forca__imagens/assets/forca0.png"/>
                </div>
                <div className="escolher">
                    <button onClick={Ramdomizar} data-test="choose-word" id="escolherPalavra" >Escolher Palavra</button>
                </div>
                <div className="palavra-secreta">
                   <ul id="letras" data-test="word">

                   </ul>
                </div>
            </div>
            <div className="alfabeto">
                <Botoesletras />
            </div>
        </div>
    );
    
    
    function Ramdomizar() {
        const espacos = document.getElementById('letras')
        espacos.style.color = "black"
        document.querySelector('.imagemForca').setAttribute("src", `./projeto__forca__imagens/assets/forca0.png`) 
       

        inicial = 1
        
        const indexPalavra = parseInt(Math.random() * Palavras.length)
        PalavraSorteada = Palavras[indexPalavra]
        //console.log(PalavraSorteada)
        setPalavraSorteada(PalavraSorteada)
        
        //ReactDOM.render( <Palavra />, document.querySelector('.palavra-secreta'))
        setBotoes(Alfabeto.map(Botoes => <button className="alfabetoHabilidato" data-test="letter" onClick={() => ConferirTentativas(Botoes)} id={`botao_letra${Botoes}`}>{Botoes}</button>))
        Forca()
    }
    function ConferirTentativas(letra){
        const Desabilitar = document.getElementById(`botao_letra${letra}`)
        console.log(Tentativas)
       
        if(Tentativas > 0){
            Desabilitar.classList.remove("alfabetoHabilidato")     
            Desabilitar.classList.add("alfabetoDesbilidato")
            Desabilitar.setAttribute("disabled", "disabled")
            //console.log(Desabilitar)
            ComparaLetras(letra)
            Forca(PalavraSorteada)
        }
        if(Tentativas === 0){
            EndGame()
            setBotoes(Alfabeto.map(Botoes => <button className="alfabetoDesabilidato" data-test="letter" onClick={() => ConferirTentativas(Botoes)} disabled id={`botao_letra${Botoes}`}>{Botoes}</button>))
            
        }
       
    }
    function ComparaLetras(letra){
        console.log(PalavraSorteada)
        
        const pos = PalavraSorteada.indexOf(letra)
        if(pos < 0 ){
           Tentativas--
           contador++
           console.log(contador)
           document.querySelector('.imagemForca').setAttribute("src", `./projeto__forca__imagens/assets/forca${contador}.png`) 
          
        }
        else{
            for (let i = 0; i < PalavraSorteada.length; i++) {
                if(letra === PalavraSorteada[i]){
                    ListaDinamica[i] = letra
                }
            }
        }
        let acertos = 0
        for(let i = 0; i < ListaDinamica.length; i++){
            if(ListaDinamica[i] !== "_"){
                acertos++
            }
            if(acertos === ListaDinamica.length){
            const espacos = document.getElementById('letras')
            espacos.style.color = "green"

            setBotoes(Alfabeto.map(Botoes => <button className="alfabetoDesabilidato" data-test="letter" onClick={() => ConferirTentativas(Botoes)} disabled id={`botao_letra${Botoes}`}>{Botoes}</button>))
            }
        }
     
        
    }
    function Botoesletras() {
            
       return (

            <div>
                {Botoes}
            </div>

        )
      
    }
  
    function Forca(){
        const espacos = document.getElementById('letras')
        espacos.innerHTML = ""
        
        for (let i = 0; i < PalavraSorteada.length ; i++) {
            
            
            if (ListaDinamica[i] === undefined) {
                ListaDinamica[i] = "_"
                //console.log(ListaDinamica[i])
                espacos.innerHTML = espacos.innerHTML + `<li>${ListaDinamica[i]}</li>`
                
            }else {
             
            //console.log(ListaDinamica[i])
            espacos.innerHTML = espacos.innerHTML + `<li>${ListaDinamica[i]}</li>`
            }
        }
        
    }
    function EndGame(){
        const espacos = document.getElementById('letras')
        espacos.innerHTML = `${PalavraSorteada}`
        espacos.style.color = "red"
        
    }
}
    


