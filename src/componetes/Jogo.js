import { useState } from "react";
import Alfabeto from "./Alfabeto";
import Palavras from "./palavras";
import ReactDOM from 'react-dom';

export default function Jogo() {
    // const [palavraSecreta, setpalavraSecreta] = useState()
    let [PalavraSorteada, setPalavraSorteada] = useState()
    let [Botoes, setBotoes] = useState(Alfabeto.map(Botoes => <button className="alfabetoDesbilidato" onClick={() => ConferirTentativas(Botoes)} id={`botao_letra${Botoes}`} disabled>{Botoes}</button>))
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

                </div>
                <div className="escolher">
                    <button onClick={Ramdomizar} id="escolherPalavra" >Escolher Palavra</button>
                </div>
                <div className="palavra-secreta">
                   <ul id="letras">

                   </ul>
                </div>
            </div>
            <div className="alfabeto">
                <Botoesletras />
            </div>
        </div>
    );
    
    
    function Ramdomizar() {

        inicial = 1
        
        const indexPalavra = parseInt(Math.random() * Palavras.length)
        PalavraSorteada = Palavras[indexPalavra]
        //console.log(PalavraSorteada)
        setPalavraSorteada(PalavraSorteada)
        
        //ReactDOM.render( <Palavra />, document.querySelector('.palavra-secreta'))
        setBotoes(Alfabeto.map(Botoes => <button className="alfabetoHabilidato" onClick={() => ConferirTentativas(Botoes)} id={`botao_letra${Botoes}`}>{Botoes}</button>))
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
        }else{ alert("Voce Perdeu")}
       
    }
    function ComparaLetras(letra){
        
        const pos = PalavraSorteada.indexOf(letra)
        if(pos < 0 ){
           Tentativas--
           contador++
           console.log(contador)
           document.querySelector('.forca').style.background = `url(./projeto__forca__imagens/assets/forca${contador}.png)`
           document.querySelector('.forca').style.backgroundSize = "400px"
        }
        else{
            for (let i = 0; i < PalavraSorteada.length; i++) {
                if(letra === PalavraSorteada[i]){
                    ListaDinamica[i] = letra
                }
            }
        }
        
        /* 
         const ListadeLetras = []
        let acertos = 0
        for (let i = 0; i < PalavraSorteada.length; i++) {
            if(letra === PalavraSorteada[i]){
                acertos++
                //console.log(Li[i])
            }
        }
        if(acertos < 1){
            //console.log("errou moral")
            Tentativas--
        }
        */
        
        
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
}

  /* 
    function Palavra() {

        
        const NovaString = new String(PalavraSorteada)
        
        Forca(NovaString)
         

        return <ul> <li> {Li} </li></ul>
        
    }
    */


