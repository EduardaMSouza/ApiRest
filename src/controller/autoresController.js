import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores} from "../models/index.js";

class autorController{
    
  static listarautors = async (req, res, next) => {
    try{
      const autoresResultado = autores.find();
      req.resultado = autoresResultado;
      next();
    }catch(erro){
      next(erro);
    }
  };

  // eslint-disable-next-line no-unused-vars
  static listarautorPorId = async (req, res, next) =>{
    try{
      const {id} = req.params;
      const autorResultado = await autores.findById(id); 
      if(autorResultado !== null && autorResultado !== undefined){
        res.status(200).send(autorResultado);
      }else{
        next(new NaoEncontrado("autor nao encontrado"));
      }}catch(erro){
      next(erro);
    }  
  };

  // eslint-disable-next-line no-unused-vars
  static cadastrarautor = async (req, res, next) => {
    try{
      const autor = await new autores(req.body);
      await autor.save(()=>{
        res.status(201).send(autor.toJSON());
      });
    }catch(erro){
      next(erro);
    }
  };

  // eslint-disable-next-line no-unused-vars
  static atualizaraautor = async (req, res, next) => {
    try{
      const {id} = req.params;
      // eslint-disable-next-line no-unused-vars
      autores.findByIdAndUpdate(id, {$set: req.body}, (erro, autorA)=>{
        if(autorA !== null){
          res.status(200).send({message: "autor atualizado com sucesso"});
        }else{
          next(new NaoEncontrado("autor nao encontrado"));
        }
      });
    }catch(erro){
      next(erro);
    }
  };

  // eslint-disable-next-line no-unused-vars
  static excluirautor = async (req, res, next) => {
    try{
      const {id} = req.params;
      // eslint-disable-next-line no-unused-vars
      autores.findByIdAndDelete(id, (erro, autorResultado)=>{
        if(autorResultado !== null && autorResultado !== undefined){
          res.status(200).send("autor excluido com sucesso");
        }else{
          next(new NaoEncontrado("autor nao encontrado"));
        }
      });
      
    }catch(erro){
      next(erro);
    }
  };


  static listarautoresPorFiltro = async (req, res, next) => {
    try{
      const {nome, nacionalidade } =  req.query;
      const busca = {};
      
      if (nome) busca.nome = { $regex: nome, $options: "i"};
      if(nacionalidade) busca.nacionalidade = { $regex: nacionalidade, $options: "i"};

      const autoresResultado =  autores.find(busca);
      if(autoresResultado !== null){
        req.resultado = autoresResultado;
        next();
      }else{
        res.status(200).send([]);
      }
    }catch(erro){
      next(erro);
    }
  };









}


export default autorController;